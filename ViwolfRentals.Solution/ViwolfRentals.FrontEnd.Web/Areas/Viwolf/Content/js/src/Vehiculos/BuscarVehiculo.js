var BuscarVehiculo = function () {
    var modalVehiculo = $('#popupBusquedaVehiculo');
    var $table = $('#tableListBusVeh');
    var btnEnlazar = $("#btnSeleccionar");
    var objSeleccionado = null;
    var fnCallbak = null;


        


    var fnInit = function () {
       btnEnlazar.unbind().click(fnEnlazarVehiculo);
      // btnBuscarVehiculo.unbind().click(fnBuscarVehiculo);
    };

  
   

   
    var fnBuscarVehiculo = function () {

        var oData = null;

        try {
            var oUrl = 'Vehiculos/ListarVehiculos';
            var oProcessMessage = 'Buscando Vehiculos';

            var success = function (result) {
              
                if (result.Data.length > 0) {
                    debugger;

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

                        //var iId = aData[1];
                        ////$('#edit' + iId).click();
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
        modalVehiculo.modal('hide');
        fnCallbak(objSeleccionado);
    }

       

    var fnAbrirModal = function (callback) {
        fnCallbak = callback;
        fnInit();
        modalVehiculo.modal('show');
        fnBuscarVehiculo();
        
        //debugger;
        //$table.DataTable({
        //    select: true
        //})
          
    };

    return {
        AbrirModal: fnAbrirModal
    }
}();