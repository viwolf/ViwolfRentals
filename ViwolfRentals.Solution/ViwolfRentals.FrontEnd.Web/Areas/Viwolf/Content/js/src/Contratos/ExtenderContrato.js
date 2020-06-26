﻿var extenderContrato = function () {
    var popupExtenderContrato = $('#popupExtenderContrato');
    var TxtContrato = $("#TxtContrato");
    var txtNombreClienteContrato = $("#txtNombreClienteContrato");
    var TxtFechaInicio = $("#TxtFechaInicio");
    var TxtFechaEntrega = $("#TxtFechaEntrega");
    var txtHoraInicio = $("#txtHoraInicio");
    var txtHoraEntrega = $("#txtHoraEntrega");
    var txtMontoDia = $("#txtMontoDia");
    var txtMontoTotal = $("#txtMontoTotal");
    var txtIdVehiculo = $("#txtIdVehiculo");
    var btnCargarVehiculo = $("#btnCargarVehiculo");
    var objContrato = null;
    var cantidadDias = 0;
    var timeIn = 0;
    var timeOut = 0;
    var dateIni = new Date();
    var dateFin = new Date();

    function fnCargaFechas() {
        

        dateIni = new Date(objContrato.objReservacion.FechaInicio);
        dateFin = new Date(objContrato.objReservacion.FechaEntrega);

        TxtFechaInicio.datepicker("destroy");
        TxtFechaEntrega.datepicker("destroy");

        TxtFechaInicio.datepicker({
            autoclose: true,
            dateFormat: "dd/mm/yy",
            onSelect: function (selected) {
                var fechaFinal = moment(TxtFechaEntrega.val(), 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss');
                var fechaSeleccionada = moment(selected, 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss');
                dateIni = new Date(fechaSeleccionada);
                TxtFechaEntrega.datepicker("option", "minDate", selected);
                cantidadDias = ((moment(fechaFinal).diff(fechaSeleccionada, 'days')));
            }, minDate: '-0D'
            , maxDate: '+500D'
        });

        TxtFechaEntrega.datepicker({
            autoclose: true,
            dateFormat: "dd/mm/yy",
            onSelect: function (selected) {
                debugger;
                var fechaInicial = moment(TxtFechaInicio.val(), 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss');
                var fechaSeleccionada = moment(selected, 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss');
                dateFin = new Date(fechaSeleccionada);
               // TxtFechaInicio.datepicker("option", "maxDate", selected);
                cantidadDias = ((moment(fechaSeleccionada).diff(fechaInicial, 'days')));
                calcularTarifaTotal();
            },
            maxDate: '+500D'
        });

        txtHoraEntrega.timepicker({
            timeFormat: 'h:mm p',
            interval: 30,
            minTime: '5',
            maxTime: '11:00pm',
            startTime: '5:00',
            //defaultTime: '11',
            scrollbar: true,
            change: function (e) {
                timeIn = e.getTime();
                txtHoraEntrega.timepicker('setTime', new Date(e));
            //    calcularTarifaTotal();
             //   cargarHoraFinal(e);

            }
        });

        TxtFechaInicio.datepicker('setDate', objContrato.objReservacion.FechaInicio);
        TxtFechaEntrega.datepicker('setDate', objContrato.objReservacion.FechaEntrega);

        TxtFechaEntrega.datepicker("option", "minDate", objContrato.FechaInicio);

    };

    var calcularTarifaTotal = function () {

        var montoDia = txtMontoDia.val() == '' ? 0 : parseFloat(txtMontoDia.val().replace("$", ""));
        //var montoSurfRacks = txtMontoSurfRacks.val() == '' ? 0 : parseFloat(txtMontoSurfRacks.val().replace("$", ""));
        var montoTotal = 0;

        //if (timeIn == timeOut) {
        //    cantidadDias == 0 ? 0 : cantidadDias - 1;
        //    montoTotal = ((montoDia * (cantidadDias)) + montoSurfRacks);
        //} else {
            montoTotal = (montoDia * (cantidadDias + 1));
        //}
        txtMontoDia.val(utils.formatterDolar.format(montoDia));
        txtMontoTotal.val(utils.formatterDolar.format(montoTotal));
    };

    var fnCallBack = function (data) {

        txtIdVehiculo.val("");
        txtIdVehiculo.val(data.IDVehiculo);
    };


    var llenarObjeto = function () {
        TxtContrato.val(objContrato.NumeroContrato);
        txtNombreClienteContrato.val(objContrato.NombreCliente);
        TxtFechaInicio.val(objContrato.FechaInicio)
        TxtFechaEntrega.val(objContrato.FechaEntrega);
        txtMontoDia.val(utils.formatterDolar.format(objContrato.objReservacion.MontoDia));
        txtMontoTotal.val(utils.formatterDolar.format(objContrato.objReservacion.MontoTotal));
        txtHoraInicio.val(objContrato.objReservacion.HoraInicio);
        txtHoraEntrega.val(objContrato.objReservacion.HoraEntrega);
        txtIdVehiculo.val(objContrato.objReservacion.IDVehiculo)
        
    };

    var abrirModal = function (objetoContrato) {
       
        objContrato = objetoContrato;
        fnCargaFechas();
        llenarObjeto();
        btnCargarVehiculo.click(function () {
            debugger;
            BuscarVehiculo.AbrirModal(fnCallBack, dateIni, dateFin);
        });

        popupExtenderContrato.modal('show');

    };
    return {
        AbrirModal: abrirModal
    }
}();