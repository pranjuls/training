<?php
	session_start();

	if(!isset($_SESSION['todoitems']))
		$_SESSION['todoitems'] = [];
?>

<!DOCTYPE html>
<html>
<head>
	<title>To Do - PHP</title>
	
	<!-- Bootstrap CSS-->
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>
<body>
	<div class="container">
		<div class="row">
		<div class="col-lg-2">
		<div class="col-12 col-lg-12">
			
				<br><br>
			<form class="" action="storeitem.php" method="post">
				<div class="form-group">
					<label for="task"><strong>Describe Task</strong></label>
					<input type="text" name="item" placeholder="Describe item here">
				</div>
				<br><br>
				<div class="form-group">
					<input class="btn btn-primary" type="submit" name="Submit">
				</div>
			</form>
			
		</div>
		<div class="col-lg-2"></div>
		
		</div>		
	</div>
	

</body>
</html>