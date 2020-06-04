var calendarioReservas = function () {
    var txtAnno = $("#txtAnno");
    var txtMes = $("#txtMes");
    var btnMostrarCalendario = $("#btnMostrarCalendario");
    var numeroDias = 0;
 
    var DiasIniciales = "";
    var MesesIniciales = "";
    var DiasFinales = "";
    var MesesFinales = "";
    var listDiasIniciales = "";
    var listMesesIniciales = "";
    var listDiasFinales = "";
    var listMesesFinales = "";

    var generarClendario = function () {

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
                    let myTable = "<table id='tblCalendario'><tr><td style='width:100px;color:#0B0B61;text-align:center;font-weight:bold;font-size: larger;border:1px solid black;border-collapse:collapse;'>Placa</td>";
                    for (var i = 1; i <= numeroDias; i++) {
                        myTable += "<td style='width: 100px;color:#0B0B61;font-weight:bold;font-size:larger;text-align: center; border:1px solid black;border-collapse:collapse;'>" + i + "</td>";
                    }
                    for (var x = 0; x < result.Data.length; x++) {
                        DiasIniciales = "";
                        MesesIniciales = "";
                        DiasFinales = "";
                        MesesFinales = "";
                        listDiasIniciales = "";
                        listMesesIniciales = "";
                        listDiasFinales = "";
                        listMesesFinales = "";

                        myTable += "<tr><td style='width:300px;color:#08088A;font-weight:italic;font-size: medium;text-align:center;border:1px solid black;'>" + result.Data[x].IDVehiculo + "</td > ";
                        if (result.Data[x].Reservas.length > 0) {
                            for (var re = 0; re < result.Data[x].Reservas.length; re++) {
                                var fechaIni = moment(result.Data[x].Reservas[re].FechaInicio, 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss');
                                var fechaFin = moment(result.Data[x].Reservas[re].FechaFinal, 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss');
                                var fechaIAux = new Date(fechaIni);
                                var fechaFAux = new Date(fechaFin);

                                var annoRentado = fechaIAux.getFullYear();
                                if (annoRentado == txtAnno.val()) {
                                    DiasIniciales = DiasIniciales + "," + fechaIAux.getDate();
                                    DiasFinales = DiasFinales + "," + fechaFAux.getDate();
                                    MesesIniciales = (fechaIAux.getMonth() + 1);
                                    MesesFinales = (fechaFAux.getMonth() + 1);
                                }// Cierre el IF del año
                            }// Cierre el FOR de reservas
                        } // Cierre el IF de reservas
                        debugger;
                        listDiasIniciales = DiasIniciales.split(',');
                        listDiasFinales = DiasFinales.split(',');
                        //listMesesIniciales = MesesIniciales.split(",");
                        //listMesesFinales = MesesFinales.split(",");

                        var ini = 1;
                        for (let i = 1; i <= numeroDias; i++) {
                            //Comparamos meses iguales
                            if ((MesesIniciales == txtMes.val()) && (MesesFinales == txtMes.val())) {
                                if (((listDiasIniciales[ini] <= i) && (listDiasFinales[ini] >= i))) {
                                    myTable += "<td style='width: 100px;text-align: center; border:1px solid black;border-collapse:collapse; background-color:#FF0040 ';></td>";
                                    ini++;
                                    if (ini == listDiasIniciales.length)
                                        ini = listDiasIniciales.length - 1;
                                }
                                else {
                                    myTable += "<td style='width: 100px;text-align: center; border:1px solid black;border-collapse:collapse; background-color:#FFFFFF ';></td>";
                                }
                            }
                            else
                                //Comparamos que el mes Inicial sea igual, pero el mes final no
                                if ((MesesIniciales == txtMes.val()) && (MesesFinales != txtMes.val())) {
                                    if (listDiasIniciales[ini] <= i) {
                                        myTable += "<td style='width: 100px;text-align: center; border:1px solid black;border-collapse:collapse; background-color:#FF0040 ';></td>";
                                        ini++;
                                        if (ini == listDiasIniciales.length)
                                            ini = listDiasIniciales.length - 1;
                                    }
                                    else {
                                        myTable += "<td style='width: 100px;text-align: center; border:1px solid black;border-collapse:collapse; background-color:#FFFFFF ';></td>";
                                    }
                                }
                                else
                                    //Comparamos que el mes Inicial sea diferente, pero el mes final sea iguañ
                                    if ((MesesIniciales != txtMes.val()) && (MesesFinales == txtMes.val())) {
                                        if (listDiasFinales[ini] >= i) {
                                            myTable += "<td style='width: 100px;text-align: center; border:1px solid black;border-collapse:collapse; background-color:#FF0040 ';></td>";
                                            ini++;
                                            if (ini == listDiasIniciales.length)
                                                ini = listDiasIniciales.length - 1;
                                        }
                                        else {
                                            myTable += "<td style='width: 100px;text-align: center; border:1px solid black;border-collapse:collapse; background-color:#FFFFFF ';></td>";
                                        }
                                    }
                                    else {
                                        myTable += "<td style='width: 100px;text-align: center; border:1px solid black;border-collapse:collapse; background-color:#FFFFFF ';></td>";
                                    }
                        }// Cierre el FOR dias
                        //}// Cierre el FOR de dias iniciales


                        myTable += "</tr>";
                    }// Cierre el FOR de vehiculos

                    myTable += "</table>";
                    document.getElementById('tblData').innerHTML = myTable;
                }// Cierre el IF de reSULT
                else {
                    Dialog.alert('Reservaciones', result.InfoMessage == "" ? result.ErrorMessage : result.InfoMessage, function () {
                    })
                };
            };// Cierre SUCCESS
            app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
        } catch (ex) {
            retorno = false;
        }
    }


    var fnMostrarCalendario = function () {
        
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