var generarContrato = function () {

    //Botones
    var $btnGenerarWord = $('#btnGenerarWord');
    var $btnGenerarExcel = $('#btnGenerarExcel');
    var $btnGenerarPDF = $('#btnGenerarPDF');
    var $popupReports = $('#popupReport');
    var $repote = $('#reportes');
    var $tituloReporte = $('#tituloReporte');
    var IdContrato = 0;
    var flagResponsabilidad = false;
    var Modulo = "";
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

    function fnReporte(e, idContrato, modulo) {
        
        Modulo = modulo
        IdContrato = idContrato;
        flagResponsabilidad = false;

        //if(e )
        //e.preventDefault();


        try {
            var oUrl = Modulo == 'Reimpresion' ? 'VerGeneracionContrato' : 'Reportes/VerGeneracionContrato';
            
            var oData =
            {

                "IDContrato": idContrato
            };

            var oProcessMessage = 'Generando reporte, espere por favor...';

            var success = function (result) {

                if (result.MessageType == '1') {
                    app.fnShowErrorMessage(result.ErrorMessage);

                    return;
                }
                
                $popupReports.modal('show', fnCerrarModalContrato);
                $repote.html(result);
                $popupReports.on('hide.bs.modal', fnCerrarModalContrato);
                //app.fnShowSuccessMessage(result.InfoMessage);
               
            };

            app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
        }
        catch (e) {
            app.fnShowErrorMessage(e.message);
        }

    }

    var fnCerrarModalContrato = function (e) {
        //$popupReports.on('hide.bs.modal', fnCerrarModalTicket);
        if (Modulo != "Reimpresion") {
            if (flagResponsabilidad == false)
                fnTicketResponsabilidad();
        }
    };

    function fnTicketResponsabilidad() {
        
        try {
            var oUrl = 'Reportes/VerTicketResponsabilidad';

            var oData =
            {
                "IDContrato": IdContrato
            };

            var oProcessMessage = 'Generando reporte, espere por favor...';

            var success = function (result) {
                debugger;
                flagResponsabilidad = true;
                if (result.MessageType == '1') {
                    app.fnShowErrorMessage(result.ErrorMessage);
                    return;
                }
                $('#reportes').html(result);
                $popupReports.modal('show');
                //$repote.html(result);
               // $popupReports.on('hide.bs.modal', fnCerrarModalTicket);
            };

            app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
        }
        catch (e) {
            app.fnShowErrorMessage(e.message);
        }
    }

    var fnCerrarModalTicket = function (e) {
        $popupReport.modal('hide');
    };


    return {
        fnReporteTicket: fnReporte
    };

}();