<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<script src="js/jquery-3.3.1.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ" crossorigin="anonymous"></script>
	<link rel="stylesheet" href="js\bootstrap\bootstrap-4.0.0\css\bootstrap.min.css">
	<link rel="stylesheet" href="js\bootstrap\bootstrap-4.0.0\css\bootstrap-reboot.min.css">
	<link rel="stylesheet" href="css/site.css">
	<script type="text/javascript" src="js/bootstrap/bootstrap-4.0.0/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/menufooterloader.js"></script>

    <title>Planes</title>
</head>
<body>
	<header id="menu">
		<script>loadMenu();</script>
	</header>
	<div class="container-fluid justify-content-center col-7">
	<?php
	$index = (int)$_POST['index'];
	$json = file_get_contents('planes.json');
	$dJson = json_decode($json, true);

	$title = $dJson['plane'][$index]["Title"];
	$descr = $dJson['plane'][$index]["descr"];
	$review = $dJson['plane'][$index]["review"];
	$type = $dJson['plane'][$index]["type"];
	$rating = $dJson['plane'][$index]["rating"];
	$price = $dJson['plane'][$index]["price"];
	$picture = $dJson['plane'][$index]["picture"];
	echo "<div align=\"center\" class=\"wrapper\"><h1>$title</h1></div>";
	echo "<div><p>$descr</p></div>";
	echo "<div><p>$review</p></div>";
	echo "<div><p>Type: $type</p>";
	echo "<div><p>$rating stars</p></div>";
	echo "<div><p>$price</p></div>";
	echo "<div align=\"center\">";
	foreach($picture as $pic)
	{
		echo "<span class=\"image\"><img src=\"fpPics/$pic\"></span>";
	}
	echo "</div>";
	?>
	</div>

</body>
	<footer id="footer">
		<script>loadFooter();</script>
	</footer>

</html>
