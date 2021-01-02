<?php
session_start();
include "vistas/inicio.html";
if (isset($_SESSION['nombre'])) {
    $datos= "<div>Bienvenido ".$_SESSION['nombre']."</div>" ;
    require "vistas/mensaje.php";
    require "modelo.php";
    $link = new Bd;
    $carrito=new Carrito();
    $pedido = new Pedido('','','','','','',$_SESSION['dni']);
    $lineaPedido=new LineaPedido('',0,'','');
    $hoy=date("Y-m-d");
    $idPedido=$pedido->calcularIdPedido($link->link);
    $pedido->idPedido=$idPedido;
    $pedido->fecha=$hoy;
    $pedido->insertarPedido($link->link);
    for ($i=0; $i < $_SESSION['total']; $i++) { 
        $lineaPedido->idPedido=$idPedido;
        $lineaPedido->idProducto=$_SESSION['idProducto'][$i];
        $lineaPedido->cantidad=$_SESSION['cantidad'][$i];
        $lineaPedido->nlinea=$i+1;
        $lineaPedido->insertarLineaPedido($link->link);
    }
    $carrito->calcularTotalProd();
    $contenidoCarrito=$carrito->verCarrito();
    require "vistas/finPedido.php";

}else{

	$datos="Es necesario estar registrado<br>";
	$datos.="<a href='validar.php'> Volver </a>";
	require "vistas/mensaje.php";
}

$link->link->close();
session_destroy();
include "vistas/fin.html";