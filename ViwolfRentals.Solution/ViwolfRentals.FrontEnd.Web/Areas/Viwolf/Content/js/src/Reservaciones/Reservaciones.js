var reservaciones = function () {
    var popupReservaciones = $("#popupReservaciones");

    var fnMostrar = function () {
        popupReservaciones.modal("show");
    }

    return {
        Mostrar: fnMostrar
    };
}();