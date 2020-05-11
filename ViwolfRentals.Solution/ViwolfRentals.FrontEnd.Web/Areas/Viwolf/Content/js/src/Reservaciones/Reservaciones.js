﻿var reservaciones = function () {
    var txtNombreCliente = $("#txtNombreCliente");
    var txtHospedaje = $("#txtHospedaje");
    var txtEntregaHotel = $("#txtEntregaHotel");
    var txtSurfRacks = $("#txtSurfRacks");
    var txtMontoSurfRacks = $("#txtMontoSurfRacks");
    var txtCajon = $("#txtCajon");
    var txtMontoDia = $("#txtMontoDia");
    var txtMontoTotal = $("#txtMontoTotal");
    var txtNumeroDeposito = $("#txtNumeroDeposito");
    var txtMontoDeposito = $("#txtMontoDeposito");
    var txtSaldoActual = $("#txtSaldoActual");
    var txtUsuario = $("#txtUsuario");
    var txtEfectivo = $("#txtEfectivo");
    var txtCuentaCobrar = $("#txtCuentaCobrar");
    var txtProveedor = $("#txtProveedor");
    var txtPlaca = $("#txtPlaca");
    var txtFechaInicio = $("#txtFechaInicio");
    var txtHoraInicio = $("#txtHoraInicio")
    var txtFechaFinal = $("#txtFechaFinal");
    var txtHoraEntrega = $("#txtHoraEntrega")
    var btnGuardar = $("#btnGuardar");
    var timeIn = null;
    var timeOut = null;

    var Init = function () {

        debugger;
        var startTime = document.getElementById("txtHoraInicio");

        startTime.addEventListener("input", function () {
            debugger;
            timeIn = startTime.value;
        }, false);


        var endTime = document.getElementById("txtHoraEntrega");
        endTime.addEventListener("input", function () {
            debugger;
            timeOut = endTime.value;
        }, false);


        txtSurfRacks.change(cambiarEstadoSurfRacks);
        txtCuentaCobrar.change(cambiarEstadoProveedor);
        
        cargarSelect2(txtProveedor,
            {
                PlaceHolder: "Seleccione Proveedor",
                minimumResultsForSearch: Infinity,
                Url: "Proveedores/ListarProveedores",
                DataType: 'json',
                Type: "POST",
                Id: "IdProveedor",
                Text: "NombreProveedor",
                SuccessFunction: function (data) {
                    estado = data.Data;
                }
            });

        btnGuardar.click(fnGuardarReservacion);
    }

    var cargarSelect2 = function (elemento, configuracion) {
        
        $.ajax({
            type: "POST",
            url: "Proveedores/ListarProveedores",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                
                //var datos = $.parseJSON(msg.Data);
                $(msg.Data).each(function () {
                    
                    var option = $(document.createElement('option'));

                    option.text(this.NombreProveedor);
                    option.val(this.IdProveedor);

                    $("#txtProveedor").append(option);
                });

                //$(datos).each(function () {
                //    var option = $(document.createElement('option'));

                //    option.text(this.IdProveedor);
                //    option.val(this.NombreProveedor);

                //    $("#txtProveedor").append(option);
                //});
            },
            error: function (msg) {
                $("#dvAlerta > span").text("Error al llenar el combo");
            }
        });

        //debugger
        //elemento.select2({
        //    cacheDataSource: [],
        //    placeholder: configuracion.PlaceHolder,
        //    multiple: configuracion.Multiple,
        //    query: function (query) {
        //        
        //        self = this;
        //        var key = query.term;
        //        var cachedData = self.cacheDataSource[key];
        //        if (cachedData) {
        //            query.callback({
        //                results: cachedData
        //            });
        //            return;
        //        } else {
        //            
        //            $.ajax({
        //                url: configuracion.Url,
        //                data: configuracion.Data,
        //                dataType: 'json',
        //                type: 'POST',
        //                success: function (serverData) {
        //                    if (configuracion.SuccessFunction) {
        //                        configuracion.SuccessFunction(serverData);
        //                    }
        //                    var data = {
        //                        results: []
        //                    };
        //                    $.each(serverData.Data, function () {
        //                        data.results.push({
        //                            id: this[configuracion.Id], text: this[configuracion.Text]
        //                        });
        //                    });
        //                    self.cacheDataSource[key] = data.results;
        //                    results = data.results;
        //                    query.callback(data);
        //                }
        //            })
        //        }
        //    },

        //    initSelection: configuracion.InitSelection,
        //    dropdownCssClass: "bigdrop", // apply css that makes the dropdown taller
        //    escapeMarkup: function (m) {
        //        return m;
        //    } // we do not want to escape markup since we are displaying html in results
        //});






    };


  

    function cambiarEstadoSurfRacks() {
        
        if (txtSurfRacks.val() == 'Si')
            document.getElementById("txtMontoSurfRacks").disabled = false;
        else
            document.getElementById("txtMontoSurfRacks").disabled = true;

        document.getElementById("txtMontoSurfRacks").value  = '';
    };

    function cambiarEstadoProveedor() {
        
        if (txtCuentaCobrar.val() == 'Si')
            document.getElementById("txtProveedor").disabled = false;
        else
            document.getElementById("txtProveedor").disabled = true;

        document.getElementById("txtProveedor").value = '';
    };


    var fnGuardarReservacion = function () {
        debugger;

        var proveedor = document.getElementById("txtProveedor");
        var IdProveedor = proveedor.options[proveedor.selectedIndex].value;

        var retorno = false;
        var oData = {
            "UsuarioCreacion": txtUsuario.val(),
            "NombreCliente": txtNombreCliente.val(),
            "LugarEntrega": txtHospedaje.val(),
            "EntregaHotel": txtEntregaHotel.val() == 'Si' ? true : false,
            "FechaInicio": txtFechaInicio.val(),
            "HoraInicio": timeIn,
            "FechaEntrega": txtFechaFinal.val(),
            "HoraEntrega": timeOut,
            "SurfRacks": txtSurfRacks.val() == 'Si' ? true : false,
            "MontoSurfRacks": txtMontoSurfRacks.val(),
            "Cajon": txtCajon.val() == 'Si' ? true : false,
            "MontoDia": txtMontoDia.val(),
            "MontoTotal": txtMontoTotal.val(),
            "NumeroDeposito": txtNumeroDeposito.val(),
            "MontoDeposito": txtMontoDeposito.val(),
            "SaldoActual": txtSaldoActual.val(),
            "Efectivo": txtEfectivo.val() == 'Si' ? true : false,
            "CuentaPorCobrar": txtCuentaCobrar.val() == 'Si' ? true : false,
            "ProveedorID": IdProveedor == "" ? "0" : IdProveedor,
            "IDUsuario": txtUsuario.val(),
            "IDVehiculo": txtPlaca.val()
        }

        try {
            var oUrl = 'Reservaciones/GuardarReservacion';
            var oProcessMessage = 'Guardando Reservacion';

            var success = function (result) {
                if (result.MessageType == "Success") {
                    alert("Reservacion creada con exito");
                    fnLimpiarDatos();
                }
                    
                    
            };
            app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
        } catch (ex) {
            //utils.fnShowErrorMessage(ex.message);
            retorno = false;
        }
        //return retorno;
    };

    var fnLimpiarDatos = function () {
        txtNombreCliente.val("");
        txtHospedaje.val("");
        txtEntregaHotel.val("");
        txtSurfRacks.val("");
        txtMontoSurfRacks.val("");
        txtCajon.val("");
        txtMontoDia.val("");
        txtMontoTotal.val("");
        txtNumeroDeposito.val("");
        txtMontoDeposito.val("");
        txtSaldoActual.val("");
        txtUsuario.val("");
        txtEfectivo.val("");
        txtCuentaCobrar.val("");
        txtProveedor.val("");
        txtPlaca.val("");
        txtFechaInicio.val("");
        txtHoraInicio.val("");
        txtFechaFinal.val("");
        txtHoraEntrega.val("");
        btnGuardar.val("");
        timeIn = null;
        timeOut = null;
    }

    $(function () {

        Init();


    });
}();