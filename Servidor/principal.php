<?php
session_start();
include "vistas/inicio.html";

if (isset( $_SESSION['nombre'])) {
    require "modelo.php";
    $link = new Bd();
    $datos= "<div>Bienvenido ".$_SESSION['nombre']."<a href='verCarrito.php'><img src='img/carritoCompra.png'><img/></a>".$_SESSION['total']."</div>" ;
	require "vistas/mensaje.php";
    $dato=Producto::getAll($link->link);
    require "vistas/verProductos.php";
}else{

	$datos="Es necesario estar registrado<br>";
	$datos.="<a href='validar.php'> Volver </a>";
	require "vistas/mensaje.php";
}

include "vistas/fin.html";
