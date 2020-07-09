var reporteCxC = function () {
    var txtFechaInicio = $("#txtFechaInicio");
    var txtFechaFinal = $("#txtFechaFinal");
    var txtProveedores = $("#txtProveedores");
    
    var btnGenerarCuentas = $("#btnGenerarCuentas");
    var txtEstadoCuentas = $("#txtEstadoCuentas");
    var idsProveedores = "";
    var dateIni = null;
    var dateFin = null;

    /*SECCION DE REOPRTES*/
    var $btnGenerarWord = $('#btnGenerarWord');
    var $btnGenerarExcel = $('#btnGenerarExcel');
    var $btnGenerarPDF = $('#btnGenerarPDF');
    var $popupReports = $('#popupReport');
    var $repote = $('#reportes');
    var $tituloReporte = $('#tituloReporte');
    /************************************** */
    function fnCargaFechas() {

        txtFechaInicio.datepicker("destroy");
        txtFechaFinal.datepicker("destroy");

        txtFechaInicio.datepicker({
            autoclose: true,
            dateFormat: "dd/mm/yy",
            onSelect: function (selected) {

                var fechaFinal = moment(txtFechaFinal.val(), 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss');
                var fechaSeleccionada = moment(selected, 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss');
                dateIni = new Date(fechaSeleccionada);
                txtFechaFinal.datepicker("option", "minDate", selected);
            }
            , maxDate: '+500D'
        });

        txtFechaFinal.datepicker({
            autoclose: true,
            dateFormat: "dd/mm/yy",
            onSelect: function (selected) {

                var fechaInicial = moment(txtFechaInicio.val(), 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss');
                var fechaSeleccionada = moment(selected, 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss');
                dateFin = new Date(fechaSeleccionada);
                txtFechaInicio.datepicker("option", "maxDate", selected);
            },
            maxDate: '+500D'
        });

        txtFechaInicio.datepicker('setDate', new Date());
        txtFechaFinal.datepicker('setDate', new Date());
    }

    var cargarSelect2 = function (elemento, configuracion) {

        $.ajax({
            type: "POST",
            url: configuracion.Url,
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {

                $(msg.Data).each(function (serverData) {
                    if (configuracion.SuccessFunction) {
                        configuracion.SuccessFunction(serverData);
                    }
                    var option = $(document.createElement('option'));

                    option.text(this[configuracion.Text]);
                    option.val(this[configuracion.Id]);
                    if (idsProveedores == "")
                        idsProveedores = this[configuracion.Id]
                    else
                        idsProveedores = idsProveedores + "," + this[configuracion.Id]



                    elemento.append(option);
                });

            },
            error: function (msg) {
                $("#dvAlerta > span").text("Error al llenar el combo");
            }
        });


    };

    var InitSelect = function () {
        cargarSelect2(txtProveedores,
            {
                PlaceHolder: "",
                Url: "ListarProveedores",
                DataType: 'json',
                Type: "POST",
                Id: "IdProveedor",
                Text: "NombreProveedor",
                InitSelection: function (callback, configuracion) {
                    $.ajax(configuracion.Url, {
                        url: configuracion.Url,
                        data: configuracion.data,
                        dataType: 'json',
                        type: 'POST'
                    }).done(function (data) {

                    });
                },

            });


    };

    var Init = function () {
        fnCargaFechas();
        txtFechaInicio.val("");
        txtFechaFinal.val("");
        btnGenerarCuentas.click(fnGenerarReporte);

        $btnGenerarExcel.click(fnReporteExportar);
        $btnGenerarPDF.click(fnReporteExportar);
        $btnGenerarWord.click(fnReporteExportar);
        mediosExportar(false, false, false);
    }

    function mediosExportar(pdf, excel, word) {
        if (!pdf) {
            $btnGenerarPDF.hide();
        }
        if (!excel) {
            $btnGenerarExcel.hide();
        }
        if (!word) {
            $btnGenerarWord.hide();
        }
    }

    function fnReporteExportar(e) {
        if (e.currentTarget.id == 'btnGenerarExcel') {
            var url = 'Reportes/ExportarReporte?Tipo=' + 'Excel'

        }
        else if (e.currentTarget.id == 'btnGenerarPDF') {
            var url = 'Reportes/ExportarReporte?Tipo=' + 'PDF'

        }
        else if (e.currentTarget.id == 'btnGenerarWord') {
            var url = 'Reportes/ExportarReporte?Tipo=' + 'Word'

        }

        window.location = url;
    }

    var fnGenerarReporte = function (e) {

        try {


            var proveedor = document.getElementById("txtProveedores");
            var Idproveedor = proveedor.options[proveedor.selectedIndex].value;

            var estados = document.getElementById("txtEstadoCuentas");
            var IdEstado = estados.options[estados.selectedIndex].value;



            var oUrl = 'VerReporteCxC';
            var oData =
            {

                "FechaInicial": dateIni,
                "FechaFinal": dateFin,
                "IDProveedor": Idproveedor == 0 ? idsProveedores : Idproveedor.toString(),
                "CuentaCobrada": IdEstado.toString()

            };

            var oProcessMessage = 'Generando reporte, espere por favor...';

            var success = function (result) {

                if (result.MessageType == '1') {
                    app.fnShowErrorMessage(result.ErrorMessage);

                    return;
                }
                // $popupReports.modal('show');
                $repote.html(result);


            };

            app.fnExecuteWithResult(e, oUrl, oData, oProcessMessage, success);
        }
        catch (e) {
            app.fnShowErrorMessage(e.message);
        }
    };


    $(function () {
        Init();
        InitSelect();


    });
}();