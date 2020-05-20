var BuscarVehiculo = function () {
    var modalVehiculo = $('#popupBusquedaVehiculo');
    var $table = $('#tableListBusVeh');
    var btnEnlazar = $("#btnSeleccionar");
    var objSeleccionado = null;
    var fnCallbak = null;

    var fnInit = function () {
       btnEnlazar.unbind().click(fnEnlazarVehiculo);
     
    };

    var fnBuscarVehiculo = function () {
        var oData = null;
        try {
            var oUrl = 'Vehiculos/ListarVehiculos';
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
                            { data: 't_CategoriasVehiculos.NombreCategoriaVehiculo' },
                            { data: 'IDVehiculo' },
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
                    alert("No hay vehiculos disponibles para su renta.");
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

       

    var fnAbrirModal = function (callback) {
        fnCallbak = callback;
        fnInit();
        modalVehiculo.modal('show');
        fnBuscarVehiculo();
      
          
    };

    return {
        AbrirModal: fnAbrirModal
    }
}();