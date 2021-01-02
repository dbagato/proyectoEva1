<?php
session_start();
if (isset($_SESSION['nombre'])) {
require "../modelo.php";
$link= new Bd();
$idPedido=$_POST['idProducto'];
$pedido=new Pedido($idPedido,'','','','');
$dato=$pedido->buscarPedido($link->link);
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