var detallePago = function() {
    var modalDetallePago = $('#popupPagarContrato');
    var txtTotalPagar = $('#txtTotalPagar');
    var txtMontoPagarTotal = $('#txtMontoPagarTotal');
    var txtTipoPago = $('#txtTipoPago');
    var TxtReferencia = $('#TxtReferencia');
    var btnAgregar = $("#btnAgregar");
    var txtMonto = $('#txtMonto');
    var btnFacturar = $("#btnFacturarContrato");
    var txtCambio = $("#txtCambio");
    var txtDescuento = $("#txtDescuento");
    var montoTotal = 0;
    var table = null;
    var fnCallback = null;
    var checkValidaAdm = false;
    var TotalDescuento = 0;
    var cambio = 0;
    var montoPago = 0;

    var fnCallBackAutorizar = function (result) {
        debugger;
        checkValidaAdm = false;
        if (result != null) {
            if (result.Data.length > 0) {
                if (result.Data[0].IdRol != configViwolf.Roles.Administrador) {
                    Dialog.alert("DetallePago", "El usuario no es un administrador.");
                    txtDescuento.val(0);
                }
                else {
                    checkValidaAdm = true;
                    calcularDescuento();
                    
                }
            }
            else {
                Dialog.alert("DetallePago", "El Usuario no existe.");
                txtDescuento.val("");
            }
        }
        else {
            txtDescuento.val("");
        }

    };

    var calcularDescuento = function () {
        var montototal = txtMontoPagarTotal.val();
        var descuento = txtDescuento.val();
        var montoDescuento = ((descuento / 100) * montototal);
        txtMontoPagarTotal.val(montototal - montoDescuento)
        txtTotalPagar.val(montototal - montoDescuento);
    };

    //Solo permite introducir numeros.
    function valideKey(evt) {
        var code = evt.which ? evt.which : evt.keyCode;
        if (code == 8) {
            //backspace
            return true;
        } else if (code >= 48 && code <= 57) {
            //is a number
            return true;
        } else {
            return false;
        }

    }

    var fnInit = function () {
        debugger;
        table = $('#tblDataDetallePagos').DataTable();
        txtTotalPagar.val(montoTotal);
        txtMontoPagarTotal.val(montoTotal);
        txtTipoPago.change(function () {
            if (txtTipoPago.val() == 1)
                document.getElementById("TxtReferencia").disabled = true;
            else
                document.getElementById("TxtReferencia").disabled = false;
            TxtReferencia.val("");
            txtMonto.val("");
        });

        btnAgregar.unbind('click');
        btnFacturar.unbind('click');

        btnAgregar.click(fnAgregarPago);
        btnFacturar.click(fnSave);

        txtDescuento.bind('keypress', valideKey);

        txtMonto.bind('keypress', valideKey);

        txtDescuento.blur(function () {
            debugger;
            if ((txtDescuento.val() != "") && (txtDescuento.val() > 0)) {
                if (sessionStorage.getItem('IdRol') != configViwolf.Roles.Administrador) {
                    checkValidaAdm = false;
                    Dialog.confirm('DetallePago', "Desea autorizar el descuento?", function (respuesta) {
                        if (respuesta == true) {
                            autorizacionLogin.AbrirModal(fnCallBackAutorizar);
                        }
                        else {
                            txtDescuento.val("");
                        }
                    })
                }
                else {
                    checkValidaAdm = true;
                    calcularDescuento();
                }
            }

            else {
                checkValidaAdm = true;
                calcularDescuento();
            }
        })
    };

    var fnAgregarPago = function () {
        if (txtTotalPagar.val() > 0) {
            if ((txtTipoPago.val() != 1) && (TxtReferencia.val() == '')) {
                Dialog.alert('DetallePago', "Debe digitar una referencia.", function () {
                })
            }
            else
                if (txtMonto.val() == '') {
                    Dialog.alert('DetallePago', "Debe digitar un monto.", function () {
                    })
                }
                else {
                    debugger;
                  
                    montoTotal = montoTotal - txtMonto.val();
                    if (montoTotal <= 0) {
                        montoPago = parseInt(txtTotalPagar.val());
                        txtTotalPagar.val("0");
                    }
                    else {
                        montoPago = montoPago + parseInt(txtMonto.val());
                        txtTotalPagar.val(montoTotal);
                    }
                    debugger;
                    
                    cambio = txtMonto.val() - txtMontoPagarTotal.val();
                    if (cambio >= 0)
                        txtCambio.val(cambio);
                    else
                        txtCambio.val(0);


                    var tipo = document.getElementById("txtTipoPago");
                    var idTipo = tipo.options[tipo.selectedIndex].value;
                    var nombre = tipo.options[tipo.selectedIndex].text;

                    table.row.add([
                        idTipo,
                        nombre,
                        TxtReferencia.val(),
                        montoPago,
                        // '<button id="btnEliminar"><i class="fa fa-trash-alt"></i></button>'
                    ]).draw(false);

                    //$('#tblDataDetallePagos tbody').bind().on('click', 'tr', function () {
                    //    if ($(this).hasClass('selected')) {
                    //        $(this).removeClass('selected');
                    //    }
                    //    else {
                    //        table.$('tr.selected').bind().removeClass('selected');
                    //        $(this).addClass('selected');
                    //    }
                    //});

                    //$('#btnEliminar').bind().click(function (e) {

                    //    table.row('.selected').remove().draw(false);
                    //});

                    TxtReferencia.val("");
                    txtMonto.val("");
                }
        }
        else {
            Dialog.alert('DetallePago', "Ya no existe ningún monto a pagar.", function () {
            })
        };
    };

    var fnSave = function () {
        debugger
        var obj = table
            .rows()
            .data();


        if (obj.length > 0) {
            var text = "[";
            for (var i = 0; i < obj.length; i++) {
                if ((obj.length - i) == 1) {
                    text = text + '{"IDTipoPago":"' + obj[i][0] + '", "NombreTipoPago":"' + obj[i][1] + '", "Referencia":"' + obj[i][2] + '", "Monto":"' + obj[i][3] + '"}';
                }
                else {
                    text = text + '{"IDTipoPago":"' + obj[i][0] + '", "NombreTipoPago":"' + obj[i][1] + '", "Referencia":"' + obj[i][2] + '", "Monto":"' + obj[i][3] + '"},';
                }
                
            }
            text = text + "]";
            var data = JSON.parse(text);

            if (txtTotalPagar.val() > 0) {
                Dialog.alert("DetallePago", "Debe completar el monto total.");
            }
            else {
                fnCallback(data);
                modalDetallePago.modal('hide');
            }
        }
    };

    var fnLimpiarDatos = function () {
        txtTotalPagar.val("");
        txtCambio.val("");
        txtMontoPagarTotal.val("");
        TxtReferencia.val("");
        txtMonto.val("");
        txtDescuento.val("");
        var table = $('#tblDataDetallePagos').DataTable();
        table
            .clear()
            .draw();
    };

    var fnAbrirModal = function (total, callback) {
        montoTotal = total;
        fnCallback = callback;
        modalDetallePago.modal('show');
        fnLimpiarDatos();
        fnInit();
    };




    return {
        AbrirModal: fnAbrirModal
    }


}()