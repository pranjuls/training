<?php

class User{

	//DB Data
	private $conn;
	private $table = 'users';

	//Properties
	public $user_token;
	public $email;
	public $password;

	public function __construct($db) {
		$this->conn = $db;
	}

	//user login 
	public function loginUser(){

		$query = 'SELECT * FROM '.$this->table . ' WHERE email = :email AND password = :password';

		$stmt = $this->conn->prepare($query);

		$this->email = htmlspecialchars(strip_tags($this->email));
		$this->password = htmlspecialchars(strip_tags($this->password));

		$stmt->bindParam(':email', $this->email);
		$stmt->bindParam(':password', $this->password);

		$stmt->execute();

		$num =$stmt->rowCount();

		if($num == 1) {
			return true;
		} 
		
		return false;
	}

	//register user
	public function registerUser() {

		$query = 'INSERT INTO '.$this->table .' SET email =:email, password = :password, user_token = :user_token';

		$stmt= $this->conn->prepare($query);

		$this->user_token = htmlspecialchars(strip_tags($this->user_token));
		$this->email = htmlspecialchars(strip_tags($this->email));
		$this->password = htmlspecialchars(strip_tags($this->password));

		$stmt->bindParam(':user_token', $this->user_token);
		$stmt->bindParam(':email', $this->email);
		$stmt->bindParam(':password', $this->password);

		if($this->checkEmail()){
			return false;
		}

		if($stmt->execute()) {
			return true;
		} 
		
		printf("Error:%s\n",$stmt->error);
		return false;
	}

	public function getUserToken() {
		$query ='SELECT * FROM '.$this->table .' WHERE email = :email AND password = :password ';

    	$stmt = $this->conn->prepare($query);

    	$stmt->bindParam(':email', $this->email);
		$stmt->bindParam(':password', $this->password);
	
		$stmt->execute();

		$row = $stmt->fetch(PDO::FETCH_ASSOC);

		$this->user_token = $row['user_token'];

	}

	public function checkEmail() {
		$query ='SELECT * FROM '.$this->table .' WHERE email = :email';

    	$stmt = $this->conn->prepare($query);

    	$stmt->bindParam(':email', $this->email);
	
		$stmt->execute();

		$entries = $stmt->rowCount();

		if ($entries == 1)
			return true;
		return false;
	}
}