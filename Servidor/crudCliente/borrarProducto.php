<?php
session_start();
if (isset($_SESSION['nombre'])) {
require "../modelo.php";
$link= new Bd();
$idPedido=$_POST['idPedido'];
$pedido=new Pedido($idPedido,'','','','','','');
if($pedido->borrarPedido($link->link)){
	$dato = TRUE;
	require "../vistas/datosCliente.php";
}else{
	$dato = FALSE;
	require "../vistas/datosCliente.php";
}
}else{

	$datos="Es necesario estar registrado<br>";
	$datos.="<a href='validar.php'> Volver </a>";
    require "../vistas/mensaje.php";
}

$link->link->close();