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
    var txttipocambio = $("#txttipocambio");
    var txtMoneda = $("#txtMoneda");
    var btnLimpiar = $("#btnLimpiar");
    var montoTotal = 0;
    var table = null;
    var fnCallback = null;
    var checkValidaAdm = false;
    var TotalDescuento = 0;
    var cambio = 0;
    var montoPago = 0;

  

    function selectElement(id, valueToSelect) {
        let element = document.getElementById(id);
        element.value = valueToSelect;
    }

    var calcularTipoCambio = function () {
       
        if (txttipocambio.val() == "") {
            Dialog.alert('DetallePago', "Debe actualizar el tipo de cambio.", function () {
            })
            selectElement('txtMoneda', '1')
        }
        else {
            if (txtMoneda.val() == 2) {
                var Mtotal = parseFloat(txtMontoPagarTotal.val().replace("$", ""));
                var TCambio = parseFloat(txttipocambio.val());
                var MConvertido = Mtotal * TCambio;
                txtMontoPagarTotal.val(utils.formatterColon.format(MConvertido));
                txtTotalPagar.val(MConvertido);
            }
            else {
                var Mtotal = parseInt(txtMontoPagarTotal.val().replace("CRC", "").replace(",",""));
                var TCambio = parseFloat(txttipocambio.val());
                var MConvertido = Mtotal / TCambio;
                txtMontoPagarTotal.val(utils.formatterDolar.format(MConvertido));
                txtTotalPagar.val(MConvertido);
            }
        }

        
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
       
        table = $('#tblDataDetallePagos').DataTable();
        txtTotalPagar.val(montoTotal);
        txtMontoPagarTotal.val(utils.formatterDolar.format(montoTotal));
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

        

        txtMonto.bind('keypress', valideKey);

        txtMoneda.change(calcularTipoCambio);

        btnLimpiar.unbind('click');
        btnLimpiar.click(fnLimpiarTabla);

        
    };

    var fnLimpiarTabla = function () {
        var table = $('#tblDataDetallePagos').DataTable();
        table
            .clear()
            .draw();
        txtCambio.val("");
        txtTotalPagar.val(parseInt(txtMontoPagarTotal.val().replace("$","")));
        TxtReferencia.val("");

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
                   
                  
                    montoTotal = montoTotal - txtMonto.val();
                    //montoTotal = txtMonto.val() - txtTotalPagar.val();
                    if (montoTotal <= 0) {
                        montoPago = parseInt(txtTotalPagar.val());
                        txtTotalPagar.val("0");
                    }
                    else {
                        montoPago = montoPago + parseInt(txtMonto.val());
                        txtTotalPagar.val(montoTotal);
                    }
                   

                    cambio = txtMonto.val() - parseInt(txtMontoPagarTotal.val().replace("$",""));
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
        txttipocambio.val("");
        var table = $('#tblDataDetallePagos').DataTable();
        table
            .clear()
            .draw();
    };

    var fnAbrirModal = function (total, callback) {
       
        $("#tblDataDetallePagos").DataTable({
            filter: false,
            "bLengthChange": false,
            "bPaginate": false,
            "bInfo": false,
        });

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