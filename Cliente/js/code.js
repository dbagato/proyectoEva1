/*primero cargaremos las funciones principales
listar, para cargar los datos de las dos tablas, la de clientes y la de pedidos.
*/

$(document).ready(function(){
    //LISTAR
    listar_clientes();
    listar_pedidos();

    //CARGA MODALES
    //se esconden los modales
    $("#modal_anyadir").hide();
    $("#modal_editar").hide();
    //se carga la funcion de al darle al boton de anyadir se muestran los modales
    $("#anyadirCliente").click(function(){
		$("#modal_anyadir").show();
    });
    $("#anyadirPedido").click(function(){
        $("#modal_anyadir").show();
    });
    
    //Cargamos las funciones para que al darle al boton cerrar se escondan los modales
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
                $("#tabla_Clientes tbody").append("<tr><td class='dni'>" + respuesta[key].dniCliente + "</td><td id='nombre'>" + respuesta[key].nombre +
                    "</td> <td><button class='editarCliente'>Editar</button><button class='borrarCliente'>Borrar</button></td></tr>");
                //al hacer la llamada anyadimos los datos de dni y de nombre al select que usaremos en el modal de pedidos para anyadir
                $(".clientePedido").append("<option value='"+respuesta[key].dniCliente+"'>"+respuesta[key].nombre+"</option>");  
            }
            mostrarEditarCliente();//cargamos la funcion para que al anyadir la nueva fila pueda usar los eventos
            borrarCliente();//cargamos la funcion para que al anyadir la nueva fila pueda usar los eventos
            mostrarAnyadirCliente();//cargamos la funcion para que al anyadir la nueva fila pueda usar los eventos
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
             // array de objetos, lo itero y pinto una fila por cada objeto

            for (var key in respuesta) {
                $("#tabla_Pedidos").append("<tr><td id='idPedido'>" + respuesta[key].idPedido + "</td><td id='nombre' >" + respuesta[key].dniCliente + "</td><td id='fechaPedido'>" +
                respuesta[key].fecha    + "</td> <td><button class='listarLineaPedido'>Listar</button><button class='editarPedido'>Editar</button><button class='borrarPedido'>Borrar</button></td></tr>");
            }
            mostrarAnyadirPedido();
            mostrarEditarPedido();
            borrarPedido();
            listar_lineaPedidos();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("La solicitud ha fallado: " + textStatus + errorThrown);
        }
    });
}
/**
 * Listar Linea Pedidos, al darle al boton de Listar se anyadiran debajo de la fila del pedido las lineas de lineaPedido
 */
