var reporteCajas = function () {
    var txtFechaInicio = $("#txtFechaInicio");
    

    var btnGenerarReporte = $("#btnGenerarReporte");

    var dateIni = null;
    

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
    

        txtFechaInicio.datepicker({
            autoclose: true,
            dateFormat: "dd/mm/yy",
            onSelect: function (selected) {

              
                var fechaSeleccionada = moment(selected, 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss');
                dateIni = new Date(fechaSeleccionada);
            }
            , maxDate: '+500D'
        });

        txtFechaInicio.datepicker('setDate', new Date());
        
    }



    var Init = function () {
        fnCargaFechas();
        txtFechaInicio.val("");
        
        btnGenerarReporte.click(fnGenerarReporte);

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

            var oUrl = 'VerReporteCaja';
            var oData =
            {

                "FechaInicial": dateIni,
             

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



    });
}();