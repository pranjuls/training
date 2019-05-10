<?php
	
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	include_once '../../config/Database.php';
	include_once '../../models/TodoTask.php';
	
	$database =new Database();
	$db = $database->connect();

	$todoTasks = new TodoTask($db);

	$todoTasks->user_token = isset($_GET['user_token']) ? $_GET['user_token'] : die();

	$tasks = $todoTasks->readTasks();

	$taskCount = $tasks->rowCount();

	$tasks_arr = array();
	if($taskCount > 0) {
		$tasks_arr['status'] = 'successful';
		$tasks_arr['data'] = array();

		while ($row = $tasks->fetch(PDO::FETCH_ASSOC)) {
			extract($row);

			$task_item = array(
				'user_token' => $user_token,
				'task_id' => $task_id,
				'todo_title' => $todo_title,
				'todo_desc' => $todo_desc,
				'status' => $status,
				'priority' => $priority
			);

			array_push($tasks_arr['data'], $task_item);
		}
	} else {
		$tasks_arr['status'] = 'successful';
		$tasks_arr['data'] = 'No task found';
	}

	echo json_encode($tasks_arr);

?>