var cracionVehiculos = function () {
    var txtPlacaVehiculo = $("#txtPlacaVehiculo");
    var txtMarcaVehiculo = $("#txtMarcaVehiculo");
    var txtModeloVehiculo = $("#txtModeloVehiculo");
    var txtAnnoVehiculo = $("#txtAnnoVehiculo");
    var txtGps = $("#txtGps");
    var txtFechaCompra = $("#txtFechaCompra");
    var txtNumeroChasis = $("#txtNumeroChasis");
    var txtNumeroMotor = $("#txtNumeroMotor");
    var txtColor = $("#txtColor");
    var txtTransmision = $("#txtTransmision");
    var txtCilindraje = $("#txtCilindraje");
    var txtPeso = $("#txtPeso");
    var txtCarroceria = $("#txtCarroceria");
    var txtTraccion = $("#txtTraccion");
    var txtCapacidad = $("#txtCapacidad");
    var txtCategoria = $("#txtCategoria");
    var txtRtvVencimientoAnno = $("#txtRtvVencimientoAnno");
    var txtRtvVencimientoMes = $("#txtRtvVencimientoMes");
    var txtRtvSticker = $("#txtRtvSticker");
    var txtRtvPapel = $("#txtRtvPapel");
    var txtMarchamoProximo = $("#txtMarchamoProximo");
    var txtMarchamoSticker = $("#txtMarchamoSticker");
    var txtMarchamoPapel = $("#txtMarchamoPapel");
    var txtPlacaSticker = $("#txtPlacaSticker");
    var txtTituloPropiedad = $("#txtTituloPropiedad");
    var txtMultas = $("#txtMultas");
    var btnGuardarVehiculo = ("#btnGuardarVehiculo");

    var InitSelect = function () {

        cargarSelect2(txtCategoria,
            {
                PlaceHolder: "",
                Url: "Categorias/ListarCategorias",
                DataType: 'json',
                Type: "POST",
                Id: "IDCategoriaVehiculo",
                Text: "NombreCategoriaVehiculo",
                InitSelection: function (callback, configuracion) {
                    $.ajax(configuracion.Url, {
                        url: configuracion.Url,
                        data: configuracion.data,
                        dataType: 'json',
                        type: 'POST'
                    }).done(function () {

                    });
                },

            });

    function valideKey(evt) {
        var code = evt.which ? evt.which : evt.keyCode;
        if (code == 8) {
            //backspace
            return true;
        } else if (code >= 48 && code <= 57) {
            //is a number
            return true;
        } else {
            return false;
        }

    }

    var fnCargarFecha = function () {
        txtFechaCompra.datepicker("destroy");
        
        txtFechaCompra.datepicker({
            autoclose: true,
            format: "mm/dd/yyyy",
            minDate: '-500D',
            maxDate: '+500D'
        });

    };

    var cargarSelect2 = function (elemento, configuracion) {

        $.ajax({
            type: "POST",
            url: configuracion.Url,
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {

                $(msg.Data).each(function (serverData) {
                    if (configuracion.SuccessFunction) {
                        configuracion.SuccessFunction(serverData);
                    }
                    var option = $(document.createElement('option'));

                    option.text(this[configuracion.Text]);
                    option.val(this[configuracion.Id]);



                    elemento.append(option);
                });

            },
            error: function (msg) {
                $("#dvAlerta > span").text("Error al llenar el combo");
            }
        });


    };

    var fnInit = function () {
        fnCargarFecha();
        btnGuardarVehiculo.click(fnGuardarReservacion);


    };

    var fnGuardarReservacion = function () {


        var proveedor = document.getElementById("txtProveedor");
        IdProveedor = proveedor.options[proveedor.selectedIndex].value;

        var comisionista = document.getElementById("txtComisionistas");
        IdComisionista = comisionista.options[comisionista.selectedIndex].value;

        //if (ValidateFields() == true) {

            var oData = {
                "UsuarioCreacion": usuarioLogueado,
                "IdVehiculo": txtPlaca.val(),
                "Marca": txtMarcaVehiculo.val(),
                "Modelo": txtModeloVehiculo.val(),
                "Anno": txtAnnoVehiculo.val,
                "GPS": txtGps.val(),
                "FechaCompra": txtFechaCompra.val(),
                "NumeroChasis": txtNumeroChasis.val(),
                "NumeroMotor": txtNumeroMotor.val(),
                "Color": txtColor.val(),
                "Transmision": txtTransmision.val(),
                "NumeroCilindros": txtCilindraje.val(),
                "PesoKg": txtPeso.val(),
                "Carroceria": txtCarroceria.val(),
                "Traccion": txtTraccion.val(),
                "Capacidad": txtCapacidad.val(),
                "RtvVencimientoAnno": txtRtvVencimientoAnno.val(),
                "RtvVencimientoMes": txtRtvVencimientoMes.val(),
                "MarchamoProximo": txtMarchamoProximo.val(),
                "RtvSticker": txtRtvSticker.val() == 'Si' ? true : false,
                "RtvPapel": txtRtvPapel.val() == 'Si' ? true : false,
                "MarchamoSticker": txtMarchamoSticker.val() == 'Si' ? true : false,
                "MarchamoPapel": txtMarchamoPapel.val() == 'Si' ? true : false,
                "StickerPlaca": txtPlacaSticker.val() == 'Si' ? true : false,
                "TituloPropiedad": txtTituloPropiedad.val() == 'Si' ? true : false,
                "Multas": txtMultas.val(),
                "IDCategoriaVehiculo": txtCategoria.val(),
                "IDDepartamento": 1,
                "Activo": true
            }
            try {
                var oUrl = 'Vehiculos/GuardarVehiculo';
                var oProcessMessage = 'Guardando Vehiculo';

                var success = function (result) {
                    if (result.MessageType == "Success") {
                        alert("Reservacion creada con exito");
                        fnLimpiarDatos();
                    }
                };
                app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
            } catch (ex) {

                retorno = false;
            }

        //}
    };

    $(function () {
        fnInit(); 
    });

}();