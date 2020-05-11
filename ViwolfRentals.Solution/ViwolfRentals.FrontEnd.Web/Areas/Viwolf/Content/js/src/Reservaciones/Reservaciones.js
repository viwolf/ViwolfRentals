var reservaciones = function () {
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

    var Init = function () {
       
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

        var retorno = false;
        var oData = {
            "UsuarioCreacion": txtUsuario.val(),
            "NombreCliente": txtNombreCliente.val(),
            "LugarEntrega": txtHospedaje.val(),
            "EntregaHotel": txtEntregaHotel.val(),
            "FechaInicio": txtFechaInicio.val(),
            "HoraInicio ": txtHoraInicio.val(),
            "FechaEntrega": txtFechaFinal.val(),
            "HoraEntrega": txtHoraEntrega.val,
            "SurfRacks": txtSurfRacks.val(),
            "MontoSurfRacks": txtMontoSurfRacks.val(),
            "Cajon": txtCajon.val(),
            "MontoDia": txtMontoDia.val(),
            "MontoTotal": txtMontoTotal.val(),
            "NumeroDeposito": txtNumeroDeposito.val(),
            "MontoDeposito": txtMontoDeposito.val(),
           // "SaldoActual": txtSaldoActual.val(),
            "Efectivo": txtEfectivo.val(),
            "CuentaPorCobrar": txtCuentaCobrar.val(),
            //"ProveedorID",
            //"IDUsuario",
            //"IDVehiculo"
        }

        try {
            var oUrl = 'Reservaciones/GuardarReservacion';
            var oProcessMessage = 'Guardando Reservacion';

            var success = function (result) {
                debugger;
                if (result >= '1') {





                    //var mensaje = 'Transaccion Anulada. \n' +
                    //                            ' Tarjeta: ' + obj.NumeroTarjeta + '\n \n' +
                    //                            ' Cliente: ' + obj.TarjetaHabiente + '\n' + //result.Data[0].Enganche + '\n' +
                    //                            ' Autorización: ' + obj.NumeroAutorizacionAnulacion + '\n' +
                    //                            ' Referencia: ' + obj.Ref + '\n' +
                    //                            ' Monto: ' + countryInfo.getMonto(obj.Monto) + '\n \n'

                    //msjApp.fnShowSuccessMessage(mensaje);
                    retorno = true
                }
                //else {
                //    retorno = false;
                //}
                return retorno;
            };
            app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
        } catch (ex) {
            //utils.fnShowErrorMessage(ex.message);
            retorno = false;
        }
        //return retorno;
    };


    $(function () {

        Init();


    });
}();