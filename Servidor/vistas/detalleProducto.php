<?php
require "vistas/inicio.html";
echo "<div><img src='img/".$datoProd['foto']."' style='text-align: left;'></img></div>";
echo "<div style='text-align: right;'>";
foreach ($datoProd as $key => $value) {
    if($key != "foto"){
        echo "$key:$value </br>";
    }    
}
echo "<form action='verCarrito.php?idProducto=".$datoProd['idProducto']."&nombre=".$datoProd['nombre']."&precio=".$datoProd['precio']."' method='post'>";
echo "<label>Cantiad: </label>";
echo "<input type='text' min='1' value='1' name='cantidad'></input><br>";
echo "<input type='submit' name='enviarCantidad' value='Comprar'>";
echo "</form></div>";

require "vistas/fin.html";