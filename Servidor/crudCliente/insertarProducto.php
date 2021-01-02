<?php
session_start();
if (isset($_SESSION['nombre'])) {
require "../modelo.php";
$link=new Bd;
$fecha=$_POST['fecha'];
$dniCliente=$_POST['dniCliente'];
$pedido = new Pedido('',$fecha,'','','','',$dniCliente);
$idPedido=$pedido->calcularIdPedido($link->link);
$pedido->idPedido=$idPedido;
	if($pedido->insertarPedido($link->link)){
		$dato = $idPedido;
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