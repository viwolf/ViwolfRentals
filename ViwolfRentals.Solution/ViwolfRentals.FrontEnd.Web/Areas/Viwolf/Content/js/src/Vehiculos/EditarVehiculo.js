var editarVehiculo = function () {
    var modalVehiculo = $('#popupEditVehiculo');
    var idVehiculo = $('#txtPlacaVehiculoEdicion');
    var marca = $('#txtMarcaVehiculoEdicion');
    var modelo = $('#txtModeloVehiculoEdicion');
    var anno = $('#txtAnnoVehiculoEdicion');
    var Gps = $("#txtGpsEdicion");
    var fechaCompra = $('#txtFechaCompraEdicion');
    var chasis = $('#txtNumeroChasisEdicion');
    var motor = $('#txtNumeroMotorEdicion');
    var Color = $("#txtColorEdicion");
    var Transmision = $("#txtTransmisionEdicion");
    var Cilindraje = $("#txtCilindrajeEdicion");
    var Peso = $("#txtPesoEdicion");
    var Carroceria = $("#txtCarroceriaEdicion");
    var Traccion = $("#txtTraccionEdicion");
    var Capacidad = $("#txtCapacidadEdicion");
    var Categoria = $("#txtCategoriaEdicion");

    var rtvVencimientoAnno = $('#txtRtvVencimientoAnnoEdicion');
    var rtvVencimientoMes = $('#txtRtvVencimientoMesEdicion');
    var marchamoProximo = $('#txtMarchamoProximoEdicion');
    var rtvSticker = $('#txtRtvStickerEdicion');
    var rtvPapel = $('#txtRtvPapelEdicion');
    var marchamoSticker = $('#txtMarchamoStickerEdicion');
    var marchamoPapel = $('#txtMarchamoPapelEdicion');
    var stickerPlaca = $('#txtPlacaStickerEdicion');
    var tituloPropiedad = $('#txtTituloPropiedadEdicion');
    var multas = $('#txtMultasEdicion');
    var txtKilometrajeEdicion = $('#txtKilometrajeEdicion');
    var txtCodigoColorEdicion = $("#txtCodigoColorEdicion");

    var fnInit = function (idvehiculo) {
        modalVehiculo.modal('show');
        fnBuscarVehiculo(idvehiculo)
    };


    var fnBuscarVehiculo = function (id) {
        var oData = {
            "IDVehiculo": id
        }

        try {
            var oUrl = 'Vehiculos/ListarVehiculos';
            var oProcessMessage = 'Enlazando vehiculo';

            var success = function (result) {

                if (result.Data.length > 0) {
                    debugger;
                   var objVehiculo = result.Data[0];
                   debugger;
                   fnCargarVehiculo(objVehiculo); 
                }
            };
            app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
        } catch (ex) {

            retorno = false;
        }
    };

    var fnCargarVehiculo = function (result) {
        debugger;
        idVehiculo.val(result.IDVehiculo == null ? "" : result.IDVehiculo);
        marca.val(result.Marca == null ? "" : result.Marca);
        modelo.val(result.Modelo == null ? "" : result.Modelo);
        anno.val(result.Anno == null ? "" : result.Anno);
        fechaCompra.val(result.FechaCompra == null ? "" : result.FechaCompra);
        chasis.val(result.NumeroChasis == null ? "" : result.NumeroChasis);
        motor.val(result.NumeroMotor == null ? "" : result.NumeroMotor);
        rtvVencimientoAnno.val(result.RtvVencimientoAnno == null ? "" : result.RtvVencimientoAnno);
        rtvVencimientoMes.val(result.RtvVencimientoMes == null ? "" : result.RtvVencimientoMes);
        marchamoProximo.val(result.MarchamoProximo == null ? "" : result.MarchamoProximo);
        rtvSticker.val(result.RtvSticker == "true" ? "Si" : "No");
        rtvPapel.val(result.RtvPapel == "true" ? "Si" : "No");
        marchamoSticker.val(result.MarchamoSticker == "true" ? "Si" : "No");
        marchamoPapel.val(result.MarchamoPapel == "true" ? "Si" : "No");
        stickerPlaca.val(result.StickerPlaca == "true" ? "Si" : "No");
        tituloPropiedad.val(result.TituloPropiedad == "true" ? "Si" : "No");
        multas.val(result.Multas == null ? utils.formatterColon.format(0) : utils.formatterColon.format(result.Multas));
        Categoria.val(result.t_CategoriasVehiculos == null ? "" : result.t_CategoriasVehiculos.NombreCategoriaVehiculo);
        multas.val().replace("$", "¢");

    };

    var fnAbrirModal = function (idVehiculo) {
        debugger;
        fnInit(idVehiculo);
    };

    return {
        AbrirModal: fnAbrirModal
    }
}();