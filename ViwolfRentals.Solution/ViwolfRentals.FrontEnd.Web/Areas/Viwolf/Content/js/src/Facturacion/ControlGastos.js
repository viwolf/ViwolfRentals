var gastos = function () {

    var txtDescripcionGasto = $("#txtDescripcionGasto");
    var txtMontoGasto = $("#txtMontoGasto");
    var txtNumeroFacturaGasto = $("#txtNumeroFacturaGasto");
    var txtFacturaGasto = $("#txtFacturaGasto");
    var imgFacturaGasto = $("#imgFacturaGasto");
    var btnAgregarGasto = $("#btnAgregarGasto");
    var tblDataGastos = $("#tblDataGastos");
    var txtTotalGastos = $("#txtTotalGastos");
    var btnGuardarGastos = $("#btnGuardarGastos");
    var imgFactura = null;
    var rowsData = [];


    var fnReader = function (e) {
        imgFactura = e.target.result;
        var preview = document.getElementById("imgFacturaGasto");
        preview.src = imgFactura;
    }

    var fnCalcular = function () {
       
        var montoGasto = txtMontoGasto.val() == '' ? 0 : parseFloat(txtMontoGasto.val().replace("$", ""));
        var total = txtTotalGastos.val() == '' ? 0 : parseFloat(txtTotalGastos.val().replace("$", ""));
        var montoTotal = total + montoGasto;
        txtTotalGastos.val(utils.formatterDolar.format(montoTotal))
    };

    function readURL(input) {
        if (input.files && input.files[0]) {

            var reader = new FileReader();
            reader.onload = function (e) {

                fnReader(e);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#txtFacturaGasto").change(function () {
      
        readURL(this);
    });

    var fnInit = function () {
        tblDataGastos = $("#tblDataGastos").DataTable({});
        txtMontoGasto.bind('keypress', valideKey);
        txtMontoGasto.blur(function () {
            txtMontoGasto.val(utils.formatterDolar.format(parseFloat(txtMontoGasto.val().replace("$", ""))));
        });
        btnAgregarGasto.unbind().click(fnLlenarTable);

        btnGuardarGastos.unbind().click(fnGuardarGastos);

        
    };

    var fnLlenarTable = function () {
      
        tblDataGastos.row.add([
            txtDescripcionGasto.val(),
            txtMontoGasto.val(),
            txtNumeroFacturaGasto.val(),
            "<img src=" + imgFactura + " width = '150'  height = '150' alt = '' >"
        ]).draw(false);
        fnCalcular();

        txtDescripcionGasto.val("");
        txtMontoGasto.val("");
        txtNumeroFacturaGasto.val("");
        var preview = document.getElementById("imgFacturaGasto");
        preview.src = "";

    }

    //Solo permite introducir numeros.
    function valideKey(evt) {
        var code = evt.which ? evt.which : evt.keyCode;
        if (code == 8) {
            //backspace
            return true;
        } else if (code >= 48 && code <= 57) {
            //is a number
            return true;
        } else {
            return false;
        }

    }

    var fnGuardarGastos = function () {
       
        tblDataGastos.rows().every(function (ed) {
          
            rowsData.push({
                "DescripcionGasto": this.data()[0],
                "MontoGasto": parseFloat(this.data()[1].replace("$", "")),
                "NumeroFacturaGasto": this.data()[2]//,
                //"Factura": this.data()[3]
            });
        });
       

            var oData = {
                "UsuarioCreacion": usuarioLogueado,
                "TotalGastos": parseFloat(txtTotalGastos.val().replace("$", "")),
                "IDUsuario": idUsuarioLogueado,
                "t_GastosDetalle": rowsData,
                "Activo": true
            }
            try {
                var oUrl = 'CrearGasto';
                var oProcessMessage = 'Guardando Gasto';

                var success = function (result) {
                    
                    if (result.MessageType == "Success") {
                        Dialog.alert('Gastos', result.InfoMessage, function () {
                        })
                        tblDataGastos.clear().draw();
                        txtTotalGastos.val("");
                    }
                    else {
                        Dialog.alert('Gastos', result.ErrorMessage, function () {
                        })
                    }
                };
                app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
            } catch (ex) {

                retorno = false;
            }

        

    }


    $(function () {
        fnInit();
    });

}();