var reservaciones = function () {
    var txtNombreCliente = $("#txtNombreCliente");
    var txtHospedaje = $("#txtHospedaje");
    var chkEntregaHotel = $("#chkEntregaHotel");
    var chkSurfRacks = $("#chkSurfRacks");
    var txtMontoSurfRacks = $("#txtMontoSurfRacks");
    var chkCajon = $("#chkCajon");
    var txtMontoDia = $("#txtMontoDia");
    var txtMontoTotal = $("#txtMontoTotal");
    var txtDeposito = $("#txtDeposito");
    var txtSaldoActual = $("#txtSaldoActual");
    var txtUsuario = $("#txtUsuario");
    var chkEfectivo = $("#chkEfectivo");
    var chkCxC = $("#chkCxC");
    var txtPlaca = $("#txtPlaca");
    var btnGuardar = $("#btnGuardar");

    var Init = function () {
        btnGuardar.click(fnGuardarReservacion);
    }

    var fnGuardarReservacion = function () {

        var oData = {
            "UsuarioCreacion": txtUsuario.val(),
            "NombreCliente": txtNombreCliente.val(),
            "LugarEntrega": txtHospedaje,
            "EntregaHotel": chkEntregaHotel.val(),
            //"FechaInicio":,
            //"HoraInicio ",
            //"FechaEntrega",
            //"HoraEntrega ",
            "SurfRacks": chkSurfRacks.val(),
            "MontoSurfRacks": txtMontoSurfRacks.val(),
            "Cajon": chkCajon.val(),
            "MontoDia": txtMontoDia.val(),
            "MontoTotal": txtMontoTotal.val(),
            //"NumeroDeposito": ,
            //"MontoDeposito",
            "Efectivo": chkEfectivo.val(),
            "CuentaPorCobrar": chkCxC.val(),
            //"ProveedorID",
            //"IDUsuario",
            //"IDVehiculo"
        }
    }

    $(function () {

        Init();


    });
}();