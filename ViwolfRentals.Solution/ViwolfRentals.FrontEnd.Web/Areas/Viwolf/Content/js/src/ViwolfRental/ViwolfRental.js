﻿var ViwolfRental = function () {
    var btnCrearReservacion = $("btnCrearReservacion");

    $(function () {
        init();
    })

    var init = function () {
        btnCrearReservacion.click(function () {
            debugger;
            Reservaciones.Mostrar();
        });
    }
}();