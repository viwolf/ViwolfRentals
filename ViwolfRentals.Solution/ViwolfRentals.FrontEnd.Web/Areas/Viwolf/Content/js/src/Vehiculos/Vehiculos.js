var vehiculos = function () {
    var $table = $('#tableListVehiculos');



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
                            { data: 'IDVehiculo' },
                            { data: 'Marca' },
                            { data: 'Modelo' },
                            { data: 't_CategoriasVehiculos.NombreCategoriaVehiculo' },
                            { data: 't_Departamentos.NombreDepartamento' },
                            { data: 'Ver' }
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

    $(function () {
        debugger;
      //  Init();
        fnBuscarVehiculo();


    });
}();