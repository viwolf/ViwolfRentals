var calendarioReservas = function () {
    var txtAnno = $("#txtAnno");
    var txtMes = $("#txtMes");
    var btnMostrarCalendario = $("#btnMostrarCalendario");
    var numeroDias = 0;
    

    var generarClendario = function () {



        let myTable = "<table id='tblCalendario'><tr><td style='width: 100px; border:1px solid black;border-collapse:collapse;'>Placa</td>";
        for (var i = 1; i <= numeroDias; i++) {
            myTable += "<td style='width: 100px; color: red; text-align: center; border:1px solid black;border-collapse:collapse;'>" + i + "</td>";
        }

        myTable += "<tr><td style='width: 100px;text-align: center;border:1px solid black;border-collapse:collapse;'>Placa</td>";
        for (let i = 1; i <= numeroDias; i++) {
            myTable += "<td style='width: 100px;text-align: center; border:1px solid black;border-collapse:collapse; background-color:#FF0000 ';></td>";
        }
        myTable += "</tr>";


        myTable += "</table>";
        document.getElementById('tblData').innerHTML = myTable;
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