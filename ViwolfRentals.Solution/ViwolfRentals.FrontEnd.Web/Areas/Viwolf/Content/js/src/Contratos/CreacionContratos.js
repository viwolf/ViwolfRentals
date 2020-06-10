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
    var img = null;
   

    var objReservacion = null;

    function readURL(input, control) {
       if (input.files && input.files[0]) {
           var reader = new FileReader();

           reader.onload = function (e) {
               debugger;
               img = e.target.result;
               var preview = document.getElementById(control);
               preview.src = img;
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

    var fnConfirmarGuardar = function () {
        Dialog.confirm('Contratos', "Desea guardar el Contrato?", function (respuesta) {
           
            if (respuesta == true)
                fnGuardarContrato();
        })
    };

    function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    var fnGuardarContrato = function () {
        debugger;
        //var block = img.split(";");
        //// Get the content type of the image
        //var contentType = block[0].split(":")[1];// In this case "image/gif"
        //// get the real base64 content of the file
        //var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."

        //// Convert it to a blob to upload
        //var blob = b64toBlob(realData, contentType);
       

            var oData = {
                "UsuarioCreacion": usuarioLogueado,
                "VoucherDeposito": realData,
                "VoucherPago": txtVoucherPago.val(),
                "Licencia": txtLicencia.val(),
                "PrimeraVehiculos": txtPrimeraVehiculo.val(),
                "SegundaVehiculos": txtSegundaVehiculo.val(),
                "TerceraVehiculos": txtTerceraVehiculo.val(),
                "CuartaVehiculos": txtCuartaVehiculo.val(),
                "QuintaVehiculos": txtQuintaVehiculo.val(),
                "SextaVehiculos": txtSextaVehiculo.val(),
                "IDEstadoContrato": configViwolf.EstadosContratos.Pendiente,
                "IDReservacion": txtIdReservacionContrato.val()
            }
            try {
                var oUrl = 'Contratos/GuardarContrato';
                var oProcessMessage = 'Guardando Contrato';

                var success = function (result) {
                    if (result.MessageType == "Success") {
                        Dialog.alert('Contrato', result.InfoMessage, function () {
                        })
                        fnLimpiarDatos();
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