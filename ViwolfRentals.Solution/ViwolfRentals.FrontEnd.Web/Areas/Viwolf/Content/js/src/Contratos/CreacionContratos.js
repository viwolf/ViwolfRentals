var crearContrato = function () {
    var popupCrearContrato = $('#popupCrearContrato');
    var txtIdReservacionContrato = $('#txtIdReservacionContrato');
    var txtNombreClienteContrato = $('#txtNombreClienteContrato');
    var objReservacion = null;

    var abrirModal = function (reservacion) {
        objReservacion = reservacion;
        fnLlenarReservacion();
        popupCrearContrato.modal('show');
    };

    var fnLlenarReservacion = function () {
        debugger
        txtIdReservacionContrato.val(objReservacion.IdReservacion);
        txtNombreClienteContrato.val(objReservacion.NombreCliente);
    };

    return {
        AbrirModal: abrirModal
    }

}();