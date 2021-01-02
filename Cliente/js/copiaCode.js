/*primero cargaremos las funciones principales
listar, para cargar los datos de las dos tablas, la de clientes y la de pedidos.
*/

$(document).ready(function(){
    //LISTAR
    listar_clientes();
    listar_pedidos();
    //ANYADIR
    $("#nuevoCliente").click(function(){
        anyadir_Cliente();
    });
    $("#nuevoPedido").click(function(){
      //  anyadir_pedido();
    });
   
    //EDITAR
    $("#cliente_editado").click(function(){
       editar_CLiente();
    });
    //CARGA MODALES
    $("#modal_anyadir").hide();
    $("#modal_editar").hide();
    
    $("#anyadirCliente").click(function(){
		$("#modal_anyadir").show();
	})

	
	$(".ocultar-caja_anyadir").click(function(){
		$("#modal_anyadir").hide();
    });
    $(".ocultar-caja_editar").click(function(){
		$("#modal_editar").hide();
    });
});


/**
 *********************LISTAR********************************
 * Listar CLIENTES, llenara la tabla de clientes con sus datos, y creara los datos de ediar y borrar
 */
function listar_clientes() {
    $.ajax({
        url: "../Servidor/crudCliente/indexCliente.php", // no paso ningun dato, solo recojo
        type: "POST",
        dataType: "json",

        success: function (respuesta) {
            //console.log(respuesta); // array de objetos, lo itero y pinto una fila por cada objeto

            for (var key in respuesta) {
                $("#tabla_Clientes").append("<tr><td class='dni'>" + respuesta[key].dniCliente + "</td><td id='nombre'>" + respuesta[key].nombre +
                    "</td> <td><button class='editarCliente'>Editar</button><button class='borrarCliente'>Borrar</button></td></tr>");
            }
            mostrarEditarCliente();
           
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("La solicitud ha fallado: " + textStatus + errorThrown);
        }
    });
}

/**
 * Listar PEDIDOS, llenara la tabla de pedidos con sus datos, y creara los datos de ediar y borrar
 */
function listar_pedidos() {
    $.ajax({
        url: "../Servidor/crudCliente/indexPedido.php", // no paso ningun dato, solo recojo
        type: "POST",
        dataType: "json",

        success: function (respuesta) {
            //console.log(respuesta); // array de objetos, lo itero y pinto una fila por cada objeto

            for (var key in respuesta) {
                $("#tabla_Pedidos").append("<tr><td id='idPedido'>" + respuesta[key].idPedido + "</td><td id='nombre' >" + respuesta[key].dniCliente + "</td><td id='fechaPedido'>" +
                respuesta[key].fecha    + "</td> <td><button class='listarLineaPedido'>Listar</button><button class='editarPedido'>Editar</button><button class='borrarPedido'>Borrar</button></td></tr>");
            }
            mostrarEditarPedido();
            borrarCliente();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("La solicitud ha fallado: " + textStatus + errorThrown);
        }
    });
}

/**
 * ****************************ANYADIR*****************************
 * funciones para anyadir un registro en la tabla de CLIENTES
 */
function anyadir_Cliente(){
    var objeto_dato = {   //monto un objeto con los datos de la fila a insertar en la BD
            dniCliente:$('#dniCliente').val(),
            nombre:$('#nombreCliente').val(),
            direccion:$('#direccion').val(),
            email:$('#email').val()
            };
    console.log(objeto_dato)
    
    $.ajax({
        url:"../Servidor/crudCliente/insertar.php",
        type:"POST",
        data: objeto_dato, // paso el dato por el post
        dataType:"json",
    }).done(function(respuesta){
        console.log(respuesta);  // recojo la respuesta, que sera true o false
       if(respuesta){
            alert("Dato insertado correctamente !!!!");//si es correcta, inserto los datos en una fila nueva
            $("#tabla_Clientes tbody").append("<tr><td class='dniCliente'>"+objeto_dato.dniCliente+"</td><td calass='nombreCli'>"+objeto_dato.nombre+"</td> <td><button id='editarCliente'>Editar</button><button class='borrarCliente'>Borrar</button></td></tr>");
            
        }else{ 
            alert("Error en la insercion"); //si no es correcta no inserto nada
        } 
    }).fail(function( jqXHR, textStatus, errorThrown ) {
        console.log( "La solicitud ha fallado: " +  textStatus + errorThrown);
    });
    ;

}
/**
 * funciones para anyadir un registro en la tabla de PEDIDOS
 */
