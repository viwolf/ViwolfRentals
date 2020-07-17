var crearContrato = function () {
    var popupCrearContrato = $('#popupCrearContrato');
    var txtIdReservacionContrato = $('#txtIdReservacionContrato');
    var txtNombreClienteContrato = $('#txtNombreClienteContrato');
    //var txtVoucherPago = $('#txtVoucherPago');
    //var txtVoucherDeposito = $('#txtVoucherDeposito');
    //var txtLicencia = $('#txtLicencia');
    //var txtContrato = $('#txtContrato');
    //var txtPrimeraVehiculo = $('#txtPrimeraVehiculo');
    //var txtSegundaVehiculo = $('#txtSegundaVehiculo');
    //var txtTerceraVehiculo = $('#txtTerceraVehiculo');
    //var txtCuartaVehiculo = $('#txtCuartaVehiculo');
    //var txtQuintaVehiculo = $('#txtQuintaVehiculo');
    //var txtSextaVehiculo = $('#txtSextaVehiculo');
    var btnGuardarContrato = $('#btnGuardarContrato');
    var imgPago = null;
    var imgDeposito = null;
    var imgLicencia = null;
    var imgContrato = null;
    var imgVehiculoFrontal = null;
    var imgVehiculoTrasera = null;
    var imgVehiculoIzquierda = null;
    var imgVehiculoDerecha = null;
    var imgVehiculo5 = null;
    var imgVehiculo6 = null;
    var fnCallBack = null;
   

    var objReservacion = null;

    var fnReader = function (e, control) {
        
        switch (control) {
            case 'imgVoucherPago':
                imgPago = e.target.result;
                var preview = document.getElementById(control);
                preview.src = imgPago;
                break;
            case 'imgVoucherDeposito':
                imgDeposito = e.target.result;
                var preview = document.getElementById(control);
                preview.src = imgDeposito;
                break;
            case 'imgLicencia':
                imgLicencia = e.target.result;
                var preview = document.getElementById(control);
                preview.src = imgLicencia;
                break;
            case 'imgContrato':
                imgContrato = e.target.result;
                var preview = document.getElementById(control);
                preview.src = imgContrato;
                break;
            case 'imgFrontalVehiculo':
                imgVehiculoFrontal = e.target.result;
                var preview = document.getElementById(control);
                preview.src = imgVehiculoFrontal;
                break;
            case 'imgTraseraVehiculo':
                imgVehiculoTrasera = e.target.result;
                var preview = document.getElementById(control);
                preview.src = imgVehiculoTrasera;
                break;
            case 'imgIzquierdaVehiculo':
                imgVehiculoIzquierda = e.target.result;
                var preview = document.getElementById(control);
                preview.src = imgVehiculoIzquierda;
                break;
            case 'imgDerechaVehiculo':
                imgVehiculoDerecha = e.target.result;
                var preview = document.getElementById(control);
                preview.src = imgVehiculoDerecha;
                break;
            case 'imgQuintaVehiculo':
                imgVehiculo5 = e.target.result;
                var preview = document.getElementById(control);
                preview.src = imgVehiculo5;
                break;
            case 'imgSextaVehiculo':
                imgVehiculo6 = e.target.result;
                var preview = document.getElementById(control);
                preview.src = imgVehiculo6;
                break;
            default:
                break;
        }
        //var img = e.target.result;
        //var preview = document.getElementById(control);
        //preview.src = img;
    }

    function readURL(input, control) {
        
        if (input.files && input.files[0]) {

            var reader = new FileReader();
            reader.onload = function (e) {
                
                fnReader(e, control);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

 


    var abrirModal = function (reservacion, callback) {
       
        fnCallBack = callback;
        objReservacion = reservacion;
        fnLlenarReservacion();
        btnGuardarContrato.unbind('click');
        btnGuardarContrato.click(fnConfirmarGuardar);
        $("#txtVoucherPago").change(function () {
            
            readURL(this, 'imgVoucherPago');
        });
        $("#txtVoucherDeposito").change(function () {
            readURL(this, 'imgVoucherDeposito');
        });
        $("#txtLicencia").change(function () {
            readURL(this, 'imgLicencia');
        });
        $("#txtContrato").change(function () {
            readURL(this, 'imgContrato');
        });
        $("#txtFrontalVehiculo").change(function () {
            readURL(this, 'imgFrontalVehiculo');
        });
        $("#txtTraseraVehiculo").change(function () {
            readURL(this, 'imgTraseraVehiculo');
        });
        $("#txtIzquierdaVehiculo").change(function () {
            readURL(this, 'imgIzquierdaVehiculo');
        });
        $("#txtDerechaVehiculo").change(function () {
            readURL(this, 'imgDerechaVehiculo');
        });
        $("#txtQuintaVehiculo").change(function () {
            readURL(this, 'imgQuintaVehiculo');
        });
        $("#txtSextaVehiculo").change(function () {
            readURL(this, 'imgSextaVehiculo');
        });
        popupCrearContrato.modal('show');
    };

    var fnLlenarReservacion = function () {
        txtIdReservacionContrato.val(objReservacion.IdReservacion);
        txtNombreClienteContrato.val(objReservacion.NombreCliente);
    };

    var fnConfirmarGuardar = function (e) {
        Dialog.confirm('Contratos', "Desea guardar el Contrato?", function (respuesta) {
           
            if (respuesta == true)
                fnGuardarContrato(e);
        })
    };

   

   

    var fnBlock = function (img) {
        var block = img.split(";");
        //var contentType = block[0].split(":")[1];// In this case "image/gif"
        var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."
        //var blob = b64toBlob(realData, contentType);
        return realData;
    }

    var fnGuardarContrato = function (e) {

        
       
        var realDataPago = imgPago == null ? null : fnBlock(imgPago);
        var realDataDeposito = imgDeposito == null ? null : fnBlock(imgDeposito);
        var realDataLicencia = imgLicencia == null ? null : fnBlock(imgLicencia);
        var realDataContrato = imgContrato == null ? null : fnBlock(imgContrato);
        var realDataVehiculoF = imgVehiculoFrontal == null ? null : fnBlock(imgVehiculoFrontal);
        var realDataVehiculoT = imgVehiculoTrasera == null ? null : fnBlock(imgVehiculoTrasera);
        var realDataVehiculoI = imgVehiculoIzquierda == null ? null : fnBlock(imgVehiculoIzquierda);
        var realDataVehiculoD = imgVehiculoDerecha == null ? null : fnBlock(imgVehiculoDerecha);
        var realDataVehiculo5 = imgVehiculo5 == null ? null : fnBlock(imgVehiculo5);
        var realDataVehiculo6 = imgVehiculo6 == null ? null : fnBlock(imgVehiculo6);

            var oData = {
                "UsuarioCreacion": usuarioLogueado,
                "VoucherDeposito": realDataDeposito,
                "VoucherPago":  realDataPago,
                "Licencia": realDataLicencia,
                "Contrato": realDataContrato,
                "FrontalVehiculos": realDataVehiculoF,
                "TraseraVehiculos": realDataVehiculoT,
                "IzquierdaVehiculos": realDataVehiculoI,
                "DerechaVehiculos": realDataVehiculoD,
                "QuintaVehiculos": realDataVehiculo5,
                "SextaVehiculos": realDataVehiculo6,
                "IDEstadoContrato": configViwolf.EstadosContratos.Pendiente,
                "IDReservacion": txtIdReservacionContrato.val(),
                "IDCodigoContrato": configViwolf.CodigosContratos.Fisico,
                "IDUsuario": idUsuarioLogueado,
                "TotalContrato": objReservacion.MontoTotal,
                //"ExtendedProperties": [
                //    { "Key": "Path", "Value": imgPago }
                //]
                "Extendido": false,
                "Referencia": null
        }
        popupCrearContrato.modal('hide');
        fnCallBack(oData);
           
    };

    return {
        AbrirModal: abrirModal
    }

}();