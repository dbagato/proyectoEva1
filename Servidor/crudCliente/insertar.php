<?php
session_start();
if (isset($_SESSION['nombre'])) {
require "../modelo.php";
$link=new Bd;
$dniCli=$_POST['dniCliente'];
$nombreCli=$_POST['nombre'];
$direccion=$_POST['direccion'];
$email=$_POST['email'];
$cli= new Cliente($dniCli,$nombreCli,$direccion,$email,'',0);
	if($cli->insertar($link->link)){
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