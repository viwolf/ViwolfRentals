var listadoVehiculosInventario = function () {
    var modalVehiculo = $('#popupInformacionVehiculoInventario');
    var tableFichaTecnica = $('#tableListVehiculosFicha');
    var tableDerechos = $('#tableListVehiculosDerechos');
    var tableKilometraje = $('#tableListVehiculosKilometraje');

    var fnBuscarKilometrajes = function (idVehiculo) {
        var oData = {
            "IDVehiculo": idVehiculo
        };
        try {
            var oUrl = 'Vehiculos/ListarKilometrajes';
            var oProcessMessage = 'Buscando Vehiculos';
            var success = function (result) {
                if (result.Data.length > 0) {
                    tableKilometraje.dataTable({
                        destroy: true,
                        processing: true,
                        responsive: true,
                        data: result.Data,
                        select: true,
                        "scrollX": true,
                        columns: [
                            { data: 'IDReservacion' },
                            { data: 'FechaInicial' },
                            { data: 'KilometrajeInicial' },
                            { data: 'FechaFinal' },
                            { data: 'KilometrajeFinal' },
                            { data: 'KilometrajeReccorrido' }
                        ],
                    });

                }
                else {
                    alert("No hay kilometrajes incluidos para este vehiculo.");
                };
            };
            app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
        } catch (ex) {

            retorno = false;
        }


    }

    var fnBuscarVehiculo = function (idVehiculo) {
        var oData = {
            "IDVehiculo": idVehiculo
        };
        try {
            var oUrl = 'Vehiculos/ListarVehiculos';
            var oProcessMessage = 'Buscando Vehiculos';
            var success = function (result) {
                if (result.Data.length > 0) {
                    tableDerechos.dataTable({
                        destroy: true,
                        processing: true,
                        responsive: true,
                        data: result.Data,
                        select: true,
                        "scrollX": true,
                        columns: [
                            { data: 'RtvVencimientoMes' },
                            { data: 'RtvVencimientoAnno' },
                            { data: 'MarchamoProximo' },
                            { data: 'RtvSticker' },
                            { data: 'RtvPapel' },
                            { data: 'MarchamoPapel' },
                            { data: 'StickerPlaca' },
                            { data: 'TituloPropiedad' },
                        ],
                    });

                    tableFichaTecnica.dataTable({
                        destroy: true,
                        processing: true,
                        responsive: true,
                        data: result.Data,
                        select: true,
                        "scrollX": true,
                        columns: [
                            { data: 'NumeroChasis' },
                            { data: 'NumeroMotor' },
                            { data: 'Color' },
                            { data: 'Direccion' },
                            { data: 'Transmision' },
                            { data: 'NumeroCilindros' },
                            { data: 'PesoKg' },
                            { data: 'Carroceria' },
                            { data: 'Traccion' },
                            { data: 'Capacidad' },
                        ],
                    });
                   
                }
                else {
                    alert("No hay vehiculos disponibles para su renta.");
                };
            };
            app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
        } catch (ex) {

            retorno = false;
        }


    }

    var fnAbrirModal = function (idVehiculo) {
        $("#tabs").tabs();
        modalVehiculo.modal('show');
        fnBuscarVehiculo(idVehiculo);
        fnBuscarKilometrajes(idVehiculo);
    };

    return {
        AbrirModal: fnAbrirModal
    }
}();