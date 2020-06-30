var extenderContrato = function () {
    var popupExtenderContrato = $('#popupExtenderContrato');
    var TxtContrato = $("#TxtContrato");
    var txtNombreClienteContrato = $("#txtNombreClienteContrato");
    var txtFechaInicio = $("#txtFechaInicio");
    var txtFechaFinal = $("#txtFechaFinal");
    var txtHoraInicio = $("#txtHoraInicio");
    var txtHoraEntrega = $("#txtHoraEntrega");
    var txtMontoDia = $("#txtMontoDia");
    var txtMontoTotal = $("#txtMontoTotal");
    var txtIdVehiculo = $("#txtIdVehiculo");
    var btnCargarVehiculo = $("#btnCargarVehiculo");
    var btnExtenderContrato = $("#btnExtenderContrato");
    var objContrato = null;
    var cantidadDias = 0;
    var timeIn = 0;
    var timeOut = 0;
    var dateIni = new Date();
    var dateFin = new Date();
    var fnCallbackGuardar = null;


    var cargarHoraFinal = function (hora) {

        var horaSeleccionada = hora.getHours().toString();
        var tiempo = horaSeleccionada + ':00';

        txtHoraEntrega.timepicker({
            timeFormat: 'h:mm p',
            interval: 480,
            //minTime: '5',
            //maxTime: '11:00pm',
            startTime: tiempo, // '5:00',
            //defaultTime: '11',
            scrollbar: true,
            change: function (e) {
                timeOut = e.getTime(); // txtHoraInicio.val();
                calcularTarifaTotal();
            }
        });
    }

    function fnCargaFechas() {
        debugger;

        dateIni = new Date(objContrato.objReservacion.FechaInicio);
        dateFin = new Date(objContrato.objReservacion.FechaEntrega);

        txtFechaInicio.datepicker("destroy");
        txtFechaFinal.datepicker("destroy");

        txtFechaInicio.datepicker({
            autoclose: true,
            dateFormat: "dd/mm/yy",
            onSelect: function (selected) {
                var fechaFinal = moment(txtFechaFinal.val(), 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss');
                var fechaSeleccionada = moment(selected, 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss');
                dateIni = new Date(fechaSeleccionada);
                txtFechaFinal.datepicker("option", "minDate", selected);
                cantidadDias = ((moment(fechaFinal).diff(fechaSeleccionada, 'days')));
            }, minDate: '-0D'
            , maxDate: '+500D'
        });

        txtFechaFinal.datepicker({
            autoclose: true,
            dateFormat: "dd/mm/yy",
            onSelect: function (selected) {
                debugger;
                var fechaInicial = moment(txtFechaInicio.val(), 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss');
                var fechaSeleccionada = moment(selected, 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss');
                dateFin = new Date(fechaSeleccionada);
                txtFechaInicio.datepicker("option", "maxDate", selected);
                cantidadDias = ((moment(fechaSeleccionada).diff(fechaInicial, 'days')));
                calcularTarifaTotal();
            },
            maxDate: '+500D'
        });

        txtFechaInicio.datepicker('setDate', new Date());
        txtFechaFinal.datepicker('setDate', new Date());

        txtHoraInicio.timepicker({
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
                calcularTarifaTotal();
                cargarHoraFinal(e);

            }

        });

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

    var Init = function () {

        fnCargaFechas();
        llenarObjeto();
        btnCargarVehiculo.click(function () {
            BuscarVehiculo.AbrirModal(fnCallBack, txtHoraInicio.val(), txtHoraEntrega.val(), "ExtensionContrato");
        });
        txtMontoDia.bind('keypress', valideKey);
        txtMontoDia.blur(function () {
            calcularTarifaTotal();
        });
        btnExtenderContrato.bind().click(fnConfirmarGuardar);
    };

    var fnConfirmarGuardar = function () {
        Dialog.confirm('Contratos', "Desea extender el contrato?", function (respuesta) {
            if (respuesta == true) {
                debugger;
                objContrato.objReservacion.FechaInicio = dateIni;
                objContrato.objReservacion.FechaEntrega = dateFin;
                objContrato.objReservacion.HoraInicio = txtHoraInicio.val();
                objContrato.objReservacion.HoraEntrega = txtHoraEntrega.val();
                objContrato.objReservacion.IDVehiculo = txtIdVehiculo.val();
                objContrato.objReservacion.MontoDia = parseFloat(txtMontoDia.val().replace("$", "")),
                    objContrato.objReservacion.MontoTotal = parseFloat(txtMontoTotal.val().replace("$", "")),
                    objContrato.TotalContrato = parseFloat(txtMontoTotal.val().replace("$", "")),

                    fnCallbackGuardar(objContrato);
            }
        })
    };

    var llenarObjeto = function () {
        TxtContrato.val(objContrato.NumeroContrato);
        txtNombreClienteContrato.val(objContrato.NombreCliente);
    };

    var abrirModal = function (objetoContrato, callback) {
        objContrato = objetoContrato;
        fnCallbackGuardar = callback;
        Init();

        popupExtenderContrato.modal('show');
    };

    return {
        AbrirModal: abrirModal
    }
}();