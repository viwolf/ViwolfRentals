var BuscarVehiculo = function () {
    var modalVehiculo = $('#popupBusquedaVehiculo');
    var $table = $('#tableListBusVeh');
    var btnEnlazar = $("#btnSeleccionar");



        


    var fnInit = function () {
        debugger;
        btnEnlazar.unbind().click(fnEnlazarVehiculo);
        fnBuscarVehiculo();   
    };

   

   
    var fnBuscarVehiculo = function () {

        var oData = null;

        try {
            var oUrl = 'Vehiculos/ListarVehiculos';
            var oProcessMessage = 'Buscando Vehiculos';

            var success = function (result) {
              
                if (result.Data.length > 0) {
                    debugger;
                    $table.DataTable({
                        destroy: true,
                        responsive: true,
                        data: result.Data,

                        columns: [
                            { data: 't_CategoriasVehiculos.NombreCategoriaVehiculo' },
                            { data: 'IDVehiculo' },
                            { data: 'Marca' },
                            { data: 'Modelo' },
                        ],
                        select: true
                    });
                   
                }
                else {
                    alert("No se encontró el vehiculo en la busqueda");
                };
            };
            app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
        } catch (ex) {
            //utils.fnShowErrorMessage(ex.message);
            retorno = false;
        }
        //return retorno;

    }

  

    var fnEnlazarVehiculo = function (e) {
        debugger;
        $table
            .on('select', function (e, dt, type, indexes) {
                debugger;
                var bla = dt.row({ selected: true }).data().IDVehiculo;
            })
    }

       

    var fnAbrirModal = function () {
        fnInit();
        modalVehiculo.modal('show');
    };

    return {
        AbrirModal: fnAbrirModal
    }
}();