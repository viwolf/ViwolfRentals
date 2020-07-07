var generarCxC = function () {

    //Botones
    var $btnGenerarWord = $('#btnGenerarWord');
    var $btnGenerarExcel = $('#btnGenerarExcel');
    var $btnGenerarPDF = $('#btnGenerarPDF');
    var $popupReports = $('#popupReport');
    var $repote = $('#reportes');
    var $tituloReporte = $('#tituloReporte');

    $(function () {

        fnInit();

    });

    function fnInit() {
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

    function fnReporte(e, idsPagos) {
        e.preventDefault();
        debugger;

        try {
            var oUrl = 'Reportes/VerPagoCxC';
            var oData =
            {

                "IDCuentaxCobrar": idsPagos
            };

            var oProcessMessage = 'Generando reporte, espere por favor...';

            var success = function (result) {

                if (result.MessageType == '1') {
                    app.fnShowErrorMessage(result.ErrorMessage);
                    return;
                }

                $popupReports.modal('show');
                $repote.html(result);


            };

            app.fnExecuteWithResult(e, oUrl, oData, oProcessMessage, success);
        }
        catch (e) {
            app.fnShowErrorMessage(e.message);
        }

    }

    return {
        fnReporteTicket: fnReporte
    };

}();