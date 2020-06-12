var crearContrato = function () {
    var popupCrearContrato = $('#popupCrearContrato');
    var txtIdReservacionContrato = $('#txtIdReservacionContrato');
    var txtNombreClienteContrato = $('#txtNombreClienteContrato');
    var txtVoucherPago = $('#txtVoucherPago');
    var txtVoucherDeposito = $('#txtVoucherDeposito');
    var txtLicencia = $('#txtLicencia');
    var txtContrato = $('#txtContrato');
    var txtPrimeraVehiculo = $('#txtPrimeraVehiculo');
    var txtSegundaVehiculo = $('#txtSegundaVehiculo');
    var txtTerceraVehiculo = $('#txtTerceraVehiculo');
    var txtCuartaVehiculo = $('#txtCuartaVehiculo');
    var txtQuintaVehiculo = $('#txtQuintaVehiculo');
    var txtSextaVehiculo = $('#txtSextaVehiculo');
    var btnGuardarContrato = $('#btnGuardarContrato');
    var imgPago = null;
    var imgDeposito = null;
    var imgLicencia = null;
    var imgContrato = null;
    var imgVehiculo1 = null;
    var imgVehiculo2 = null;
    var imgVehiculo3 = null;
    var imgVehiculo4 = null;
    var imgVehiculo5 = null;
    var imgVehiculo6 = null;
   

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
            case 'imgPrimeraVehiculo':
                imgVehiculo1 = e.target.result;
                var preview = document.getElementById(control);
                preview.src = imgVehiculo1;
                break;
            case 'imgSegundaVehiculo':
                imgVehiculo2 = e.target.result;
                var preview = document.getElementById(control);
                preview.src = imgVehiculo2;
                break;
            case 'imgTerceraVehiculo':
                imgVehiculo3 = e.target.result;
                var preview = document.getElementById(control);
                preview.src = imgVehiculo3;
                break;
            case 'imgCuartaVehiculo':
                imgVehiculo4 = e.target.result;
                var preview = document.getElementById(control);
                preview.src = imgVehiculo4;
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

    var abrirModal = function (reservacion) {
        objReservacion = reservacion;
        fnLlenarReservacion();
        btnGuardarContrato.bind().click(fnConfirmarGuardar);
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
        $("#txtPrimeraVehiculo").change(function () {
            readURL(this, 'imgPrimeraVehiculo');
        });
        $("#txtSegundaVehiculo").change(function () {
            readURL(this, 'imgSegundaVehiculo');
        });
        $("#txtTerceraVehiculo").change(function () {
            readURL(this, 'imgTerceraVehiculo');
        });
        $("#txtCuartaVehiculo").change(function () {
            readURL(this, 'imgCuartaVehiculo');
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

    function base64toBlob(base64Data, contentType) {
        contentType = contentType || '';
        var sliceSize = 1024;
        var byteCharacters = atob(base64Data);
        var bytesLength = byteCharacters.length;
        var slicesCount = Math.ceil(bytesLength / sliceSize);
        var byteArrays = new Array(slicesCount);

        for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
            var begin = sliceIndex * sliceSize;
            var end = Math.min(begin + sliceSize, bytesLength);

            var bytes = new Array(end - begin);
            for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
            }
            byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        return new Blob(byteArrays, { type: contentType });
    }

    //function b64toBlob(b64Data, contentType, sliceSize) {
    //    contentType = contentType || '';
    //    sliceSize = sliceSize || 512;

    //    var byteCharacters = atob(b64Data);
    //    var byteArrays = [];

    //    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    //        var slice = byteCharacters.slice(offset, offset + sliceSize);

    //        var byteNumbers = new Array(slice.length);
    //        for (var i = 0; i < slice.length; i++) {
    //            byteNumbers[i] = slice.charCodeAt(i);
    //        }

    //        var byteArray = new Uint8Array(byteNumbers);

    //        byteArrays.push(byteArray);
    //    }

    //    var blob = new Blob(byteArrays, { type: contentType });
    //    return blob;
    //}

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
        var realDataVehiculo1 = imgVehiculo1 == null ? null : fnBlock(imgVehiculo1);
        var realDataVehiculo2 = imgVehiculo2 == null ? null : fnBlock(imgVehiculo2);
        var realDataVehiculo3 = imgVehiculo3 == null ? null : fnBlock(imgVehiculo3);
        var realDataVehiculo4 = imgVehiculo4 == null ? null : fnBlock(imgVehiculo4);
        var realDataVehiculo5 = imgVehiculo5 == null ? null : fnBlock(imgVehiculo5);
        var realDataVehiculo6 = imgVehiculo6 == null ? null : fnBlock(imgVehiculo6);

            var oData = {
                "UsuarioCreacion": usuarioLogueado,
                "VoucherDeposito": realDataDeposito,
                "VoucherPago": realDataPago,
                "Licencia": realDataLicencia,
                "PrimeraVehiculos": realDataVehiculo1,
                "SegundaVehiculos": realDataVehiculo2,
                "TerceraVehiculos": realDataVehiculo3,
                "CuartaVehiculos": realDataVehiculo4,
                "QuintaVehiculos": realDataVehiculo5,
                "SextaVehiculos": realDataVehiculo6,
                "IDEstadoContrato": configViwolf.EstadosContratos.Pendiente,
                "IDReservacion": txtIdReservacionContrato.val(),
                "IDCodigoContrato": configViwolf.CodigosContratos.Fisico
            }
            try {
                var oUrl = 'Contratos/GuardarContrato';
                var oProcessMessage = 'Guardando Contrato';

                var success = function (result) {
                    if (result.MessageType == "Success") {
                        Dialog.alert('Contrato', result.InfoMessage, function () {
                        })
                        debugger;
                        generarContrato.fnReporteTicket(e, result.Data.IDContrato, 1);
                        popupCrearContrato.modal('hide');
                    }
                    else {
                        Dialog.alert('Contrato', result.ErrorMessage, function () {
                        })
                    }
                };
                app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
            } catch (ex) {

                retorno = false;
            }
    };


    return {
        AbrirModal: abrirModal
    }

}();