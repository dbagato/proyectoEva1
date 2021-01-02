<?php
session_start();
if (isset($_SESSION['nombre'])) {
require "../modelo.php";
$link= new Bd();
$dni=$_POST['dni'];
$cli=new Cliente($dni,'','','','');
$dato=$cli->buscar($link->link);
if($dato){
	require "../vistas/datosCliente.php";
}else{
	$datos = false;
	require "../vistas/mensaje.php";
}


}else{

	$datos="Es necesario estar registrado<br>";
	$datos.="<a href='validar.php'> Volver </a>";
	require "vistas/mensaje.php";
}

$link->link->close();