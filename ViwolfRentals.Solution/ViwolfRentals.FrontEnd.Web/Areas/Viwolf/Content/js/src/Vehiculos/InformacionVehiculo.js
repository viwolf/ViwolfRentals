
var informacionVehiculo = function () {
    var modalVehiculo = $('#popupInformacionVehiculo');
    var idVehiculo = $('#idVehiculoInformacion');
    var marca = $('#marcaInformacion');
    var modelo = $('#modeloInformacion');
    var anno = $('#annoInformacion');
    var fechaCompra = $('#fechaCompraInformacion');
    var chasis = $('#chasisInformacion');
    var motor = $('#motorInformacion');
    var rtvVencimientoAnno = $('#rtvVencimientoAnnoInformacion');
    var rtvVencimientoMes = $('#rtvVencimientoMesInformacion');
    var marchamoProximo = $('#marchamoProximoInformacion');
    var rtvSticker = $('#rtvStickerInformacion');
    var rtvPapel = $('#rtvPapelInformacion');
    var marchamoSticker = $('#marchamoStickerInformacion');
    var marchamoPapel = $('#marchamoPapelInformacion');
    var stickerPlaca = $('#stickerPlacaInformacion');
    var tituloPropiedad = $('#tituloPropiedadInformacion');
    var multas = $('#multasInformacion');
    var categoriaVehiculo = $('#categoriaVehiculoInformacion');
   
    var fnInit = function (objVehiculo) {
        modalVehiculo.modal('show');
        fnCargarVehiculo(objVehiculo);
    };

    var fnCargarVehiculo = function (result) {
        
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
        categoriaVehiculo.val(result.t_CategoriasVehiculos == null ? "" : result.t_CategoriasVehiculos.NombreCategoriaVehiculo);
        multas.val().replace("$", "¢");
        
    };

    var fnAbrirModal = function (objVehiculo) {
        
        fnInit(objVehiculo);
    };

    return {
        AbrirModal: fnAbrirModal
    }
}();