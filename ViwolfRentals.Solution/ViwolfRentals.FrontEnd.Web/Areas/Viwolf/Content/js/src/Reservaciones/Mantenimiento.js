var mantenimiento = function () {
    var btnEliminarReservacion = $("#btnEliminarReservacion");
    var tableListReservaciones = $('#tableListReservaciones');
    var objSeleccionado = null;

    var Init = function () {
        btnEliminarReservacion.click(fnGuardarReservacion);
    }

    var fnBuscarReservaciones = function () {
       
        var oData = null;
        try {
            var oUrl = 'ListarReservacion';
            var oProcessMessage = 'Buscando Reservaciones';
            var success = function (result) {
                if (result.Data.length > 0) {

                   
                    tableListReservaciones.dataTable({
                        destroy: true,
                        processing: true,
                        responsive: true,
                        data: result.Data,
                        select: true,
                        columns: [
                            { data: 'IdReservacion' },
                            { data: 'NombreCliente' },
                            { data: 'LugarEntrega' },
                            { data: 'FechaInicio' },
                            { data: 'FechaEntrega' },
                            { data: 'IDVehiculo' },
                            { data: 'InfoVehiculo' }
                            //,
                          // { data: 't_Vehiculos.t_CategoriasVehiculos.NombreCategoriaVehiculo' },
                        ],
                    });
                    tableListReservaciones.on("click", "tr", function () {
                       
                        var iPos = tableListReservaciones.fnGetPosition(this);
                        objSeleccionado = tableListReservaciones.fnGetData(iPos);


                    });

                    OnPageEvent(tableListReservaciones);
                }
                else {
                    alert("No se encontró el vehiculo en la busqueda");
                };
            };
            app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
        } catch (ex) {

            retorno = false;
        }


    }

    function fnOnClickBtn_InfoVehiculo() {
        var t = setTimeout(function () {
           
            //informacionVehiculo.AbrirModal(objSeleccionado.IDVehiculo)


        }, 100);
    };

    function OnPageEvent(table) {
        let $btnInfo = $(table.fnGetNodes()).find("button[name^='btnV_']");

        //$btnEditar.css('height', '35px');
        $btnInfo.css('height', '20px');
        //$btnEditar.css('width', '35px');
        $btnInfo.css('width', '35px');

        //$btnEditar.unbind().click(function (e) {
        //    fnOnClickBtn_editTarjeta(e);
        //});

        $btnInfo.click(function () {
            fnOnClickBtn_InfoVehiculo();
        });
    }

    var fnGuardarReservacion = function () {


        if (objSeleccionado != null) {

            var oData = {
                "UsuarioCreacion": usuarioLogueado,
                "IdReservacion": objSeleccionado.IdReservacion,
                "IDVehiculo": objSeleccionado.IDVehiculo,
                "Activo": false
            }

            try {
                var oUrl = 'GuardarReservacion';
                var oProcessMessage = 'Guardando Reservacion';

                var success = function (result) {
                    if (result.MessageType == "Success") {
                        alert("Reservacion eliminada con exito");
                        fnBuscarReservaciones();
                    }


                };
                app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
            } catch (ex) {

                retorno = false;
            }

        }
        else {
            alert("Debe seleccionar un registro.")
        }
    };

    $(function () {

        Init();
        fnBuscarReservaciones();

    });
}();