<?php
session_start();
include "vistas/inicio.html";
if (isset($_SESSION['nombre'])) {
    $datos= "<div>Bienvenido ".$_SESSION['nombre']."</div>" ;
    require "vistas/mensaje.php";
    require "modelo.php";
    $carrito=new Carrito();
    if (isset($_POST['enviarCantidad'])) {
      //seteamos los parametros del carrito en el objeto carrito
            $carrito->id = $_GET['idProducto'];
            $carrito->nombre=  $_GET['nombre'];
            $carrito->precio = $_GET['precio'];
            $carrito->cantidad = $_POST['cantidad'];
      //anyadimos el producto al carrito     
      $carrito->anyadirProducto();
      //calculamos el total= cantidad*precio
      $carrito->calcularTotalProd();
      //llamaremos a ver carrito el cual nos devuelve un array para montarlo en mostrarCarrito.php
      $contenidoCarrito= $carrito->verCarrito(); 
      require "vistas/mostrarCarrito.php";
    }else {
      if ($_SESSION['total']>0) {

        $carrito->calcularTotalProd();
        $contenidoCarrito=$carrito->verCarrito();
        require "vistas/mostrarCarrito.php";
        }else {
        require "vistas/mostrarCarritoVacio.php";
      }
        
    }

}else{

	$datos="Es necesario estar registrado<br>";
	$datos.="<a href='validar.php'> Volver </a>";
	require "vistas/mensaje.php";
}

include "vistas/fin.html";