var informacionReservacion = function () {
    var modalVehiculo = $('#popupInfoReservacion');

    var idReservacion = 0;

    var fnAbrirModal = function (idreservacion) {
        debugger;
        
        //fnInit();
        idReservacion = idreservacion;

        modalVehiculo.modal('show');
        //fnBuscarVehiculo();
    };

    return {
        AbrirModal: fnAbrirModal
    }
}();