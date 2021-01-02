<?php
session_start();
include "vistas/inicio.html";
require "modelo.php";
$link = new Bd();
if (!isset($_SESSION['nombre'])) {
	if (isset($_POST['validar'])) {
		$cli=new Cliente($_POST['usuario'],'','','',$_POST['pwd'],'');
		if ($cli->autenticar($link->link)) {
			$nom=$cli->buscar($link->link);
			$_SESSION['nombre']=$nom['nombre'];
			$_SESSION['dni']=$nom['dniCliente'];
			
		}else {
			$datos="el usuario o la contraseña es incorrecta<br>";
			$datos.="<a href='validar.php'> Volver </a>";
			require "vistas/mensaje.php";
		}
	}else{
		require "vistas/formularioRegistro.php";
	}
}
if (isset($_SESSION['nombre'])) {
	$cli=new Cliente($_SESSION['dni'],'','','','','');
	if ($cli->validarAdmin($link->link)) {
		header("Location: ../Cliente/index.html");
	}else{
		$_SESSION['total']=0;
		header("Location: principal.php");

	}
	
}
$link->link->close();
include "vistas/fin.html";