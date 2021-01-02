<?php
session_start();
include "vistas/inicio.html";
if (isset($_SESSION['nombre'])) {
$datos= "<div>Bienvenido ".$_SESSION['nombre']."</div>" ;
require "vistas/mensaje.php";
require "modelo.php";
$link = new Bd();
$prod= new Producto($_GET['idProducto'],'','','','','','','','','');
$datoProd=$prod->buscar($link->link);
require "vistas/detalleProducto.php";

$link->link->close();

}else{

	$datos="Es necesario estar registrado<br>";
	$datos.="<a href='validar.php'> Volver </a>";
	require "vistas/mensaje.php";
}

include "vistas/fin.html";