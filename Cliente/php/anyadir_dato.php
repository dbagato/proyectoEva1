<?php
	
	$nombre = $_POST["nombre"];
	$apellido = $_POST["apellido"];
	$edad = $_POST["edad"];

    // Con los datos recibidos, realizo la insercion en la BD
    // simulo el resultado del insert, que sera TRUE si es correcto y FALSE si es incorrecto
    $result = rand(0,1) == 1;

	header('Content-Type: application/json');	
	echo json_encode($result);

	




?>