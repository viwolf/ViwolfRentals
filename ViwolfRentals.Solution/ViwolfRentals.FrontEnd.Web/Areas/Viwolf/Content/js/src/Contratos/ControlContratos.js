
var controlContratos = function () {
    var txtNumeroContrato = $('#txtNumeroContrato');
    var txtNombreCliente = $('#txtNombreCliente');
    var txtHospedaje = $('#txtHospedaje');
    var txtFechaInicio = $('#txtFechaInicio');
    var txtFechaFinal = $('#txtFechaFinal');
    var btnBuscarContrato = $('#btnBuscarContrato');
    var tblDataContratos = $('#tblDataContratos');
    var btnCrearContrato = $('#btnCrearContrato');
    var txtEstadoContrato = $('#txtEstadoContrato');
    var dateIni = null;
    var dateFin = null;
    var objSeleccionado = null;

    var InitSelect = function () {
        cargarSelect2(txtEstadoContrato,
            {
                PlaceHolder: "",
                Url: "ListarEstadosContratos",
                DataType: 'json',
                Type: "POST",
                Id: "IDEstadoContrato",
                Text: "Descripcion",
                InitSelection: function (callback, configuracion) {
                    $.ajax(configuracion.Url, {
                        url: configuracion.Url,
                        data: configuracion.data,
                        dataType: 'json',
                        type: 'POST'
                    }).done(function () {

                    });
                },

            });
    };

    var cargarSelect2 = function (elemento, configuracion) {

        $.ajax({
            type: "POST",
            url: configuracion.Url,
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {

                $(msg.Data).each(function (serverData) {
                    if (configuracion.SuccessFunction) {
                        configuracion.SuccessFunction(serverData);
                    }
                    var option = $(document.createElement('option'));

                    option.text(this[configuracion.Text]);
                    option.val(this[configuracion.Id]);



                    elemento.append(option);
                });

            },
            error: function (msg) {
                $("#dvAlerta > span").text("Error al llenar el combo");
            }
        });


    };

    var fnInit = function () {
        //table = $('#tblDataContratos').DataTable();
        btnBuscarContrato.click(fnBuscarContrato);
        //btnCrearContrato.click(function () {
        //    if (objSeleccionado != null) {
        //        crearContrato.AbrirModal(objSeleccionado);
        //    }
        //    else {
        //        Dialog.alert('Contratos', "Debe seleccionar una reservacion.", function () {
        //        })
        //    }
        //});

        //btnGenerarContrato.click(function (e) {
        //   
        //    if (objSeleccionado != null) {
        //       
        //        fnConfirmarGenerar(e);
        //    }
        //    else {
        //        Dialog.alert('Contratos', "Debe seleccionar una reservacion.", function () {
        //        })
        //    }
        //});
    };

    var fnConfirmarGenerar = function (e) {
       
        Dialog.confirm('Contratos', "Desea generar el Contrato?", function (respuesta) {
            if (respuesta == true)
                fnGuardarContrato(e);
        })
    };

    function fnOnClickBtn_Extender() {
        var t = setTimeout(function () {
           
            extenderContrato.AbrirModal(objSeleccionado);
        }, 100);
    };

    function OnPageEvent(table) {
       
        let $btnTerminar = $(table.fnGetNodes()).find("button[name^='btnT_']");
        let $btnExtender = $(table.fnGetNodes()).find("button[name^='btnE_']");


        $btnTerminar.click(function () {
            
        });

        $btnExtender.click(function () {
           
            fnOnClickBtn_Extender();
        });
    }

    var fnGuardarContrato = function (e) {
       
        var oData = {
            "UsuarioCreacion": usuarioLogueado,
            "IDEstadoContrato": configViwolf.EstadosContratos.Pendiente,
            "IDReservacion": objSeleccionado.IdReservacion,
            "IDCodigoContrato": configViwolf.CodigosContratos.Sistema,
            "TotalContrato": objSeleccionado.MontoTotal
        }
        try {
            var oUrl = 'Contratos/GuardarContrato';
            var oProcessMessage = 'Guardando Contrato';

            var success = function (result) {
                if (result.MessageType == "Success") {
                    Dialog.alert('Contrato', result.InfoMessage, function () {
                    })
                   
                    generarContrato.fnReporteTicket(e, result.Data.IDContrato, 1)
                }
                else {
                    Dialog.alert('Contrato', result.ErrorMessage, function () {
                    })
                }
            };
            app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
        } catch (ex) {

            retorno = false;
        }
    };

    var fnBuscarContrato = function () {
       
        var oData = {
            "NumeroContrato": txtNumeroContrato.val(),
            "NombreCliente": txtNombreCliente.val(),
            "IDEstadoContrato": txtEstadoContrato.val()
        };
        try {
            var oUrl = 'ListarContratos';
            var oProcessMessage = 'Buscando Reservaciones';
            var success = function (result) {
               
                if (result.Data.length > 0) {

                    tblDataContratos.dataTable({
                        destroy: true,
                        processing: true,
                        responsive: true,
                        data: result.Data,
                        select: true,
                        columns: [
                            { data: 'IDContrato' },
                            { data: 'objReservacion' },
                            { data: 'NumeroContrato' },
                            { data: 'NombreCliente' },
                            { data: 'FechaInicio' },
                            { data: 'FechaEntrega' },
                            { data: 'Extender' },
                            { data: 'Terminar' }
                        ],
                        columnDefs: [
                            {
                                "targets": [0],
                                "visible": false,
                                "searchable": false
                            },
                            {
                                "targets": [1],
                                "visible": false,
                                "searchable": false
                            }
                        ]
                    });
                    tblDataContratos.on("click", "tr", function () {
                        var iPos = tblDataContratos.fnGetPosition(this);
                       
                        objSeleccionado = tblDataContratos.fnGetData(iPos);
                    });
                    OnPageEvent(tblDataContratos);
                }
                else {
                    Dialog.alert('Contratos', result.InfoMessage == "" ? result.ErrorMessage : result.InfoMessage, function () {
                    })
                    tblDataReservacion.dataTable().fnClearTable();
                };
            };
            app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
        } catch (ex) {

            retorno = false;
        }
    }

    $(function () {
        fnInit();
        InitSelect();
    });
}();