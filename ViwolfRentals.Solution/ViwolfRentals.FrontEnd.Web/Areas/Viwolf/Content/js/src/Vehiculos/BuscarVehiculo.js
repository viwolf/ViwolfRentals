

var BuscarVehiculo = function () {
    var modalVehiculo = $('#popupBusquedaVehiculo');
    var $table = $('#tableListBusVeh');
    var btnEnlazar = $("#btnSeleccionar");
    var objSeleccionado = null;
    var fnCallbak = null;
    var fechaInicio = "";
    var FechaEntrega = "";
    var Modulo = "";

    var fnInit = function () {
       btnEnlazar.unbind().click(fnEnlazarVehiculo);
    };

    var fnBuscarVehiculo = function () {
        var oData = {
            "Activo": configViwolf.EstadosVehiculos.Activo,
            "ExtendedProperties": [
                { "Key": "FechaInicio", "Value": fechaInicio },
                { "Key": "FechaEntrega", "Value": FechaEntrega }
            ]
        };
        try {
           
            var oUrl = Modulo == 'ExtensionContrato' ? 'ListarVehiculosReservaciones' : 'Vehiculos/ListarVehiculosReservaciones';


            var oProcessMessage = 'Buscando Vehiculos';
            var success = function (result) {
               
                if (result.Data.length > 0) {
                    
                    

                    $table.dataTable({
                        destroy: true,
                        processing: true,
                        responsive: true,
                        data: result.Data,
                        select: true,
                        columns: [
                            { data: 'IDVehiculo' },
                            { data: 't_CategoriasVehiculos.NombreCategoriaVehiculo' },
                            { data: 'Marca' },
                            { data: 'Modelo' },
                        ],
                    });
                    $table.on("click", "tr", function () {
                        var iPos = $table.fnGetPosition(this);
                        objSeleccionado = $table.fnGetData(iPos);
                    });
                }
                else {
                    Dialog.alert('Vehiculos', result.InfoMessage == "" ? result.ErrorMessage : result.InfoMessage, function () {
                        modalVehiculo.modal('hide');
                    })                
                };
            };
            app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
        } catch (ex) {
          
            retorno = false;
        }
       

    }

    var fnEnlazarVehiculo = function (e) {
        modalVehiculo.modal('hide');
        fnCallbak(objSeleccionado);
    }

    var fnAbrirModal = function (callback, _fechaInicio, _fechaEntrega, modulo) {
        fnCallbak = callback;
        Modulo = modulo;
        fechaInicio = _fechaInicio;
        FechaEntrega = _fechaEntrega;
        fnInit();
        modalVehiculo.modal('show');
        fnBuscarVehiculo();
      
          
    };

    return {
        AbrirModal: fnAbrirModal
    }
}();