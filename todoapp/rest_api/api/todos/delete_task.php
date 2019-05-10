<?php

	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');
	header('Access-Control-Allow-Methods: GET');
	header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

	include_once '../../config/Database.php';
	include_once '../../models/TodoTask.php';

	$database =new Database();
	$db = $database->connect();

	$todoTask = new TodoTask($db);

	$todoTask->user_token = $_GET['user_token'];
	$todoTask->task_id = $_GET['task_id'];

	$result = array();
	if ($todoTask->deleteTask()) {
		$result['status'] = 'successful';
		$result['data'] = $todoTask->task_id . ' task deleted.';
	} else {
		$result['status'] = 'unsuccessful';
		$result['data'] = 'error deleting task';
	}

	echo json_encode($result);
?>