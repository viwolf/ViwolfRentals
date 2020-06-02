var calendarioReservas = function () {
    var txtAnno = $("#txtAnno");
    var txtMes = $("#txtMes");
    var btnMostrarCalendario = $("#btnMostrarCalendario");
    var numeroDias = 0;
    

    var generarClendario = function () {
        debugger;
        var fecha = new Date(txtAnno.val() + '-' + txtMes.val() + '-' + 1);
        var oData = {
            "FechaCompra": fecha
        };
        try {
            var oUrl = 'ListarCalendarioReservaciones';
            var oProcessMessage = 'Buscando Reservaciones';
            var success = function (result) {
                if (result.Data.length > 0) {
                    //Lista los encabezados de la tabla
                    let myTable = "<table id='tblCalendario'><tr><td style='width: 100px; border:1px solid black;border-collapse:collapse;'>Placa</td>";
                    for (var i = 1; i <= numeroDias; i++) {
                        myTable += "<td style='width: 100px; color: red; text-align: center; border:1px solid black;border-collapse:collapse;'>" + i + "</td>";
                    }
                    debugger;
                    for (var x = 0; x < result.Data.length; x++) {
                        myTable += "<tr><td style='width: 100px;text-align: center;border:1px solid black;border-collapse:collapse;'>" + result.Data[x].IDVehiculo + "</td > ";
                        for (let i = 1; i <= numeroDias; i++) {
                            if (result.Data[x].t_Reservaciones != null) {
                                if (result.Data[x].t_Reservaciones.FechaInicio.getDay() == i) {
                                    myTable += "<td style='width: 100px;text-align: center; border:1px solid black;border-collapse:collapse; background-color:#FF0000 ';></td>";
                                }
                                else {
                                    myTable += "<td style='width: 100px;text-align: center; border:1px solid black;border-collapse:collapse; background-color:#FFFFFF ';></td>";
                                }
                            }
                            else {
                                myTable += "<td style='width: 100px;text-align: center; border:1px solid black;border-collapse:collapse; background-color:#FFFFFF ';></td>";
                            }
                        }
                    }
                    myTable += "</tr>";


                    myTable += "</table>";
                    document.getElementById('tblData').innerHTML = myTable;
                }
                else {
                    Dialog.alert('Reservaciones', result.InfoMessage == "" ? result.ErrorMessage : result.InfoMessage, function () {
                    })
                };
            };
            app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
        } catch (ex) {

            retorno = false;
        }
    }


    var fnMostrarCalendario = function () {
        debugger;
        numeroDias = diasEnUnMes(txtMes.val(), txtAnno.val());
        generarClendario();

    }

    var diasEnUnMes = function (mes, año) {
        return new Date(año, mes, 0).getDate();
    }
    var fncargarComboAnno = function () {
        var d = new Date();
        var n = d.getFullYear();
        var select = document.getElementById("txtAnno");
        for (var i = n; i >= 2000; i--) {
            var opc = document.createElement("option");
            opc.text = i;
            opc.value = i;
            select.add(opc)
        }
    }

    var fnInit = function () {
        fncargarComboAnno();
        btnMostrarCalendario.click(fnMostrarCalendario);
    };

    $(function () {
        fnInit();
    });

}();