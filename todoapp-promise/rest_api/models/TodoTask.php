<?php

class TodoTask {

	//DB Data
	private $conn;
	private $table ='todo_items';

	//Properties
	public $task_id;
	public $todo_title;
	public $todo_desc;
	public $status;
	public $priority;

	public function __construct($db) {
		$this->conn = $db;
	}


	//Read all tasks
	public function readTasks(){
	
		$query= 'SELECT * FROM '. $this->table;

		$stmt = $this->conn->prepare($query);

		$stmt->bindParam(1,$this->user_token);

		$stmt->execute();
		return $stmt;
	}

	//Create a task
	public function addTask(){
		$query = 'INSERT INTO '.$this->table . ' SET  todo_title = :todo_title, todo_desc = :todo_desc, status = :status, priority= :priority';

		$stmt = $this->conn->prepare($query);

		// $this->user_token = htmlspecialchars(strip_tags($this->user_token));
		$this->todo_title = htmlspecialchars(strip_tags($this->todo_title));
		$this->todo_desc = htmlspecialchars(strip_tags($this->todo_desc));
		$this->status = htmlspecialchars(strip_tags($this->status));
		$this->priority = htmlspecialchars(strip_tags($this->priority));

		// $stmt->bindParam(':user_token', $this->user_token);
		$stmt->bindParam(':todo_title', $this->todo_title);
		$stmt->bindParam(':todo_desc', $this->todo_desc);
		$stmt->bindParam(':status', $this->status);
		$stmt->bindParam(':priority', $this->priority);

		if($stmt->execute()) {
			return true;
		} 
		
		printf("Error :%s.\n", $stmt->error);
		return false;
		
	}

	//Create a task
	public function updateTask(){
		$query = 'UPDATE '.$this->table . ' SET todo_title = :todo_title, todo_desc = :todo_desc, status = :status, priority= :priority WHERE task_id = :task_id';

		$stmt = $this->conn->prepare($query);

		// $this->user_token = htmlspecialchars(strip_tags($this->user_token));
		$this->todo_title = htmlspecialchars(strip_tags($this->todo_title));
		$this->todo_desc = htmlspecialchars(strip_tags($this->todo_desc));
		$this->status = htmlspecialchars(strip_tags($this->status));
		$this->priority = htmlspecialchars(strip_tags($this->priority));

		// $stmt->bindParam(':user_token', $this->user_token);
		$stmt->bindParam(':todo_title', $this->todo_title);
		$stmt->bindParam(':todo_desc', $this->todo_desc);
		$stmt->bindParam(':status', $this->status);
		$stmt->bindParam(':priority', $this->priority);
		$stmt->bindParam(':task_id', $this->task_id);

		if($stmt->execute()) {
			return true;
		} 
		
		printf("Error :%s.\n", $stmt->error);
		return false;
		
	}

	//Delete Task
    public function deleteTask() {
          
          $query = 'DELETE FROM ' . $this->table . ' WHERE task_id = :task_id';
       
          $stmt = $this->conn->prepare($query);
          
          $this->task_id = htmlspecialchars(strip_tags($this->task_id));
        
          $stmt->bindParam(':task_id', $this->task_id);
          // $stmt->bindParam(':user_token', $this->user_token);
          
          if($stmt->execute()) {
            return true;
          }
          
          printf("Error: %s.\n", $stmt->error);
          return false;
    }

    public function readTaskId() {
    	$query ='SELECT * FROM '.$this->table .' WHERE todo_title = :todo_title AND todo_desc = :todo_desc AND status = :status AND priority= :priority';

    	$stmt = $this->conn->prepare($query);

    	// $stmt->bindParam(':user_token', $this->user_token);
		$stmt->bindParam(':todo_title', $this->todo_title);
		$stmt->bindParam(':todo_desc', $this->todo_desc);
		$stmt->bindParam(':status', $this->status);
		$stmt->bindParam(':priority', $this->priority);
		$stmt->execute();

		$row = $stmt->fetch(PDO::FETCH_ASSOC);

		$this->task_id = $row['task_id'];

    }

}


?>