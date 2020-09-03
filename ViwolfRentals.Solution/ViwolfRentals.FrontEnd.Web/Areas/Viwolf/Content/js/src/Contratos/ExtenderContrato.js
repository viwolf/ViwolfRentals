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
    var txtFechaInicioDisminucion = $("#txtFechaInicioDisminucion");
    var txtFechaFinalDisminucion = $("#txtFechaFinalDisminucion");
    var txtMontoDiaDisminucion = $("#txtMontoDiaDisminucion");
    var txtMontoTotalDisminucion = $("#txtMontoTotalDisminucion");
    var chkPenalidad = $("chkPenalidad");

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
               
                var fechaInicial = moment(txtFechaInicio.val(), 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss');
                var fechaSeleccionada = moment(selected, 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss');
                dateFin = new Date(fechaSeleccionada);
                txtFechaInicio.datepicker("option", "maxDate", selected);
                cantidadDias = ((moment(fechaSeleccionada).diff(fechaInicial, 'days')));
                calcularTarifaTotal();
            },
            maxDate: '+500D'
        });

        //txtFechaInicio.datepicker('setDate', new Date());
        //txtFechaFinal.datepicker('setDate', new Date());

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

        txtFechaFinalDisminucion.datepicker({
            autoclose: true,
            dateFormat: "dd/mm/yy",
            onSelect: function (selected) {

                var fechaInicial = moment(txtFechaInicioDisminucion.val(), 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss');
                var fechaSeleccionada = moment(selected, 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss');
                dateFin = new Date(fechaSeleccionada);
                txtFechaInicio.datepicker("option", "maxDate", selected);
                cantidadDias = ((moment(fechaSeleccionada).diff(fechaInicial, 'days')));
                calcularTarifaTotal();
            },
            maxDate: '+500D'
        });
        
        //txtFechaInicioDisminucion.datepicker('setDate', objContrato.FechaInicio);
        //txtFechaFinalDisminucion.datepicker('setDate', new Date());
    };

    var calcularTarifaTotal = function () {
        
        var montoDia = txtMontoDia.val() == '' ? 0 : parseFloat(txtMontoDia.val().replace("$", ""));
        //var montoSurfRacks = txtMontoSurfRacks.val() == '' ? 0 : parseFloat(txtMontoSurfRacks.val().replace("$", ""));
        var montoTotal = 0;

        if (timeIn >= timeOut) {
            cantidadDias == 0 ? 0 : cantidadDias - 1;
            montoTotal = (montoDia * (cantidadDias));
        } else {
            montoTotal = (montoDia * (cantidadDias + 1));
        }
        txtMontoDia.val(utils.formatterDolar.format(montoDia));
        txtMontoTotal.val(utils.formatterDolar.format(montoTotal));
    };

    var calcularTarifaTotalDisminucion = function () {
        
        var fechaInicial = moment(txtFechaInicioDisminucion.val(), 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss');
        var fechaSeleccionada = moment(txtFechaFinalDisminucion.val(), 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss');
        var cantidadDiasDisminucion = ((moment(fechaSeleccionada).diff(fechaInicial, 'days')));


        var montoDia = txtMontoDiaDisminucion.val() == '' ? 0 : parseFloat(txtMontoDiaDisminucion.val().replace("$", ""));
        var montoTotal = 0;

        montoTotal = (montoDia * (cantidadDiasDisminucion + 1));

        txtMontoDiaDisminucion.val(utils.formatterDolar.format(montoDia));
        txtMontoTotalDisminucion.val(utils.formatterDolar.format(montoTotal));
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

    //No se permite escribir dentro del input text
    var delimitarTextos = function (e) {
        e.preventDefault();
    }

    var Init = function () {
        $("#tabs").tabs();
        fnCargaFechas();
        llenarObjeto();
        btnCargarVehiculo.unbind().click(function () {
            BuscarVehiculo.AbrirModal(fnCallBack, txtHoraInicio.val(), txtHoraEntrega.val(), "ExtensionContrato");
        });
        txtMontoDia.bind('keypress', valideKey);
        txtMontoDia.blur(function () {
            calcularTarifaTotal();
        });
        txtMontoDiaDisminucion.bind('keypress', valideKey);
        txtMontoDiaDisminucion.blur(function () {
            calcularTarifaTotalDisminucion();
        });
        btnExtenderContrato.unbind().click(fnConfirmarGuardar);
        txtHoraInicio.bind('keypress', delimitarTextos);
        txtHoraEntrega.bind('keypress', delimitarTextos);
        txtHoraInicio.change(function (e) {
            if (txtHoraInicio.val() != "")
                timeIn = this.valueAsDate;
        });
        txtHoraEntrega.change(function (e) {
            if (txtHoraEntrega.val() != "") {
                timeOut = this.valueAsDate;
                calcularTarifaTotal()
            }
        });
    };

    var fnConfirmarGuardar = function () {
        Dialog.confirm('Contratos', "Desea extender el contrato?", function (respuesta) {
            if (respuesta == true) {
               
                objContrato.objReservacion.FechaInicio = dateIni;
                objContrato.objReservacion.FechaEntrega = dateFin;
                objContrato.objReservacion.HoraInicio = txtHoraInicio.val();
                objContrato.objReservacion.HoraEntrega = txtHoraEntrega.val();
                objContrato.objReservacion.IDVehiculo = txtIdVehiculo.val();
                objContrato.objReservacion.MontoDia = parseFloat(txtMontoDia.val().replace("$", ""));
                objContrato.objReservacion.MontoTotal = parseFloat(txtMontoTotal.val().replace("$", ""));
                objContrato.TotalContrato = parseFloat(txtMontoTotal.val().replace("$", ""));

                fnCallbackGuardar(objContrato);
                fnLimpiar();
                popupExtenderContrato.modal('hide');



            }
        })
    };

    var llenarObjeto = function () {
        
        TxtContrato.val(objContrato.NumeroContrato);
        txtNombreClienteContrato.val(objContrato.NombreCliente);
        //txtFechaInicioDisminucion.val(objContrato.FechaInicio);

    };

    var abrirModal = function (objetoContrato, callback) {
        objContrato = objetoContrato;
        fnCallbackGuardar = callback;
        Init();

        popupExtenderContrato.modal('show');
    };

    var fnLimpiar = function () {
        TxtContrato.val("");
        txtNombreClienteContrato.val("");
        txtFechaInicio.val("");
        txtFechaFinal.val("");
        txtHoraInicio.val("");
        txtHoraEntrega.val("");
        txtMontoDia.val("");
        txtMontoTotal.val("");
        txtIdVehiculo.val("");
        txtFechaInicioDisminucion.val("");
        txtFechaFinalDisminucion.val("");
        txtMontoDiaDisminucion.val("");
        txtMontoTotalDisminucion.val("");
    };

    return {
        AbrirModal: abrirModal
    }
}();