function listar_lineaPedidos(){
    $('.listarLineaPedido').click(function (){
        var filaPedidos = $(this).parent().parent();
        var idPedido = {idPedido:filaPedidos.find('#idPedido').text()};
        $.ajax({
            url: "../Servidor/crudCliente/listarLineaPedido.php", // no paso ningun dato, solo recojo
            type: "POST",
            data:idPedido,
            dataType: "json",
    
            success: function (respuesta) {
                 // array de objetos, lo itero y pinto una fila por cada objeto
                 //("<table id=lineaPedidos><thead><tr><th>Linea</th><th>Cantidad</th><th>Producto</th><th>Acciones</th></tr></thead><tbody></tbody><table>");
                console.log(respuesta);
                 for (var key in respuesta) {
                    filaPedidos.append("<tr><td id='nLinea'>" + respuesta[key].nlinea + "</td><td id='cantidad' >" + respuesta[key].cantidad + "</td><td id='nombre'>" +
                        respuesta[key].idProducto    + "</td> <button class='borrarLineaPedido'>Borrar</button></td></tr>");
                    
                    
                }
                filaPedidos.append("<tr><td></td><td></td><td></td> <button class='anyadirLineaPedido'>anyadir</button></td></tr>");
                mostrarEditarPedido();

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("La solicitud ha fallado: " + textStatus + errorThrown);
            }
        });

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
            $("#modal_anyadir").hide();//al anyadir el cliente cerramos el modal
        }else{ 
            alert("Error en la insercion"); //si no es correcta no inserto nada
        } 
        mostrarEditarCliente();//cargamos la funcion para que al anyadir la nueva fila pueda usar los eventos 
        borrarCliente();//cargamos la funcion para que al anyadir la nueva fila pueda usar los eventos
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
            fecha:$('#fechaPedido').val(),
            dniCliente:$(".clientePedido").val()
            }
    console.log(objeto_Pedido)
    
    $.ajax({
        url:"../Servidor/crudCliente/insertarProducto.php",
        type:"POST",
        data: objeto_Pedido, // paso el dato por el post
        dataType:"json",
    }).done(function(respuesta){
        console.log(respuesta);  // recojo la respuesta, que sera true o false
       if(respuesta){
            alert("Dato insertado correctamente !!!!");//si es correcta, inserto los datos en una fila nueva
            $("#tabla_Pedidos tbody").append("<tr><td>"+respuesta+"</td><td>"+objeto_Pedido.dniCliente+"</td><td>"+objeto_Pedido.fecha+"</td> <td><button class='listarLineaPedido'>Listar</button><button class='editarPedido'>Editar</button><button class='borrarPedido'>Borrar</button></td></tr>");
            $("#modal_anyadir").hide();//al anyadir el dato escondemos el modal de anyadir
        }else{ 
            alert("Error en la insercion"); //si no es correcta no inserto nada
        }
        borrarPedido();
        listar_lineaPedidos();
    }).fail(function( jqXHR, textStatus, errorThrown ) {
        console.log( "La solicitud ha fallado: " +  textStatus + errorThrown);
    });
    ;

}
/**
 *********************EDITAR********************************
 * EDITAR CLIENTES,Primero se cargaran los datos en el formulario para poder editar los datos del Cliente obtenido para editar
 */
