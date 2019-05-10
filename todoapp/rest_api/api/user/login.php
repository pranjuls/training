<?php

	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');
	header('Access-Control-Allow-Methods: POST');
	header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

	include_once '../../config/Database.php';
	include_once '../../models/TodoTask.php';

	$database =new Database();
	$db = $database->connect();

	$user = new User($db);

	$user->email = $_POST['email'];
	$user->password = $_POST['password'];

	$user->password = md5($user->password);

	$result = array();
	if($user->login()) {

		$user->getUserToken();
		$result['status'] = 'successful';
		$result['data'] = $user->user_token;
	} else {
		$result['status'] = 'unsuccessful';
		if ($user->checkEmail())
			$result['data'] = 'invalid password';
		else
			$result['data'] = 'user not registered';
	}

	echo json_encode($result);