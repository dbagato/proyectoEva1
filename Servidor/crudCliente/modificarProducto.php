<?php
include "vistas/inicio.html";
session_start();
if (isset($_SESSION['nombre'])) {
require "../modelo.php";
	$link=new Bd;
	$idPedido=$_POST['idPedido'];
	$fecha=$_POST['fecha'];
	$dniCliente=$_POST['dniCliente'];
	$pedido = new Pedido($idPedido,$fecha,'','','','',$dniCliente);
	if($pedido->modificarPedido($link->link)){
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
include "vistas/fin.html";