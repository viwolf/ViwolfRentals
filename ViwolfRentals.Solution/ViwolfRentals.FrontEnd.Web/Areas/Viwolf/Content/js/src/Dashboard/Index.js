var indexDashboard = function () {
    var tblReservados = $("#tblReservados");
    var tblRecoger = $("#tblRecoger");


    var fnLlenarReservados = function () {

        var oData = {
            "GeneraContrato": false,
        };
        try {

            var oUrl = 'Dashboard/ListarReservacion';


            var oProcessMessage = 'Buscando Reservas';
            var success = function (result) {

                if (result.Data.length > 0) {
                    tblReservados.dataTable({
                        destroy: true,
                        processing: true,
                        responsive: true,
                        data: result.Data,
                        select: false,
                        columns: [
                            { data: 'IDVehiculo' },
                            { data: 'NombreCliente' },
                            { data: 'LugarEntrega' },
                            { data: 'FechaInicio' },
                            { data: 'HoraInicio' },

                        ],
                        "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {

                            $('td', nRow).css('background-color', aData.objVehiculo.CodigoColor);
                        }
                    });
                }
            };
            app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
        } catch (ex) {

            retorno = false;
        }

    }

    var fnLlenarRecoger = function () {
        var oData = {
            "GeneraContrato": true,
        };
        try {

            var oUrl = 'Dashboard/ListarEntregas';


            var oProcessMessage = 'Buscando Entregas';
            var success = function (result) {

                if (result.Data.length > 0) {

                    tblRecoger.dataTable({
                        destroy: true,
                        processing: true,
                        responsive: true,
                        data: result.Data,
                        select: false,
                        columns: [
                            { data: 'IDVehiculo' },
                            { data: 'NombreCliente' },
                            { data: 'LugarEntrega' },
                            { data: 'FechaEntrega' },
                            { data: 'HoraEntrega' },

                        ],
                        "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {

                            $('td', nRow).css('background-color', aData.objVehiculo.CodigoColor);
                        }
                    });
                }
            };
            app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
        } catch (ex) {

            retorno = false;
        }

    }


    $(function () {
        fnLlenarReservados();
        fnLlenarRecoger();
    });
}();