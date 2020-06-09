﻿var indexContratos = function () {
    var txtIDReservacion = $('#txtIDReservacion');
    var txtNombreCliente = $('#txtNombreCliente');
    var txtHospedaje = $('#txtHospedaje');
    var txtFechaInicio = $('#txtFechaInicio');
    var txtFechaFinal = $('#txtFechaFinal');
    var btnBuscarReservacion = $('#btnBuscarReservacion');
    var tblDataReservacion = $('#tblDataReservacion');
    var btnCrearContrato = $('#btnCrearContrato');
    var dateIni = null;
    var dateFin = null;
    var objSeleccionado = null;

    function fnCargaFechas() {

        txtFechaInicio.datepicker("destroy");
        txtFechaFinal.datepicker("destroy");

        txtFechaInicio.datepicker({
            autoclose: true,
            dateFormat: "dd/mm/yy",
            onSelect: function (selected) {

                //var fechaFinal = moment(txtFechaFinal.val(), 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss');
                var fechaSeleccionada = moment(selected, 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss');
                dateIni = new Date(fechaSeleccionada);
                txtFechaFinal.datepicker("option", "minDate", selected);
               
            }, //minDate: '-0D',
             maxDate: '+500D'
        });

        txtFechaFinal.datepicker({
            autoclose: true,
            dateFormat: "dd/mm/yy",
            onSelect: function (selected) {

               // var fechaInicial = moment(txtFechaInicio.val(), 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss');
                var fechaSeleccionada = moment(selected, 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss');
                dateFin = new Date(fechaSeleccionada);
                txtFechaInicio.datepicker("option", "maxDate", selected);
              
            },
            maxDate: '+500D'
        });

        //txtFechaInicio.datepicker('setDate', new Date());
        //txtFechaFinal.datepicker('setDate', new Date());
    }

    var fnInit = function () {
        fnCargaFechas();
        btnBuscarReservacion.click(fnBuscarReservaciones);
        btnCrearContrato.click(function () {
            if (objSeleccionado != null)
                crearContrato.AbrirModal(objSeleccionado);
            else
                Dialog.alert('Contratos', "Debe seleccionar una reservacion.", function () {
                })
        });
    };

    var fnBuscarReservaciones = function () {
        debugger;
        var oData = {
            "IDReservacion": txtIDReservacion.val(),
            "NombreCliente": txtNombreCliente.val(),
            "LugarEntrega": txtHospedaje.val(),
            "FechaInicio": dateIni,
            "FechaEntrega": dateFin
        };
        try {
            var oUrl = 'Reservaciones/ListarReservacion';
            var oProcessMessage = 'Buscando Reservaciones';
            var success = function (result) {
                debugger;
                if (result.Data.length > 0) {


                    tblDataReservacion.dataTable({
                        destroy: true,
                        processing: true,
                        responsive: true,
                        data: result.Data,
                        select: true,
                        columns: [
                            { data: 'IdReservacion' },
                            { data: 'NombreCliente' },
                            { data: 'LugarEntrega' },
                            { data: 'FechaInicio' },
                            { data: 'FechaEntrega' },
                            { data: 'IDVehiculo' }
                            //,
                            // { data: 't_Vehiculos.t_CategoriasVehiculos.NombreCategoriaVehiculo' },
                        ],
                    });
                    tblDataReservacion.on("click", "tr", function () {
                        var iPos = tblDataReservacion.fnGetPosition(this);
                        objSeleccionado = tblDataReservacion.fnGetData(iPos);
                    });
                }
                else {
                    Dialog.alert('Contratos', result.InfoMessage == "" ? result.ErrorMessage : result.InfoMessage, function () {
                    })
                    tblDataReservacion.dataTable().fnClearTable();
                };
            };
            app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
        } catch (ex) {

            retorno = false;
        }
    }

    $(function () {
        fnInit();
    });
}();