function mostrarEditarCliente(){
        //añadimos la funcionabilidad al boton de editarCliente para que si se pulsa mostrar el modal
        $(".editarCliente").click(function(){
            $("#modal_editar").show();
            var fila=$(this).parent().parent();
            var dni={dni:fila.find('.dni').text()};
            console.log(dni);
            //si se pulsa el modal se hace una llamada a ajax para cargar los datos dentro del formulario 
            $.ajax({
                url: "../Servidor/crudCliente/buscarCliente.php", // no paso ningun dato, solo recojo
                type: "POST",
                data:dni ,
                dataType: "json",
    
                success: function (respuestaDatos) {
                    console.log(respuestaDatos); 
                
                            $('#dniClienteEdi').val(respuestaDatos.dniCliente);
                            $('#nombreClienteEdi').val(respuestaDatos.nombre);
                            $('#direccionEdi').val(respuestaDatos.direccion);
                            $('#emailEdi').val(respuestaDatos.email);
    
                 },
                error: function (jqXHR, textStatus, errorThrown) {
                 console.log("La solicitud ha fallado: " + textStatus + errorThrown);
                }
            });
            //anyadimos la funcio al boton de cliente_editado

            $("#cliente_editado").click(function(){
                //cuando se pulse el boton se creara el objeto con los parametros a rellenar en la BD

                    var objeto_dato = {   //monto un objeto con los datos de la fila a insertar en la BD
                        dniCliente:$('#dniClienteEdi').val(),
                        nombre:$('#nombreClienteEdi').val(),
                        direccion:$('#direccionEdi').val(),
                        email:$('#emailEdi').val(),

                    };    

                        //se realiza la llamada a ajax para actualizar la bd con los daros pasados por el formulario
                    $.ajax({
                        url:"../Servidor/crudCliente/modificar.php",
                        type:"POST",
                        data: objeto_dato, // paso el dato por el post
                        dataType:"json",
                        }).done(function(respuesta){
                        console.log(respuesta);  // recojo la respuesta, que sera true o false
                        if(respuesta){
                            alert("Dato actualizado correctamente !!!!");//si es correcta, actualizamos los datos de la fila
                        //anyadimos la fila con los nuevos datos debajo de la fila que obtubimos el resultado
                            $(fila).after("<tr><td class='dniCliente'>"+objeto_dato.dniCliente+"</td><td calass='nombreCli'>"+objeto_dato.nombre+"</td> <td><button id='editarCliente'>Editar</button><button class='borrarCliente'>Borrar</button></td></tr>")
                        //borramos la fila con los datos antiguos
                            $(fila).remove();
                            $("#modal_editar").hide();//ocultamos el modal de editar los datos
                      
                       
                        }else{ 
                            alert("Error al acctualizar"); //si no es correcta no inserto nada
                        } 
                        }).fail(function( jqXHR, textStatus, errorThrown ) {
                        console.log( "La solicitud ha fallado: " +  textStatus + errorThrown);
                    });
                });
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
        var borra = confirm("¿Esta seguro de Borrar Pedido?");//confir para asegurar que se quiere borrar
        var fila_borrar = $(this).parent().parent();//$(this) es el boton que ha generado el evento, me interesa la fila
         console.log(fila_borrar);   
         var objeto_dato = { 
            dni:fila_borrar.find('.dni').text(), //dentro de la fila, busco el td de clase dni, y me quedo con el texto
        };
        console.log(objeto_dato)
        if(borra){
         $.ajax({
             url:"../Servidor/crudCliente/borrar.php",
             type:"POST",
             data: objeto_dato, // paso el dni para que se borre la fila de la BD
             dataType:"json",
         }).done(function(respuesta){
            console.log(respuesta);
             if(respuesta){
                    fila_borrar.remove(); // 
                    alert("Dato borrado correctamente !!!!"); // si se ha borrado la fila de la bd, borro de la pagina
                 
             }else{
                alert("Error al borrar");
            } 
         }).fail(function( jqXHR, textStatus, errorThrown ) {
            console.log( "La solicitud ha fallado: " +  textStatus + errorThrown);
         });
        }
    });
}
//PEDIDOS
function borrarPedido(){
    $(".borrarPedido").click(function(){
        var borra = confirm("¿Esta seguro de Borrar Pedido?"); 
        var fila_borrar = $(this).parent().parent();//$(this) es el boton que ha generado el evento, me interesa la fila
         console.log(fila_borrar);   
         var objeto_dato = { 
            idPedido:fila_borrar.find('#idPedido').text(), //dentro de la fila, busco el td de clase dni, y me quedo con el texto
        };
        console.log(objeto_dato)
        if(borra){
         $.ajax({
             url:"../Servidor/crudCliente/borrarProducto.php",
             type:"POST",
             data: objeto_dato, // paso el dni para que se borre la fila de la BD
             dataType:"json",
         }).done(function(respuesta){
            console.log(respuesta);
             if(respuesta){
                fila_borrar.remove(); // 
                alert("Dato borrado correctamente !!!!"); // si se ha borrado la fila de la bd, borro de la pagina
             }else{
                alert("Error al borrar");
            } 
         }).fail(function( jqXHR, textStatus, errorThrown ) {
            console.log( "La solicitud ha fallado: " +  textStatus + errorThrown);
         });
        }
    });
}


/**
 ********************************BOTONES CRUD*********************************** 
 * cargarr las funciones de los botones dentro de las tablas
 */
//CLIENTE
function mostrarAnyadirCliente(){
    $("#nuevoCliente").click(function(){
        anyadir_Cliente();
    });
}

//PEDIDO
function mostrarEditarPedido(){
    $(".editarPedido").click(function(){
        $("#modal_editar").show();
       
    });
    
}
function mostrarAnyadirPedido(){
    $("#nuevoPedido").click(function(){
        anyadir_pedido();
    });
}

