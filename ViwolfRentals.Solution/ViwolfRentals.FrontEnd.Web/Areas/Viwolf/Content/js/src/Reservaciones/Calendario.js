var calendarioReservas = function () {
    var txtAnno = $("#txtAnno");
    var txtMes = $("#txtMes");
    var btnMostrarCalendario = $("#btnMostrarCalendario");

    var numeroDias = 0;
 
    var DiasIniciales = "";
    var MesesIniciales = "";
    var listMesesIniciales = "";
    var DiasFinales = "";
    var MesesFinales = "";
    var listDiasIniciales = "";
    var reservacionesIDs = "";
    var listDiasFinales = "";
    var listreservacionesIDs = "";

    
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
                    
                    let myTable = "<table id='tblCalendario'><tr><td style='width:100px;color:#0B0B61;background-color:#f7af39;text-align:center;font-weight:bold;font-size: larger;border:1px solid black;border-collapse:collapse;'>Placa</td>";
                    myTable += "<td style='width: 5px;text-align: center; border:1px solid black;border-collapse:collapse; background-color:#FFFFFF ';></td>";
                    for (var i = 1; i <= numeroDias; i++) {
                        if (i < 10) {
                            myTable += "<td style='width: 100px;color:#0B0B61;background-color:#f7af39;font-weight:bold;font-size:larger;text-align: center; border:1px solid black;border-collapse:collapse;'>0" + i + "</td>";
                        }
                        else {
                            myTable += "<td style='width: 100px;color:#0B0B61;background-color:#f7af39;font-weight:bold;font-size:larger;text-align: center; border:1px solid black;border-collapse:collapse;'>" + i + "</td>";
                        }                        
                    }
                    for (var x = 0; x < result.Data.length; x++) {
                        DiasIniciales = "";
                        MesesIniciales = "";
                        DiasFinales = "";
                        MesesFinales = "";
                        reservacionesIDs = "";
                        listDiasIniciales = "";
                        listreservacionesIDs = "";
                        listDiasFinales = "";
                        listMesesIniciales = "";
                       
                      

                        myTable += "<tr><td style='background-color: " + result.Data[x].CodigoColor + ";font-weight:bold; width:300px;color:#21313B;font-size: medium;text-align:center;border:1px solid black;'>" + result.Data[x].IDVehiculo + "</td > ";
                        myTable += "<td style='width: 5px;text-align: center; border:1px solid black;border-collapse:collapse; background-color:#FFFFFF ';></td>";
                        if (result.Data[x].Reservas.length > 0) {
                            for (var re = 0; re < result.Data[x].Reservas.length; re++) {
                                var fechaIni = moment(result.Data[x].Reservas[re].FechaInicio, 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss');
                                var fechaFin = moment(result.Data[x].Reservas[re].FechaFinal, 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss');
                                var fechaIAux = new Date(fechaIni);
                                var fechaFAux = new Date(fechaFin);
                                reservacionesIDs = reservacionesIDs + "," + result.Data[x].Reservas[re].IdReservacion;
                                var annoRentado = fechaIAux.getFullYear();
                                if (annoRentado == txtAnno.val()) {
                                    DiasIniciales = DiasIniciales + "," + fechaIAux.getDate();
                                    DiasFinales = DiasFinales + "," + fechaFAux.getDate();
                                   
                                    MesesIniciales = MesesIniciales + "," + (fechaIAux.getMonth() + 1);
                                    MesesFinales = (fechaFAux.getMonth() + 1);
                                }// Cierre el IF del año
                            }// Cierre el FOR de reservas
                        } // Cierre el IF de reservas
                        
                        listDiasIniciales = DiasIniciales.split(',');
                        listDiasFinales = DiasFinales.split(',');
                        listreservacionesIDs = reservacionesIDs.split(',');
                        listMesesIniciales = MesesIniciales.split(',');

                       
                        var ini = 1;
                        for (let i = 1; i <= numeroDias; i++) {
                            //Comparamos meses iguales
                            if ((listMesesIniciales[ini] == txtMes.val()) && (MesesFinales == txtMes.val())) {
                                if (((listDiasIniciales[ini] <= i) && (listDiasFinales[ini] >= i))) {
                                    myTable += "<td id='td_" + listreservacionesIDs[ini] + "' style = 'width: 100px;text-align: center; border:1px solid black;border-collapse:collapse; background-color:#FF0000 ';></td > ";
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
                                if ((listMesesIniciales[ini] == txtMes.val()) && (MesesFinales != txtMes.val())) {
                                    if (listDiasIniciales[ini] <= i) {
                                        myTable += "<td id='td_" + listreservacionesIDs[ini] + "' style='width: 100px;text-align: center; border:1px solid black;border-collapse:collapse; background-color:#FF0000 ';></td>";
                                        ini++;
                                        if (ini == listDiasIniciales.length)
                                            ini = listDiasIniciales.length - 1;
                                    }
                                    else {
                                        myTable += "<td style='width: 100px;text-align: center; border:1px solid black;border-collapse:collapse; background-color:#FFFFFF ';></td>";
                                    }
                                }
                                else
                                    //Comparamos que el mes Inicial sea diferente, pero el mes final sea igual
                                    if ((listMesesIniciales[ini] != txtMes.val()) && (MesesFinales == txtMes.val())) {
                                        if (listDiasFinales[ini] >= i) {
                                            myTable += "<td id='td_" + listreservacionesIDs[ini] + "' style='width: 100px;text-align: center; border:1px solid black;border-collapse:collapse; background-color:#FF0000 ';></td>";
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
              
                $('#tblCalendario tr td').click(function () {
                    var idReserva = $(this).attr('id');
                   
                    if (idReserva != undefined) {
                        var listR = idReserva.split("_");
                        informacionReservacion.AbrirModal(listR[1]);
                    };  
                });


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
        for (var i = n; i >= 2020; i--) {
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