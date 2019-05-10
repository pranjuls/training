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

	$todoTask->user_token = $_POST['user_token'];
	$todoTask->todo_title = $_POST['todo_title'];
	$todoTask->todo_desc = $_POST['todo_desc'];
	$todoTask->status = $_POST['status'];
	$todoTask->priority = $_POST['priority'];
	$todoTask->task_id = $_POST['task_id'];

	$result = array();
	if ($todoTask->updateTask()) {
		$result['status'] = 'successful';
		$result['data'] = $todoTask->task_id . ' task updated.';
	} else {
		$result['status'] = 'unsuccessful';
		$result['data'] = 'error updating task';
	}

	echo json_encode($result);

	?>