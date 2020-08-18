var crearContrato = function () {
    var popupCrearContrato = $('#popupCrearContrato');
    var txtIdReservacionContrato = $('#txtIdReservacionContrato');
    var txtNombreClienteContrato = $('#txtNombreClienteContrato');
    var imgVoucherPago = $('#imgVoucherPago');
    var imgVoucherDeposito = $('#imgVoucherDeposito');
    var imgLicencia = $('#imgLicencia');
    var imgContrato = $('#imgContrato');
    var imgFrontalVehiculo = $('#imgFrontalVehiculo');
    var imgTraseraVehiculo = $('#imgTraseraVehiculo');
    var imgIzquierdaVehiculo = $('#imgIzquierdaVehiculo');
    var imgDerechaVehiculo = $('#imgDerechaVehiculo');
    var imgQuintaVehiculo = $('#imgQuintaVehiculo');
    var imgSextaVehiculo = $('#imgSextaVehiculo');
    var btnGuardarContrato = $('#btnGuardarContrato');

    var txtVoucherPago = $("#txtVoucherPago");
    var txtVoucherDeposito = $("#txtVoucherDeposito");
    var txtLicencia = $("#txtLicencia");
    var txtContrato = $("#txtContrato");
    var txtFrontalVehiculo = $("#txtFrontalVehiculo");
    var txtTraseraVehiculo = $("#txtTraseraVehiculo");
    var txtIzquierdaVehiculo = $("#txtIzquierdaVehiculo");
    var txtDerechaVehiculo = $("#txtDerechaVehiculo");
    var txtQuintaVehiculo = $("#txtQuintaVehiculo");
    var txtSextaVehiculo = $("#txtSextaVehiculo");




    var imgPago = null;
    var imgDeposito = null;
    var imgLic = null;
    var imgCont = null;
    var imgFrontal = null;
    var imgTrasera = null;
    var imgIzquierda = null;
    var imgDerecha = null;
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
                imgLic = e.target.result;
                var preview = document.getElementById(control);
                preview.src = imgLic;
                break;
            case 'imgContrato':
                imgCont = e.target.result;
                var preview = document.getElementById(control);
                preview.src = imgCont;
                break;
            case 'imgFrontalVehiculo':
                imgFrontal = e.target.result;
                var preview = document.getElementById(control);
                preview.src = imgFrontal;
                break;
            case 'imgTraseraVehiculo':
                imgTrasera = e.target.result;
                var preview = document.getElementById(control);
                preview.src = imgTrasera;
                break;
            case 'imgIzquierdaVehiculo':
                imgIzquierda = e.target.result;
                var preview = document.getElementById(control);
                preview.src = imgIzquierda;
                break;
            case 'imgDerechaVehiculo':
                imgDerecha = e.target.result;
                var preview = document.getElementById(control);
                preview.src = imgDerecha;
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
        imgVoucherPago.unbind().click(function () {
            var visor = document.getElementById('imgVoucherPago');
            if (txtVoucherPago.val() != "")
                visorImagenes.AbrirModal(visor.src);
        });
        $("#txtVoucherDeposito").change(function () {
            readURL(this, 'imgVoucherDeposito');
        });
        imgVoucherDeposito.unbind().click(function () {
            var visor = document.getElementById('imgVoucherDeposito');
            if (txtVoucherDeposito.val() != "")
                visorImagenes.AbrirModal(visor.src);
        });
        $("#txtLicencia").change(function () {
            readURL(this, 'imgLicencia');
        });
        imgLicencia.unbind().click(function () {
            var visor = document.getElementById('imgLicencia');
            if (txtLicencia.val() != "")
                visorImagenes.AbrirModal(visor.src);
        });
        $("#txtContrato").change(function () {
            readURL(this, 'imgContrato');
        });
        imgContrato.unbind().click(function () {
            var visor = document.getElementById('imgContrato');
            if (txtContrato.val() != "")
                visorImagenes.AbrirModal(visor.src);
        });
        $("#txtFrontalVehiculo").change(function () {
            readURL(this, 'imgFrontalVehiculo');
        });
        imgFrontalVehiculo.unbind().click(function () {
            var visor = document.getElementById('imgFrontalVehiculo');
            if (txtFrontalVehiculo.val() != "")
                visorImagenes.AbrirModal(visor.src);
        });
        $("#txtTraseraVehiculo").change(function () {
            readURL(this, 'imgTraseraVehiculo');
        });
        imgTraseraVehiculo.unbind().click(function () {
            var visor = document.getElementById('imgTraseraVehiculo');
            if (txtTraseraVehiculo.val() != "")
                visorImagenes.AbrirModal(visor.src);
        });
        $("#txtIzquierdaVehiculo").change(function () {
            readURL(this, 'imgIzquierdaVehiculo');
        });
        imgIzquierdaVehiculo.unbind().click(function () {
            var visor = document.getElementById('imgIzquierdaVehiculo');
            if (txtIzquierdaVehiculo.val() != "")
                visorImagenes.AbrirModal(visor.src);
        });
        $("#txtDerechaVehiculo").change(function () {
            readURL(this, 'imgDerechaVehiculo');
        });
        imgDerechaVehiculo.unbind().click(function () {
            var visor = document.getElementById('imgDerechaVehiculo');
            if (txtDerechaVehiculo.val() != "")
                visorImagenes.AbrirModal(visor.src);
        });
        $("#txtQuintaVehiculo").change(function () {
            readURL(this, 'imgQuintaVehiculo');
        });
        imgQuintaVehiculo.unbind().click(function () {
            var visor = document.getElementById('imgQuintaVehiculo');
            if (txtQuintaVehiculo.val() != "")
                visorImagenes.AbrirModal(visor.src);
        });
        $("#txtSextaVehiculo").change(function () {
            readURL(this, 'imgSextaVehiculo');
        });
        imgSextaVehiculo.unbind().click(function () {
            var visor = document.getElementById('imgSextaVehiculo');
            if (txtSextaVehiculo.val() != "")
                visorImagenes.AbrirModal(visor.src);
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
        var realDataLicencia = imgLic == null ? null : fnBlock(imgLic);
        var realDataContrato = imgCont == null ? null : fnBlock(imgCont);
        var realDataVehiculoF = imgFrontal == null ? null : fnBlock(imgFrontal);
        var realDataVehiculoT = imgTrasera == null ? null : fnBlock(imgTrasera);
        var realDataVehiculoI = imgIzquierda == null ? null : fnBlock(imgIzquierda);
        var realDataVehiculoD = imgDerecha == null ? null : fnBlock(imgDerecha);
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