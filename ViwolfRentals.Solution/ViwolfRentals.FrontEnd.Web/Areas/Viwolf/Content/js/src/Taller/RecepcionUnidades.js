var recepcionUnidades = function () {
    var txtIDVehiculo = $("#txtIDVehiculo");
    var txtNumeroContrato = $("#txtNumeroContrato");
    var txtMarca = $("#txtMarca");
    var txtModelo = $("#txtModelo");
    var txtAnno = $("#txtAnno");
    var txtCategoria = $("#txtCategoria");
    var txtCajon = $("#txtCajon");
    var txtSurfRacks = $("#txtSurfRacks");
    var txtRtvSticker = $("#txtRtvSticker");
    var txtRtvPapel = $("#txtRtvPapel");
    var txtMarchamoSticker = $("#txtMarchamoSticker");
    var txtMarchamoPapel = $("#txtMarchamoPapel");
    var txtPlacaSticker = $("#txtPlacaSticker");
    var txtTituloPropiedad = $("#txtTituloPropiedad");
    var txtKilometrajeInicial = $("#txtKilometrajeInicial");
    var txtKilometrajeFinal = $("#txtKilometrajeFinal");
    var txtRecorrido = $("#txtRecorrido");
    var txtMarchamoSticker = $("#txtNombreCliente");
    var txtMarchamoPapel = $("#txtTipoContrato");
    var imgFrontalVehiculo = $("#imgFrontalVehiculo");
    var chkFrontalVehiculo = $("#chkFrontalVehiculo");
    var imgTraseraVehiculo = $("#imgTraseraVehiculo");
    var chkTraseraVehiculo = $("#chkTraseraVehiculo");
    var imgCostadoIzquierdaVehiculo = $("#imgCostadoIzquierdaVehiculo");
    var chkCostadoIzquierdoVehiculo = $("#chkCostadoIzquierdoVehiculo");
    var imgCostadoDerechoVehiculo = $("#imgCostadoDerechoVehiculo");
    var chkCostadoDerechoVehiculo = $("#chkCostadoDerechoVehiculo");
    var btnBuscarContrato = $("#btnBuscarContrato");



    var fnInit = function () {
        
        $("#tabs").tabs();
        btnBuscarContrato.click(fnBuscarContrato);
    };

    function bin2string(array) {
        var result = "";
        for (var i = 0; i < array.length; ++i) {
            result += (String.fromCharCode(array[i]));
        }
        return result;
    }


    var fnBuscarContrato = function () {
        var oData = {
            "NumeroContrato": txtNumeroContrato.val(),
            "t_Reservaciones.IDVehiculo": txtIDVehiculo.val(),
        };
        try {

            var oUrl = 'Contratos/ListarContratosxTerminar';


            var oProcessMessage = 'Buscando Contratos';
            var success = function (result) {
                var objectURL = "";
                var image_64 = "";
                if (result.Data.length > 0) {
                    txtMarca.val(result.Data[0].objReservacion.t_Vehiculos.Marca);
                    txtModelo.val(result.Data[0].objReservacion.t_Vehiculos.Modelo);
                    txtAnno.val(result.Data[0].objReservacion.t_Vehiculos.Anno);
                    txtCategoria.val(result.Data[0].objReservacion.t_Vehiculos.t_CategoriasVehiculos.NombreCategoriaVehiculo);
                    txtNumeroContrato.val(result.Data[0].NumeroContrato);
                    txtIDVehiculo.val(result.Data[0].objReservacion.t_Vehiculos.IDVehiculo);

                    
                    var previewFrontal = document.getElementById('imgFrontalVehiculo');
                    var previewTrasera = document.getElementById('imgTraseraVehiculo');
                    var previewIzquierda = document.getElementById('imgCostadoIzquierdaVehiculo');
                    var previewDerecha = document.getElementById('imgCostadoDerechoVehiculo');

                    objectURL = bin2string(result.Data[0].FrontalVehiculos);
                    image_64 = btoa(objectURL);
                    previewFrontal.src = "data:image/jpg;base64," + image_64; 

                    objectURL = bin2string(result.Data[0].TraseraVehiculos);
                    image_64 = btoa(objectURL);
                    previewTrasera.src = "data:image/jpg;base64," + image_64; 

                    objectURL = bin2string(result.Data[0].IzquierdaVehiculos);
                    image_64 = btoa(objectURL);
                    previewIzquierda.src = "data:image/jpg;base64," + image_64; 

                    objectURL = bin2string(result.Data[0].DerechaVehiculos);
                    image_64 = btoa(objectURL);
                    previewDerecha.src = "data:image/jpg;base64," + image_64; 

                    
                }
                else {
                    Dialog.alert('Vehiculos', result.InfoMessage == "" ? result.ErrorMessage : result.InfoMessage, function () {
                       
                    })
                };
            };
            app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
        } catch (ex) {

            retorno = false;
        }


    }

    $(function () {
        fnInit();
    });
}();