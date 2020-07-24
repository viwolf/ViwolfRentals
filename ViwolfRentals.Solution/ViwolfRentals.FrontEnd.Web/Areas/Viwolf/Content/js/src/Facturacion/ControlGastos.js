var gastos = function () {

    var txtDescripcionGasto = $("#txtDescripcionGasto");
    var txtMontoGasto = $("#txtMontoGasto");
    var txtNumeroFacturaGasto = $("#txtNumeroFacturaGasto");
    var txtFacturaGasto = $("#txtFacturaGasto");
    var imgFacturaGasto = $("#imgFacturaGasto");
    var btnAgregarGasto = $("#btnAgregarGasto");
    var tblDataGastos = $("#tblDataGastos");
    var txtTotalGastos = $("#txtTotalGastos");
    var imgFactura = null;


    var fnReader = function (e) {
        imgFactura = e.target.result;
        var preview = document.getElementById("imgFacturaGasto");
        preview.src = imgFactura;
    }

    var fnCalcular = function () {
        debugger;
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
        
    };

    var fnLlenarTable = function () {
      
        tblDataGastos.row.add([
            txtDescripcionGasto.val(),
            txtMontoGasto.val(),
            txtNumeroFacturaGasto.val(),
            "<img src=" + imgFactura + " width = '150'  height = '150' alt = '' >",
            "<button>+</i></button > ",
            "<button>-</i></button>"
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



    $(function () {
        fnInit();
    });

}();