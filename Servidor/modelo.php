<?php
/********************Clase BD******************* */
class Bd	
{
	private $link;
	function __construct()
	{
		if (!isset ($this->link)) {
			$this->link= new mysqli('localhost', 'root', '', 'virtualmarket');
			if ( $this->link->connect_errno ){ 
			$datos= "Fallo al conectar a MySQL: ". $link->connect_error; 
 			require "vista/mostrar.php";
			}else $this->link->set_charset('utf-8'); 
		}
	}
	function __get($var){
		return $this->$var;
	}
}
/********************clase Cliente******************* */
class Cliente
{
		private $dniCliente;
		private $nombre;
		private $direccion;
		private $email;
		private $pwd;
		private $admin;
		static function getAll($link){
			$consulta="SELECT * FROM clientes";
			return $result=$link->query($consulta);
		}
		function __construct($dni, $nombre, $direccion,$email,$pwd,$admin){
			$this->dniCliente=$dni;
			$this->nombre=$nombre;
			$this->direccion=$direccion;
			$this->email=$email;
			$this->pwd=$pwd;
			$this->admin=$admin;
		}
		function buscar ($link){
			$consulta="SELECT * FROM clientes where dniCliente='$this->dniCliente'";
			$result=$link->query($consulta);
			return $result->fetch_assoc();
		}
		function insertar ($link){
			$consulta="INSERT INTO clientes VALUES ('$this->dniCliente','$this->nombre','$this->direccion','$this->email','$this->pwd','$this->admin')";
			return $link->query($consulta);
		}
		function modificar ($link){
			$consulta="UPDATE clientes SET nombre='$this->nombre',  direccion='$this->direccion',  email='$this->email', pwd='$this->pwd', administrador='$this->admin' WHERE dniCliente='$this->dniCliente'";
			return $link->query($consulta);
		}
		function borrar ($link){
			$consulta="DELETE FROM clientes where dniCliente='$this->dniCliente'";
			return $link->query($consulta);
		}
		function autenticar ($link){
			$consulta="SELECT pwd FROM clientes where dniCliente='$this->dniCliente'";
			$result=$link->query($consulta);
			foreach ($result->fetch_assoc() as $key => $value) {
				return password_verify($this->pwd,$value);
			} 
			
		}
		function validarAdmin($link){
			$consulta="SELECT administrador FROM clientes where dniCliente='$this->dniCliente'";
			$result=$link->query($consulta);
			foreach ($result->fetch_assoc() as $key => $value) {
				return $value;
			}
		}
}
/********************Clase Producto********************/ 
class Producto
{
	private $idProducto;
	private $nombre;
	private $origen;
	private $foto;
	private $marca;
	private $categoria;
	private $peso;
	private $unidades;
	private $volumen;
	private $precio;
	static function getAll($link){
		$consulta="SELECT * FROM productos";
		return $result=$link->query($consulta);
	}
	function __construct($idProducto,$nombre,$origen,$foto,$marca,$categoria,$peso,$unidades,$volumen,$precio){
		$this->idProducto=$idProducto;
		$this->nombre=$nombre;
		$this->origen=$origen;
		$this->foto=$foto;
		$this->marca=$marca;
		$this->categoria=$categoria;
		$this->peso=$peso;
		$this->unidades=$unidades;
		$this->volumen=$volumen;
		$this->precio=$precio;
	}
	function buscar ($link){
		$consulta="SELECT * FROM productos where idProducto='$this->idProducto'";
		$result=$link->query($consulta);
		return $result->fetch_assoc();
	}
}
/********************Clase Carrito********************/ 
class Carrito{
	private $id;
	private $nombre;
	private $precio;
	private $cantidad;
	private $totalProd;
	private $totalCarrito;
	function __set($property, $value){
		if(property_exists($this, $property)) {
			$this->$property = $value;
		}
	}
	function anyadirProducto(){
            $_SESSION['idProducto'][$_SESSION['total']] =$this->id;
            $_SESSION['nombreProd'][$_SESSION['total']] = $this->nombre;
            $_SESSION['precio'][$_SESSION['total']] = $this->precio;
            $_SESSION['cantidad'][$_SESSION['total']] = $this->cantidad;
            $_SESSION['total']++;            
        }
	function calcularTotalProd(){
		for ($i=0; $i <=  $_SESSION['total']-1; $i++) { 
				$this->totalProd[$i]= $_SESSION['precio'][$i]*$_SESSION['cantidad'][$i];
		}
	}
	function calculatTotalCarri(){
		foreach ( $this->totalProd as $values){	
				$this->totalCarrito+=$values;		
		}		
	return $this->totalCarrito;
	}
	function verCarrito(){
		for ($i=0; $i <= $_SESSION['total']-1; $i++) { 
			$array[$i]=[ $_SESSION['idProducto'][$i], $_SESSION['nombreProd'][$i], $_SESSION['precio'][$i],  $_SESSION['cantidad'][$i],$this->totalProd[$i]];
		}
		return $array;
	}
	function vaciarCarrito(){
		$this->id=[];
		$this->nombre=[];
		$this->precio=[];
		$this->cantidad=[];
		$this->totalProd=[];
		$this->totalCarrito='';
	}
}
/*******************Clase Pedido*******************/ 
class Pedido{
	private $idPedido;
	private $fecha;
	private $dirEntrega;
	private $nTarjeta;
	private $fechaCaducidad;
	private $matriculaRepartidor;
	private $dniCliente;
	static function getAll($link){
		$consulta="SELECT * FROM pedidos";
		return $result=$link->query($consulta);
	}

