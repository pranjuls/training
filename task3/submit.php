<?php
$number = $_POST['number']; 

for($i= 1; $i <=10;  $i++) {
	echo $number." x ".$i." : ".$i*$number;
	echo '<br>';
}
?>

