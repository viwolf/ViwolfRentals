var reservaciones = function () {
    var txtNombreCliente = $("#txtNombreCliente");
    var txtHospedaje = $("#txtHospedaje");
    var txtEntregaHotel = $("#txtEntregaHotel");
    var txtSurfRacks = $("#txtSurfRacks");
    var txtMontoSurfRacks = $("#txtMontoSurfRacks");
    var txtCajon = $("#txtCajon");
    var txtMontoDia = $("#txtMontoDia");
    var txtMontoTotal = $("#txtMontoTotal");
    var txtDeposito = $("#txtDeposito");
    var txtSaldoActual = $("#txtSaldoActual");
    var txtUsuario = $("#txtUsuario");
    var txtEfectivo = $("#txtEfectivo");
    var txtCuentaCobrar = $("#txtCuentaCobrar");
    var txtProveedor = $("#txtProveedor");
    var txtPlaca = $("#txtPlaca");
    var txtFechaInicio = $("#txtFechaInicio");
    var txtFechaFinal = ("#txtFechaFinal");



    var btnGuardar = $("#btnGuardar");

    var Init = function () {
        txtSurfRacks.change(cambiarEstadoSurfRacks);
        txtCuentaCobrar.change(cambiarEstadoProveedor);
       
        //cargarSelect2(txtEntregaHotel,
        //    {
        //        PlaceHolder: "Seleccione Estado",
        //        minimumResultsForSearch: Infinity,
        //        Url: "Vouchers/ListarEstadoVoucher",
        //        DataType: 'json',
        //        Type: "POST",
        //        Id: "IdEstadoVoucher",
        //        Text: "Nombre",
        //        SuccessFunction: function (data) {
        //            estado = data.Data;
        //        }
        //    });

        btnGuardar.click(fnGuardarReservacion);
    }

    function cambiarEstadoSurfRacks() {
        debugger;
        if (txtSurfRacks.val() == 'Si')
            document.getElementById("txtMontoSurfRacks").disabled = false;
        else
            document.getElementById("txtMontoSurfRacks").disabled = true;

        document.getElementById("txtMontoSurfRacks").value  = '';
    };

    function cambiarEstadoProveedor() {
        debugger;
        if (txtCuentaCobrar.val() == 'Si')
            document.getElementById("txtProveedor").disabled = false;
        else
            document.getElementById("txtProveedor").disabled = true;

        document.getElementById("txtProveedor").value = '';
    };

    

    var fnGuardarReservacion = function () {

        var oData = {
            "UsuarioCreacion": txtUsuario.val(),
            "NombreCliente": txtNombreCliente.val(),
            "LugarEntrega": txtHospedaje,
            "EntregaHotel": txtEntregaHotel.val(),
            //"FechaInicio":,
            //"HoraInicio ",
            //"FechaEntrega",
            //"HoraEntrega ",
            "SurfRacks": txtSurfRacks.val(),
            "MontoSurfRacks": txtMontoSurfRacks.val(),
            "Cajon": txtCajon.val(),
            "MontoDia": txtMontoDia.val(),
            "MontoTotal": txtMontoTotal.val(),
            //"NumeroDeposito": ,
            //"MontoDeposito",
            "Efectivo": txtEfectivo.val(),
            "CuentaPorCobrar": txtCxC.val(),
            //"ProveedorID",
            //"IDUsuario",
            //"IDVehiculo"
        }
    }

    $(function () {

        Init();


    });
}();