function anyadir_pedido(){
    var objeto_Pedido = {   //monto un objeto con los datos de la fila a insertar en la BD
            nombre:$('#nombre').val(),
            direccion:$('#direccion').val(),
            email:$('#email').val()
            };
    console.log(objeto_Pedido)
    
    $.ajax({
        url:"../Servidor/crudCliente/insertar.php",
        type:"POST",
        data: objeto_Pedido, // paso el dato por el post
        dataType:"json",
    }).done(function(respuesta){
        console.log(respuesta);  // recojo la respuesta, que sera true o false
       if(respuesta){
            alert("Dato insertado correctamente !!!!");//si es correcta, inserto los datos en una fila nueva
            $("#Tabla_Pedidos tbody").append("<tr><td>"+objeto_Pedido.dniCliente+"</td><td>"+objeto_Pedido.nombre+"</td> <td><button class='editarCliente'>Editar</button><button class='borrarCliente'>Borrar</button></td></tr>");
        }else{ 
            alert("Error en la insercion"); //si no es correcta no inserto nada
        } 
    }).fail(function( jqXHR, textStatus, errorThrown ) {
        console.log( "La solicitud ha fallado: " +  textStatus + errorThrown);
    });
    ;

}
/**
 *********************EDITAR********************************
 * EDITAR CLIENTES,Primero se cargaran los datos en el formulario para poder editar los datos del Cliente obtenido para editar
 */
function cargarDatosCliente($dni){
    
	$.ajax({
        url: "../Servidor/crudCliente/indexCliente.php", // no paso ningun dato, solo recojo
        type: "POST",
        dataType: "json",

        success: function (respuestaDatos) {
            console.log(respuestaDatos); 
			
            for (var key in respuestaDatos) {
				if (respuestaDatos[key].dniCliente==$dni) {
                    $('#dniClienteEdi').val(respuestaDatos[key].dniCliente);
                    $('#nombreClienteEdi').val(respuestaDatos[key].nombre);
                    $('#direccionEdi').val(respuestaDatos[key].direccion);
                    $('#emailEdi').val(respuestaDatos[key].email);
                	}
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("La solicitud ha fallado: " + textStatus + errorThrown);
        }
	});
	
}
function editar_CLiente(){
    var objeto_dato = {   //monto un objeto con los datos de la fila a insertar en la BD
        dniCliente:$('#dniClienteEdi').val(),
        nombre:$('#nombreClienteEdi').val(),
        direccion:$('#direccionEdi').val(),
        email:$('#emailEdi').val(),
        };
    

    $.ajax({
        url:"../Servidor/crudCliente/modificar.php",
        type:"POST",
        data: objeto_dato, // paso el dato por el post
        dataType:"json",
     }).done(function(respuesta){
        console.log(respuesta);  // recojo la respuesta, que sera true o false
     if(respuesta){
            alert("Dato actualizado correctamente !!!!");//si es correcta, actualizamos los datos de la fila
            $("#modal_editar").hide();//ocultamos el modal de editar los datos
           console.log($('#tabla_Clientes tbody tr').find('.dni').text());
           
        }else{ 
            alert("Error al acctualizar"); //si no es correcta no inserto nada
        } 
     }).fail(function( jqXHR, textStatus, errorThrown ) {
        console.log( "La solicitud ha fallado: " +  textStatus + errorThrown);
    });

}

/**
 * EDITAR Pedido,Primero se cargaran los datos en el formulario para poder editar los datos del PEDIDO obtenido para editar
 */

/**
 *********************BORRAR********************************
 * BORRAR CLIENTES
 */
function borrarCliente(){
    $(".borrarCliente").click(function(){ 
        var fila_borrar = $(this).parent().parent();//$(this) es el boton que ha generado el evento, me interesa la fila
         console.log(fila_borrar);   
         var objeto_dato = { 
            dni:fila_borrar.find('.dni').text(), //dentro de la fila, busco el td de clase dni, y me quedo con el texto
        };
        console.log(objeto_dato)
    
         $.ajax({
             url:"../Servidor/crudCliente/borrar.php",
             type:"POST",
             data: objeto_dato, // paso el dni para que se borre la fila de la BD
             dataType:"json",
         }).done(function(respuesta){
            console.log(respuesta);
             if(respuesta){
                 alert("Dato borrado correctamente !!!!");
                fila_borrar.remove(); // si se ha borrado la fila de la bd, borro de la pagina
             }else{
                alert("Error al borrar");
            } 
         }).fail(function( jqXHR, textStatus, errorThrown ) {
            console.log( "La solicitud ha fallado: " +  textStatus + errorThrown);
         });
    });
}


/**
 ********************************BOTONES CRUD*********************************** 
 * cargarr las funciones de los botones dentro de las tablas
 */
function mostrarEditarCliente(){
    $(".editarCliente").click(function(){
        $("#modal_editar").show();
        cargarDatosCliente($(this).parent().parent().find('.dni').text());
    })
    
}
function mostrarEditarPedido(){
    $(".editarPedido").click(function(){
        $("#modal_editar").show();
       
    })
    
}



