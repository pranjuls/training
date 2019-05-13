<?php
	
	include_once '../../config/Database.php';
	include_once '../../models/User.php';

	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');
	header('Access-Control-Allow-Methods: POST');
	header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

	$database = new Database();
	$db = $database->connect();

	$user = new User($db);

	$user->email = $_POST['email'];
	$user->password =$_POST['password'];

	$user->password = md5($user->password);

	$user->user_token = md5($user->email);

	echo "email : ".$user->email."\npassword:".$user->password."\nuser_token: ".$user->user_token;

	$result = array();
	if($user->registerUser()) {

		$result['status'] = 'successful';
		$result['data'] = $user->user_token;
	} else {
		$result['status'] = 'unsuccessful';
		if($user->checkEmail())
			$result['data'] = 'User already registered';
		else 
			$result['data'] = 'unknown error occurred';
	}

	echo json_encode($result);