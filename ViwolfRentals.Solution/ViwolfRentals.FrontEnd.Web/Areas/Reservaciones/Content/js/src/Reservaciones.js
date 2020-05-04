var reservaciones = function () {
    var popupReservaciones = $("#popupReservaciones");

    var _fnMostrar = function () {
        popupReservaciones.modal("show");
    }

    return {
        fnMostrar: _fnMostrar
    };
}();