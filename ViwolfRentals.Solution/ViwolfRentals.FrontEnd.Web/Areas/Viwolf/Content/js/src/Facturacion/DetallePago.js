var detallePago = function() {
    var modalDetallePago = $('#popupPagarContrato');
    var txtTotalPagar = $('#txtTotalPagar');
    var txtMontoPagarTotal = $('#txtMontoPagarTotal');
    var txtTipoPago = $('#txtTipoPago');
    var TxtReferencia = $('#TxtReferencia');
    var btnAgregar = $("#btnAgregar");
    var txtMonto = $('#txtMonto');
    var btnFacturar = $("#btnFacturarContrato");
    var montoTotal = 0;
    var table = null;
    var fnCallback = null;


    var fnInit = function () {
        table = $('#tblDataDetallePagos').DataTable();
        txtTotalPagar.val(montoTotal);
        txtMontoPagarTotal.val(montoTotal);
        txtTipoPago.change(function () {
            if (txtTipoPago.val() == 1)
                document.getElementById("TxtReferencia").disabled = true;
            else
                document.getElementById("TxtReferencia").disabled = false;
            TxtReferencia.val("");
        });
        btnAgregar.bind().click(fnAgregarPago);
        debugger;
        btnFacturar.bind().click(fnSave);
    };

    var fnAgregarPago = function () {
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
                var tipo = document.getElementById("txtTipoPago");
                var idTipo = tipo.options[tipo.selectedIndex].value;
                var nombre = tipo.options[tipo.selectedIndex].text;
                table.row.add([
                    idTipo,
                    nombre,
                    TxtReferencia.val(),
                    txtMonto.val()
                    //'<button id="btnEliminar"><i class="fa fa-trash-alt"></i></button>'
                ]).draw(false);
                montoTotal = montoTotal - txtMonto.val();
                txtTotalPagar.val(montoTotal);

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
                //    
                //    table.row('.selected').remove().draw(false);
                //});
            }
    };

    var fnSave = function () {
        debugger;
        var obj = table
            .rows()
            .data();
        if (obj.length > 0) {
            fnCallback(obj);
            modalDetallePago.modal('hide');
        }
    };

    var fnAbrirModal = function (total, callback) {
        
        montoTotal = total;
        fnCallback = callback;
        modalDetallePago.modal('show');
        fnInit();
    };




    return {
        AbrirModal: fnAbrirModal
    }


}()