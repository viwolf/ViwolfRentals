var vehiculos = function () {
    var $table = $('#tableListVehiculos');
    var objSeleccionado = null;

    function fnOnClickBtn_InfoVehiculo() {
       
        var t = setTimeout(function () {
            
            listadoVehiculosInventario.AbrirModal(objSeleccionado.IDVehiculo);


        }, 100);
    };

    function fnOnClickBtn_EditarVehiculo() {
        var t = setTimeout(function () {
          
            editarVehiculo.AbrirModal(objSeleccionado.IDVehiculo);

        }, 100);
    };


    function OnPageEvent(table) {
        
        let $btnInfo = $(table.fnGetNodes()).find("button[name^='btnV_']");
        let $btnEdit = $(table.fnGetNodes()).find("button[name^='btnE_']");



        $btnInfo.click(function () {
            fnOnClickBtn_InfoVehiculo();
        });

        $btnEdit.click(function () {
            fnOnClickBtn_EditarVehiculo();
        });
    }


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
                            { data: 'Anno' },
                            { data: 'GPS' },
                            { data: 't_CategoriasVehiculos.NombreCategoriaVehiculo' },
                            { data: 't_Departamentos.NombreDepartamento' },
                            { data: 'Editar' },
                            { data: 'Ver' }
                        ],
                    });
                    $table.on("click", "tr", function () {
                        var iPos = $table.fnGetPosition(this);
                        debugger;
                        
                        objSeleccionado = $table.fnGetData(iPos);
                    });
                    OnPageEvent($table);
                }
                else {
                    Dialog.alert('Listado Vehiculos', result.InfoMessage == "" ? result.ErrorMessage : result.InfoMessage, function () {
                    })
                };
            };
            app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
        } catch (ex) {

            retorno = false;
        }


    }

    $(function () {
        
      //  Init();
        fnBuscarVehiculo();


    });
}();