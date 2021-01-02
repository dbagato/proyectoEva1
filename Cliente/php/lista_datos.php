<?php
	//realizo una consulta a la BD y guardo el resultado en un objeto

	$objeto1 = new stdClass();
	$objeto1->nombre = "juan";
	$objeto1->apellido = "nadie";
	$objeto1->edad = 20;
	$datos[]=$objeto1;

	$objeto2 = new stdClass();
	$objeto2->nombre = "paco";
	$objeto2->apellido = "garcia";
	$objeto2->edad = 23;
	$datos[]=$objeto2;

	$objeto3 = new stdClass();
	$objeto3->nombre = "jose";
	$objeto3->apellido = "Ros";
	$objeto3->edad = 50;
	$datos[]=$objeto3;

	header('Content-Type: application/json');	
	echo json_encode($datos);

	




?>