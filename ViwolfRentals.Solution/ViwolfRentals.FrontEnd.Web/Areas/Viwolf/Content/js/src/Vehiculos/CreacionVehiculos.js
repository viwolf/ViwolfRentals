﻿var cracionVehiculos = function () {
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
    var txtKilometraje = $("#txtKilometraje");
    var btnGuardarVehiculo = $("#btnGuardarVehiculo");
    var IdCategoriaVehiculo = 0;
    var dateCompra = "";

    var InitSelect = function () {

        cargarSelect2(txtCategoria,
            {
                PlaceHolder: "",
                Url: "ListarCategoriasVehiculos",
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
    };

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

    var ValidateFields = function () {
        var check = true;



        if (txtPlacaVehiculo.val() == "") {
            alert("El campo placa del vehiculo, no puede estar vacío.");
            check = false;
        }
        else
            if (txtMarcaVehiculo.val() == "") {
                alert("El campo marca del vehiculo, no puede estar vacío.");
                check = false;
            }
            else
                if (txtModeloVehiculo.val() == "") {
                    alert("El campo modelo del vehiculo, no puede estar vacío.");
                    check = false;
                }
                else
                    if (txtAnnoVehiculo.val() == "") {
                        alert("El campo año del vehiculo, no puede estar vacío.");
                        check = false;
                    }
                    else
                        if (txtNumeroChasis.val() == "") {
                            alert("El campo número de chasis, no puede estar vacío.");
                            check = false;
                        }
                        else
                            if (txtNumeroMotor.val() == "") {
                                alert("El campo número de motor, no puede estar vacío.");
                                check = false;
                            }
                            else
                                if (txtColor.val() == "") {
                                    alert("El campo color, no puede estar vacío.");
                                    check = false;
                                }
                                else
                                    if (txtTransmision.val() == "") {
                                        alert("El campo transmision, no puede estar vacío.");
                                        check = false;
                                    }
                                    else
                                        if (txtCilindraje.val() == "") {
                                            alert("El campo número de cilindros, no puede estar vacío, ni puede ser 0.");
                                            check = false;
                                        }
                                        else
                                            if (txtPeso.val() == "") {
                                                alert("El campo peso, no puede estar vacío.");
                                                check = false;
                                            }
                                            else
                                                if (txtCarroceria.val() == "")  {
                                                    alert("El campo carrocería, no puede estar vacío.");
                                                    check = false;
                                                }
                                                else
                                                    if (txtTraccion.val() == "") {
                                                        alert("El campo tracción, no puede estar vacío.");
                                                        check = false;
                                                    }
                                                    else
                                                        if (txtCapacidad.val() == "") {
                                                            alert("El campo capacidad, no puede estar vacío.");
                                                            check = false;
                                                        }
                                                        else
                                                            if (IdCategoriaVehiculo = 0) {
                                                                alert("Debe seleccionar una categoría para el vehiculo.");
                                                                check = false;
                                                            }
                                                            else
                                                                if (txtRtvVencimientoAnno.val() == "") {
                                                                    alert("El campo rtv vencimiento año, no puede estar vacío.");
                                                                    check = false;
                                                                }
                                                                else
                                                                    if (txtRtvVencimientoMes.val() == "") {
                                                                        alert("El campo rtv vencimiento mes, no puede estar vacío.");
                                                                        check = false;
                                                                    }
                                                                    else
                                                                        if (txtMarchamoProximo.val() == "") {
                                                                            alert("El campo marchamo próximo, no puede estar vacío.");
                                                                            check = false;
                                                                        }
                                                                        else
                                                                            if (txtMultas.val() == "")  {
                                                                                alert("El campo multas, no puede estar vacío.");
                                                                                check = false;
                                                                            }
                                                                            else
                                                                                if (txtKilometraje.val() == "") {
                                                                                    alert("El campo kilometraje, no puede estar vacío.");
                                                                                    check = false;
                                                                                }
                                                                                else
                                                                                    check = true;
        return check;
    };


    var fnCargarFecha = function () {
        txtFechaCompra.datepicker("destroy");
        
        txtFechaCompra.datepicker({
            autoclose: true,
            format: "mm/dd/yyyy",
            onSelect: function (selected) {
                dateCompra = new Date(selected);
            },
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
        txtAnnoVehiculo.bind('keypress', valideKey);
        txtRtvVencimientoAnno.bind('keypress', valideKey);
        txtMarchamoProximo.bind('keypress', valideKey);
        txtPeso.bind('keypress', valideKey);
        txtKilometraje.bind('keypress', valideKey);
        txtMultas.bind('keypress', valideKey);
        txtCapacidad.bind('keypress', valideKey);
        txtCilindraje.bind('keypress', valideKey);
        txtMultas.blur(function () {
            
            txtMultas.val(utils.formatterDolar.format(txtMultas.val()));
            txtMultas.val(txtMultas.val().replace("$", "¢"));
        });
        btnGuardarVehiculo.click(fnGuardarReservacion);
    };

    var fnGuardarReservacion = function () {


        var categoria = document.getElementById("txtCategoria");
        IdCategoriaVehiculo = categoria.options[categoria.selectedIndex].value;

      

        if (ValidateFields() == true) {

            var oData = {
                "UsuarioCreacion": usuarioLogueado,
                "IdVehiculo": txtPlacaVehiculo.val(),
                "Marca": txtMarcaVehiculo.val(),
                "Modelo": txtModeloVehiculo.val(),
                "Anno": txtAnnoVehiculo.val(),
                "GPS": txtGps.val() == 'Si' ? true : false,
                "FechaCompra": txtFechaCompra.val() == "" ? null : dateCompra,
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
                "Multas": parseFloat(txtMultas.val().replace("¢", "")),
                "Kilometraje": txtKilometraje.val(),
                "IDCategoriaVehiculo": txtCategoria.val(),
                "IDDepartamento": 1,
                "Activo": true
            }
            try {
                var oUrl = 'GuardarVehiculo';
                var oProcessMessage = 'Guardando Vehiculo';

                var success = function (result) {
                    if (result.MessageType == "Success") {
                        alert("Vehiculo creado con exito");
                        fnLimpiarDatos();
                    }
                };
                app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
            } catch (ex) {

                retorno = false;
            }

        }
    };

    var fnLimpiarDatos = function () {
        txtPlacaVehiculo.val("");
         txtMarcaVehiculo.val(""); 
         txtModeloVehiculo.val(""); 
         txtAnnoVehiculo.val(""); 
         txtGps.val(""); 
         txtFechaCompra.val(""); 
         txtNumeroChasis.val(""); 
         txtNumeroMotor.val(""); 
         txtColor.val(""); 
         txtTransmision.val(""); 
         txtCilindraje.val(""); 
         txtPeso.val(""); 
         txtCarroceria.val(""); 
         txtTraccion.val(""); 
         txtCapacidad.val(""); 
         txtCategoria.val(""); 
         txtRtvVencimientoAnno.val(""); 
         txtRtvVencimientoMes.val(""); 
         txtRtvSticker.val(""); 
         txtRtvPapel.val(""); 
         txtMarchamoProximo.val(""); 
         txtMarchamoSticker.val(""); 
         txtMarchamoPapel.val(""); 
         txtPlacaSticker.val(""); 
         txtTituloPropiedad.val(""); 
         txtMultas.val(""); 
         txtKilometraje.val(""); 
         IdCategoriaVehiculo = 0;
         dateCompra = "";
    }

    $(function () {
        fnInit(); 
        InitSelect();
    });

}();