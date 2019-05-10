<?php

class Database{

	//DB parameters
	private $host = 'local.sahusoft.info';
	private $dbname = 'todoDB';
	private $user = 'root';
	private $password = 'goldtree9';	
	private $conn;

	//DB Connect
	public function connect(){
		$this->conn = null;

		try {
			$this-> conn = new PDO('mysql:host='.$this->host.";dbname=".$this->dbname,$this->user, $this->password);
			$this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		} catch(PDOException $e) {
			echo "Connection error: " . $e->getMessage();
		}

		return $this->conn;
	}
}

?>