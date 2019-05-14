<?php
	
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');
	header('Access-Control-Allow-Methods: GET');
	header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

	include_once '../../config/Database.php';
	include_once '../../models/TodoTask.php';
	
	$database =new Database();
	$db = $database->connect();

	$todoTasks = new TodoTask($db);


	$tasks = $todoTasks->readTasks();

	$taskCount = $tasks->rowCount();

	$tasks_arr = array();
	if($taskCount > 0) {
		$tasks_arr['status'] = 'successful';
		$tasks_arr['data'] = array();

		while ($row = $tasks->fetch(PDO::FETCH_ASSOC)) {
			extract($row);

			$task_item = array(
				'task_id' => $task_id,
				'title' => $todo_title,
				'description' => $todo_desc,
				'status' => $status == 0 ? "Not Completed" : "Completed",
				'priority' => ucwords($priority)
			);

			array_push($tasks_arr['data'], $task_item);
		}
	} else {
		$tasks_arr['status'] = 'no task found';
		$tasks_arr['data'] = '';
	}

	echo json_encode($tasks_arr);

?>