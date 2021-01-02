<?php
	
	$dni = $_POST["dni"];

    // Con los datos recibidos, realizo el delete en la BD
    // simulo el resultado, que sera TRUE si es correcto y FALSE si es incorrecto
    $result = rand(0,1) == 1;

	header('Content-Type: application/json');	
	echo json_encode($result);

	




?>