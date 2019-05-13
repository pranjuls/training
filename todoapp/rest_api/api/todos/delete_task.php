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
	// echo "delete data: ".json_encode($_DELETE);


	$todoTask->task_id = $_GET['task_id'];

	echo "task id:".$todoTask->task_id;
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