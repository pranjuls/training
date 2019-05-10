<?php 
	 	session_start();	
		array_push($_SESSION['todoitems'],['caption' => $_POST['item'], 'isCompleted' => false]);
		
		$array = $_SESSION['todoitems'];
	?>
<!DOCTYPE html>
<html>
<head>
	<title>TO Do items - PHP</title>
	

	<!-- Bootstrap CSS-->
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

</head>
<body>

	<div class="container">
		<div class="row">
			<div class="col-12 col-lg-12">
		<div>
			<ul class="list-group">
				<?php for( $i = 0; $i < sizeof($array); $i++) {?>
				<li class="col-12 col-lg-8 list-group-item" style="width: 200px; height: 50px"><?php echo $array[$i]["caption"]?></li>
				<?php } ?>
			</ul>
		</div>
		</div>
	</div>
	</div>

</body>
</html>