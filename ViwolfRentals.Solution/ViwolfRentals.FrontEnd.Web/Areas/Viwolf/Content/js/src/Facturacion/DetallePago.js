var detallePago = function() {
    var modalDetallePago = $('#popupPagarContrato');
    var txtTotalPagar = $('#txtTotalPagar');
    var montoTotal = 0;



    var fnInit = function () {
        txtTotalPagar.val(montoTotal);
    }

    var fnAbrirModal = function (total) {
        debugger;
        montoTotal = total;
        modalDetallePago.modal('show');
        fnInit();
    };




    return {
        AbrirModal: fnAbrirModal
    }


}()