<?php
session_start();
if (isset($_SESSION['nombre'])) {
   session_destroy();
   $datos="se ha cerrado correctamente la sesion</br>";
   $datos.="<a href='validar.php'>volver a inicio</a>";
    require "vistas/mensaje.php";
}else{
    $datos="No hay ninguna sesion iniciada";
    $datos.="<a href='validar.php'>Ir a validarse</a>";
    require "vistas/mensaje.php";
}