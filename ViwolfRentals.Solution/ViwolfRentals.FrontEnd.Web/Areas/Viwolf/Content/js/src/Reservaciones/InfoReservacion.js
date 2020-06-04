var informacionReservacion = function () {
    var modalReservacion = $('#popupInfoReservacion');
    var txtIdReservacion = $("#txtIdReservacion");
    var txtNombreCliente = $("#txtNombreCliente");
    var txtHospedaje = $("#txtHospedaje");
    var txtAplicaComision = $("#txtAplicaComision");
    var txtSurfRacks = $("#txtSurfRacks");
    var txtMontoSurfRacks = $("#txtMontoSurfRacks");
    var txtCajon = $("#txtCajon");
    var txtMontoDia = $("#txtMontoDia");
    var txtMontoTotal = $("#txtMontoTotal");
    var txtAplicaPagoAdelantado = $("#txtAplicaPagoAdelantado");
    var txtNumeroDeposito = $("#txtNumeroDeposito");
    var txtMontoDeposito = $("#txtMontoDeposito");
    var txtSaldoActual = $("#txtSaldoActual");
    var txtUsuario = $("#txtUsuario");
    var txtModoPago = $("#txtModoPago");
    var txtComisionistas = $("#txtComisionistas");
    var txtProveedor = $("#txtProveedor");
    var txtPlaca = $("#txtPlaca");
    var txtFechaInicio = $("#txtFechaInicio");
    var txtHoraInicio = $("#txtHoraInicio")
    var txtFechaFinal = $("#txtFechaFinal");
    var txtHoraEntrega = $("#txtHoraEntrega")
    

    var idReservacion = 0;

    var fnBuscarReservacion = function () {
        var oData = {
            "IdReservacion": idReservacion
        };
        try {
            var oUrl = 'ListarReservacion';

            var oProcessMessage = 'Buscando Reservacion';
            var success = function (result) {
                if (result.Data.length > 0) {
                    debugger;
                    txtIdReservacion.val(result.Data[0].IdReservacion);
                    txtNombreCliente.val(result.Data[0].NombreCliente);
                    txtHospedaje.val(result.Data[0].LugarEntrega);
                    txtAplicaComision.val(result.Data[0].AplicaComision == 'false' ? 'No' : 'Si');
                    txtFechaInicio.val(result.Data[0].FechaInicio);
                    txtHoraInicio.val(result.Data[0].HoraInicio);
                    txtFechaFinal.val(result.Data[0].FechaEntrega);
                    txtHoraEntrega.val(result.Data[0].HoraEntrega);
                    txtMontoDia.val(utils.formatterDolar.format(result.Data[0].MontoDia));
                    txtSurfRacks.val(result.Data[0].SurfRacks == 'false' ? 'No' : 'Si');
                    txtMontoSurfRacks.val(utils.formatterDolar.format(result.Data[0].MontoSurfRacks));
                    txtMontoTotal.val(utils.formatterDolar.format(result.Data[0].MontoTotal));
                    txtCajon.val(result.Data[0].Cajon == 'false' ? 'No' : 'Si');
                    txtNumeroDeposito.val(result.Data[0].NumeroDeposito);
                    txtMontoDeposito.val(utils.formatterDolar.format(result.Data[0].MontoDeposito));
                    //txtSaldoActual.val(result.Data[0].IdReservacion);
                    //txtModoPago.val(result.Data[0].IdReservacion);
                    txtComisionistas.val(result.Data[0].t_ClientesComisionistas == null ? "" : result.Data[0].t_ClientesComisionistas.NombreClienteComisionista);
                    txtProveedor.val(result.Data[0].t_Proveedores == null ? "" : result.Data[0].t_Proveedores.NombreProveedor);
                    txtPlaca.val(result.Data[0].IDVehiculo);

                }
                else {
                    Dialog.alert('Calendario', result.InfoMessage == "" ? result.ErrorMessage : result.InfoMessage, function () {
                        modalReservacion.modal('hide');
                    })
                };
            };
            app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
        } catch (ex) {

            retorno = false;
        }


    }

    var fnAbrirModal = function (idreservacion) {
        debugger;
        idReservacion = idreservacion;
        modalReservacion.modal('show');
        fnBuscarReservacion();
    };

    return {
        AbrirModal: fnAbrirModal
    }
}();