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
        var oData = {
            "IDDepartamento" : 1
        };
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