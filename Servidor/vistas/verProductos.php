<?php
require "vistas/inicio.html";
while($fila=$dato->fetch_assoc()){
	echo "<div><img src='img/".$fila['foto']."'></img></br>";
	echo $fila['nombre']."</br>";
	echo $fila['precio']."</br>";
	echo "<a href='detalle.php?idProducto=".$fila['idProducto']."'><button>Detalle</button></a></div>";
}

require "vistas/fin.html";