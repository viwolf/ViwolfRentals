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
    var btnTerminarContrato = $("#btnTerminarContrato");
    var imgVehiculoFrontal = null;
    var imgVehiculoTrasera = null;
    var imgVehiculoIzquierda = null;
    var imgVehiculoDerecha = null;
    var IDContrato = 0;


    var fnInit = function () {
        
        $("#tabs").tabs();
        btnBuscarContrato.click(fnBuscarContrato);
        btnTerminarContrato.click(fnTerminarContrato);
    };

    function bin2string(array) {
        var result = "";
        for (var i = 0; i < array.length; ++i) {
            result += (String.fromCharCode(array[i]));
        }
        return result;
    }

    var fnBlock = function (img) {
        var block = img.split(";");
        //var contentType = block[0].split(":")[1];// In this case "image/gif"
        var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."
        //var blob = b64toBlob(realData, contentType);
        return realData;
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
                
                if (result.Data.length > 0) {
                    IDContrato = result.Data[0].IDContrato;
                    var objImage = "";
                    var image_64 = "";
                    

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


                    imgFrontalVehiculo = result.Data[0].FrontalVehiculos;
                    if (imgFrontalVehiculo != null) {
                        objImage = bin2string(imgFrontalVehiculo);
                        image_64 = btoa(objImage);
                        previewFrontal.src = "data:image/jpg;base64," + image_64;
                        imgFrontalVehiculo = previewFrontal.src;
                        document.getElementById("chkFrontalVehiculo").disabled = false;
                    }
                    else {
                        document.getElementById("chkFrontalVehiculo").disabled = true;
                    }

                    imgTraseraVehiculo = result.Data[0].TraseraVehiculos;
                    if (imgTraseraVehiculo != null) {
                        objImage = bin2string(imgTraseraVehiculo);
                        image_64 = btoa(objImage);
                        previewTrasera.src = "data:image/jpg;base64," + image_64; 
                        imgTraseraVehiculo = previewTrasera.src;
                        document.getElementById("chkTraseraVehiculo").disabled = false;
                    }
                    else {
                        document.getElementById("chkTraseraVehiculo").disabled = true;
                    }


                    imgCostadoIzquierdaVehiculo = result.Data[0].IzquierdaVehiculos;
                    if (imgCostadoIzquierdaVehiculo != null) {
                        objImage = bin2string(imgCostadoIzquierdaVehiculo);
                        image_64 = btoa(objImage);
                        previewIzquierda.src = "data:image/jpg;base64," + image_64; 
                        imgCostadoIzquierdaVehiculo = previewIzquierda.src;
                        document.getElementById("chkCostadoIzquierdoVehiculo").disabled = false;
                    }
                    else {
                        document.getElementById("chkCostadoIzquierdoVehiculo").disabled = true;
                    }
                  
                    imgCostadoDerechoVehiculo = result.Data[0].DerechaVehiculos;
                    if (imgCostadoDerechoVehiculo != null) {
                        objImage = bin2string(imgCostadoDerechoVehiculo);
                        image_64 = btoa(objImage);
                        previewDerecha.src = "data:image/jpg;base64," + image_64; 
                        imgCostadoDerechoVehiculo = previewDerecha.src;
                        document.getElementById("chkCostadoDerechoVehiculo").disabled = false;
                    }
                    else {
                        document.getElementById("chkCostadoDerechoVehiculo").disabled = true;
                    }
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

    var fnTerminarContrato = function (e) {
        


        var realDataVehiculoF = document.getElementById("chkFrontalVehiculo").checked == true ? fnBlock(imgFrontalVehiculo) : null;
        var realDataVehiculoT = document.getElementById("chkTraseraVehiculo").checked == true ? fnBlock(imgTraseraVehiculo) : null;
        var realDataVehiculoI = document.getElementById("chkCostadoIzquierdoVehiculo").checked == true ? fnBlock(imgCostadoIzquierdaVehiculo) : null;
        var realDataVehiculoD = document.getElementById("chkCostadoDerechoVehiculo").checked == true ? fnBlock(imgCostadoDerechoVehiculo) : null;



        var oData = {
            "UsuarioCreacion": usuarioLogueado,
            "IDContrato": IDContrato,
            "NumeroContrato": txtNumeroContrato.val(),
            "IDVehiculo": txtIDVehiculo.val(),
            "SurfRacks": txtSurfRacks.val() == 'Si' ? true : false,
            "Cajon": txtCajon.val() == 'Si' ? true : false,
            "RtvSticker": txtRtvSticker.val() == 'Si' ? true : false,
            "RtvPapel": txtRtvPapel.val() == 'Si' ? true : false,
            "MarchamoSticker": txtMarchamoSticker.val() == 'Si' ? true : false,
            "MarchamoPapel": txtMarchamoPapel.val() == 'Si' ? true : false,
            "StickerPlaca": txtPlacaSticker.val() == 'Si' ? true : false,
            "TituloPropiedad": txtTituloPropiedad.val() == 'Si' ? true : false,
            "FrontalVehiculos": realDataVehiculoF,
            "TraseraVehiculos": realDataVehiculoT,
            "IzquierdaVehiculos": realDataVehiculoI,
            "DerechaVehiculos": realDataVehiculoD
        }
        try {
            var oUrl = 'Contratos/TerminarContrato';
            var oProcessMessage = 'Guardando Contrato';

            var success = function (result) {
                if (result.MessageType == "Success") {
                    Dialog.alert('Contrato', result.InfoMessage, function (e) {
                        window.location.reload();
                    })
                }
                else {
                    Dialog.alert('Contrato', result.ErrorMessage, function () {
                    })
                }
            };
            app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
        } catch (ex) {

            retorno = false;
        }
    };

    $(function () {
        fnInit();
    });
}();