	function __construct($idPedido,$fecha,$dirEntrega,$nTarjeta,$fechaCaducidad,$matriculaRepartidor,$dniCliente){
		$this->idPedido=$idPedido;
		$this->fecha=$fecha;
		$this->dirEntrega=$dirEntrega;
		$this->nTarjeta=$nTarjeta;
		$this->fechaCaducidad=$fechaCaducidad;
		$this->matriculaRepartidor=$matriculaRepartidor;
		$this->dniCliente=$dniCliente;
	}

	function __set($property, $value){
		if(property_exists($this, $property)) {
			$this->$property = $value;
		}
	}
	function calcularIdPedido($link){
		$consulta="SELECT Max(idPedido) as idPedido FROM pedidos";
		foreach ($result=$link->query($consulta) as $key => $value) {
			foreach ($value as $key2 => $value2) {
				return $value2+1;
			}
		}
	}
	function buscarPedido ($link){
		$consulta="SELECT * FROM pedidos where idPedido='$this->idPedido'";
		$result=$link->query($consulta);
		return $result->fetch_assoc();
	}
	function insertarPedido ($link){
		$consulta="INSERT INTO pedidos VALUES ('$this->idPedido','$this->fecha','$this->dirEntrega','$this->nTarjeta','$this->fechaCaducidad','$this->matriculaRepartidor','$this->dniCliente')";
		return $link->query($consulta);
	}
	function borrarPedido ($link){
		$consulta="DELETE FROM pedidos where idPedido='$this->idPedido'";
		return $link->query($consulta);
	}
	function modificarPedido($link){
		$consulta="UPDATE pedidos SET idPedido='$this->idPedido',  fecha='$this->fecha',  dirEntrega='$this->dirEntrega', nTarjeta='$this->nTarjeta', fechaCaducidad='$this->fechaCaducidad', matriculaRepartidor='$this->matriculaRepartidor', dniCliente='$this->dniCliente' WHERE idPedido='$this->idPedido'";
		return $link->query($consulta);
	}

}
/********************Clase LineaPedido********************/ 
class LineaPedido{
	private $idPedido;
	private $nlinea;
	private $idProducto;
	private $cantidad;
	function __construct($idPedido,$nlinea,$idProducto,$cantidad){
		$this->idPedido=$idPedido;
		$this->nlinea=$nlinea;
		$this->idProducto=$idProducto;
		$this->cantidad=$cantidad;
	}
	static function getAll($link){
		$consulta="SELECT * FROM lineaspedidos";
		return $result=$link->query($consulta);
	}
	function __set($property, $value){
		if(property_exists($this, $property)) {
			$this->$property = $value;
		}
	}
	function insertarLineaPedido($link){
		$consulta="INSERT INTO lineaspedidos VALUES ('$this->idPedido','$this->nlinea','$this->idProducto','$this->cantidad')";
		return $link->query($consulta);
	}
	function borrarLineaPedido ($link){
		$consulta="DELETE FROM lineaspedidos where idPedido='$this->idPedido' nlinea='$this->nlinea'";
		return $link->query($consulta);
	}
	function buscarLineaPedido ($link){
		$consulta="SELECT * FROM lineaspedidos where idPedido='$this->idPedido'";
		return $link->query($consulta);
	}
}