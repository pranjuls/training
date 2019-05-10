<?php

	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');
	header('Access-Control-Allow-Methods: POST');
	header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

	include_once '../../config/Database.php';
	include_once '../../models/TodoTask.php';

	$database =new Database();
	$db = $database->connect();

	$todoTask = new TodoTask($db);

	//Get raw posted data


	$todoTask->user_token = $_POST['user_token'];
	$todoTask->todo_title = $_POST['todo_title'];
	$todoTask->todo_desc = $_POST['todo_desc'];
	$todoTask->status = $_POST['status'];
	$todoTask->priority = $_POST['priority'];

	//Save Data
	$result = array();
	if ($todoTask->addTask()) {
		# code...
		$todoTask->readTaskId();
		$result['status'] = 'successful';
		$result['data'] = $todoTask->task_id;
	} else {
		$result['status'] = 'unsuccessful';
		$result['data'] = 'error inserting task';
	}

	echo json_encode($result);
?>