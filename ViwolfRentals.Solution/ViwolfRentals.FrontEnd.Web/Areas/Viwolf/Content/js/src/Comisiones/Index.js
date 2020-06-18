var indexPagoComision = function () {
    var txtIDClienteComisionista = $('#txtIDClienteComisionista');
    var txtNombreClienteComisionista = $('#txtNombreClienteComisionista');
    var txtEstadoComision = $('#txtEstadoComision');
    var tblDataComisiones = $('#tblDataComisiones');
    var btnBuscarComisiones = $('#btnBuscarComisiones');
    var btnPagarComision = $('#btnPagarComision');
    var objSeleccionado = null;
    var iPos = 0;
    var objComisiones = null;
    var arrayModificacion = [];


    var fnInit = function () {
       
        btnBuscarComisiones.click(fnBuscarComisiones);
        btnPagarComision.click(function (e) {
            debugger;
            if (objSeleccionado != null) {
                debugger;
                fnConfirmarPagar(e);
            }
            else {
                Dialog.alert('Contratos', "Debe seleccionar una reservacion.", function () {
                })
            }
        });

    };

    var fnConfirmarPagar = function (e) {
        debugger;
        Dialog.confirm('Comisiones', "Desea cancelar las comisiones generadas?", function (respuesta) {
            if (respuesta == true)
                fnPagarComisiones(e);
        })
    };

    var fnPagarComisiones = function (e) {
        debugger;
        var oData = {
            "EnumPagosComisiones": objComisiones,
            "ExtendedProperties": arrayModificacion
        }
        try {
            var oUrl = 'Comisiones/GuardarPagosComision';
            var oProcessMessage = 'Guardando Contrato';

            var success = function (result) {
                if (result.MessageType == "Success") {
                    Dialog.alert('Contrato', result.InfoMessage, function () {
                    })
                    debugger;
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

    var fnBuscarComisiones = function () {
        debugger;
        var oData = {
            "IDClienteComisionista": txtIDClienteComisionista.val(),
            "t_ClientesComisionistas.NombreClienteComisionista": txtNombreClienteComisionista.val(),
            "ComisionPaga": txtEstadoComision.val()
        };
        try {
            var oUrl = 'Comisiones/ListarPagosComision';
            var oProcessMessage = 'Buscando Comisiones por pagar';
            var success = function (result) {
                debugger;
                if (result.Data.length > 0) {
                    objComisiones = result.Data;
                    tblDataComisiones.dataTable({
                        destroy: true,
                        processing: true,
                        responsive: true,
                        data: result.Data,
                        select: true,
                        columns: [
                            { data: 'IDPagoComision' },
                            { data: 'IDContrato' },
                            { data: 'NumeroContrato' },
                            { data: 'NombreCliente' },
                            { data: 'PrecioTotal' },
                            { data: 'PorcentajeComision' },
                            { data: 'TotalPagar' },
                            { data: 'ComisionPaga' }
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
                            },
                            {
                                "targets": [7],
                                "visible": false,
                                "searchable": false
                            }
                        ]
                    });
                   
                    tblDataComisiones.on("click", "tr", function () {
                        iPos = tblDataComisiones.fnGetPosition(this);
                        objSeleccionado = tblDataComisiones.fnGetData(iPos);
                    });
                    tblDataComisiones.on("change", "input", function () {
                        debugger;
                        var valor = this.value;
                        var idComision = document.getElementById("tblDataComisiones").rows[iPos + 1].cells[0].innerText
                        objSeleccionado.TotalPagar = ((valor / 100) * objSeleccionado.PrecioTotal);
                        document.getElementById("tblDataComisiones").rows[iPos + 1].cells[4].innerText = objSeleccionado.TotalPagar;
                        document.getElementById("tblDataComisiones").rows[iPos + 1].cells[4].innerHTML = objSeleccionado.TotalPagar;
                        arrayModificacion.push({
                            "Key": idComision,
                            "Value": valor
                        })
                    });
                }
                else {
                    Dialog.alert('Comisiones', result.InfoMessage == "" ? result.ErrorMessage : result.InfoMessage, function () {
                    })
                    tblDataComisiones.dataTable().fnClearTable();
                };
            };
            app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
        } catch (ex) {

            retorno = false;
        }
    };

   

    $(function () {
        fnInit();
    });


}();