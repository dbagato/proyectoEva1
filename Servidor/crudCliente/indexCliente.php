<?php
session_start();
if (isset($_SESSION['nombre'])) {
require "../modelo.php";
$link= new Bd();
$cli=Cliente::getAll($link->link);
while($fila=$cli->fetch_assoc()){
	$dato[]=$fila;
}
require "../vistas/datosCliente.php";

}else{

	$datos="Es necesario estar registrado<br>";
	$datos.="<a href='validar.php'> Volver </a>";
	require "vistas/mensaje.php";
}

$link->link->close();