var mantenimiento = function () {
    var btnEliminarReservacion = $("#btnEliminarReservacion");
    var tableListReservaciones = $('#tableListReservaciones');
    var objSeleccionado = null;

    var Init = function () {
        btnEliminarReservacion.click(fnConfirmarEliminar);
    }


    var fnConfirmarEliminar = function (e) {
        debugger;
        if (objSeleccionado != null) {

            if (objSeleccionado.GeneraContrato == true) {
                Dialog.alert('Reservaciones', "Existe un contrato relacionado a esta reservación.", function () {
                })
            }
            else {
                Dialog.confirm('Reservaciones', "Desea desactivar la reservervación seleccionada?", function (respuesta) {
                    if (respuesta == true) {
                        fnGuardarReservacion();
                    }
                })
            }
        }
        else {
            Dialog.alert('Reservaciones', "Debe seleccionar una reservacion.", function () {
            })
        }
    };


    var fnBuscarReservaciones = function () {
       
        var oData = {
            "Activo": true
        }
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
                            { data: 'GeneraContrato' },
                            { data: 'IdReservacion' },
                            { data: 'NombreCliente' },
                            { data: 'LugarEntrega' },
                            { data: 'FechaInicio' },
                            { data: 'FechaEntrega' },
                            { data: 'IDVehiculo' },
                            { data: 'InfoVehiculo' }
                          
                        ],
                        columnDefs: [
                            {
                                "targets": [0],
                                "visible": false,
                                "searchable": false
                            },
                        ]
                    });

                    $('#tableListReservaciones tbody').on('click', 'tr', function () {
                      

                        if ($(this).hasClass('selected')) {
                            objSeleccionado = null;
                        }
                        else {
                            tableListReservaciones.$('tr.selected').removeClass('selected');
                            var iPos = tableListReservaciones.fnGetPosition(this);
                            objSeleccionado = tableListReservaciones.fnGetData(iPos);
                        }
                    });

                    OnPageEvent(tableListReservaciones);
                }
                else {
                    Dialog.alert('Reservaciones', result.InfoMessage == "" ? result.ErrorMessage : result.InfoMessage, function () {
                    })
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
        debugger;

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
                        Dialog.alert('Reservaciones', result.InfoMessage, function () {
                        })
                        fnBuscarReservaciones();
                    }
                    else {
                        Dialog.alert('Reservaciones', result.ErrorMessage, function () {
                        })
                    }
                };
                app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
            } catch (ex) {

                retorno = false;
            }

        }
        else {
            Dialog.alert('Mantenimiento Reservaciones', "Debe seleccionar un registro.", function () {
            })
            
        }
    };

    $(function () {

        Init();
        fnBuscarReservaciones();

    });
}();