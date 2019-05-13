<?php

	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');
	header('Access-Control-Allow-Methods: POST');
	header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

	echo "test log: abc";
	echo "method:".$_SERVER['REQUEST_METHOD'];
	include_once '../../config/Database.php';
	include_once '../../models/TodoTask.php';

	$database =new Database();
	$db = $database->connect();

	$todoTask = new TodoTask($db);

	//Get raw posted data



	$todoTask->todo_title = $_POST['title'] ? $_POST['title'] : die();
	$todoTask->todo_desc = $_POST['description'] ? $_POST['description'] : die();
	$todoTask->status = strcmp($_POST['status'], "Not Completed") == 0 ? 0 : 1;
	$todoTask->priority = $_POST['priority'];
	
	$result = array();
	// if($_SERVER['REQUEST_METHOD'] == 'POST'){
		if ($todoTask->addTask()) {
			# code...
			$todoTask->readTaskId();
			$result['status'] = 'successful';
			$result['data'] = $todoTask->task_id;
		} else {
			$result['status'] = 'unsuccessful';
			$result['data'] = 'error inserting task';
			$result['method'] = $_SERVER['REQUEST_METHOD'];
		}
	// }
	echo json_encode($result);
?>