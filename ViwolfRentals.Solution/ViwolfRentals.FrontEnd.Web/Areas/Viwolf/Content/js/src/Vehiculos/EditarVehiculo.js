


var editarVehiculo = function () {
    var modalVehiculo = $('#popupEditVehiculo');
    var idVehiculo = $('#txtPlacaVehiculoEdicion');
    var marca = $('#txtMarcaVehiculoEdicion');
    var modelo = $('#txtModeloVehiculoEdicion');
    var anno = $('#txtAnnoVehiculoEdicion');
    var Gps = $("#txtGpsEdicion");
    var fechaCompra = $('#txtFechaCompraEdicion');
    var chasis = $('#txtNumeroChasisEdicion');
    var motor = $('#txtNumeroMotorEdicion');
    var Color = $("#txtColorEdicion");
    var Transmision = $("#txtTransmisionEdicion");
    var Cilindraje = $("#txtCilindrajeEdicion");
    var Peso = $("#txtPesoEdicion");
    var Carroceria = $("#txtCarroceriaEdicion");
    var Traccion = $("#txtTraccionEdicion");
    var Capacidad = $("#txtCapacidadEdicion");
    var txtCategoriaEdicion = $("#txtCategoriaEdicion");

    var rtvVencimientoAnno = $('#txtRtvVencimientoAnnoEdicion');
    var rtvVencimientoMes = $('#txtRtvVencimientoMesEdicion');
    var marchamoProximo = $('#txtMarchamoProximoEdicion');
    var rtvSticker = $('#txtRtvStickerEdicion');
    var rtvPapel = $('#txtRtvPapelEdicion');
    var marchamoSticker = $('#txtMarchamoStickerEdicion');
    var marchamoPapel = $('#txtMarchamoPapelEdicion');
    var stickerPlaca = $('#txtPlacaStickerEdicion');
    var tituloPropiedad = $('#txtTituloPropiedadEdicion');
    var multas = $('#txtMultasEdicion');
    var Kilometraje = $('#txtKilometrajeEdicion');
    var CodigoColor = $("#txtCodigoColorEdicion");
    var Departamento = $("#txtDepartamentoEdicion");
    var Estado = $("#txtEstadoEdicion");

    var btnGuardarVehiculo = $("#btnEditarVehiculo");
    var dateCompra = "";
    var IdCategoriaVehiculo = 0;
    var IdDepartamento = 0;
    var fnCallBack = null;
    var objetoVehiculo = null;

    //var InitSelect = function () {
    //    debugger;
        


    //    cargarSelect2(txtCategoriaEdicion,
    //        {
    //            PlaceHolder: "Seleccione una categoria",
    //            Url: "Vehiculos/ListarCategoriasVehiculos",
    //            DataType: 'json',
    //            Type: "POST",
    //            Id: "IDCategoriaVehiculo",
    //            Text: "NombreCategoriaVehiculo",
    //            InitSelection: function (callback, configuracion) {
    //                $.ajax(configuracion.Url, {
    //                    url: configuracion.Url,
    //                    data: configuracion.data,
    //                    dataType: 'json',
    //                    type: 'POST'
    //                }).done(function () {

    //                });
    //            },

    //        });

    //    cargarSelect2(Departamento,
    //        {
    //            PlaceHolder: "Seleccione un departamento",
    //            Url: "Departamentos/ListarDepartamentosVehiculos",
    //            DataType: 'json',
    //            Type: "POST",
    //            Id: "IDDepartamento",
    //            Text: "NombreDepartamento",
    //            InitSelection: function (callback, configuracion) {
    //                $.ajax(configuracion.Url, {
    //                    url: configuracion.Url,
    //                    data: configuracion.data,
    //                    dataType: 'json',
    //                    type: 'POST'
    //                }).done(function () {

    //                });
    //            },

    //        });
    //};

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

    var fnInit = function (objV, idvehiculo, callback) {
        objetoVehiculo = objV;
        $('#closemodal').click(function () {
            var select = document.getElementById("txtCategoriaEdicion");
            var length = select.options.length;
            for (i = length - 1; i >= 0; i--) {
                select.options[i] = null;
            }
            modalVehiculo.modal('hide');
        });
        fnCallBack = callback
        fnCargarFecha();
        anno.unbind('keypress', valideKey);
        rtvVencimientoAnno.unbind('keypress', valideKey);
        marchamoProximo.unbind('keypress', valideKey);
        Peso.unbind('keypress', valideKey);
        Kilometraje.unbind('keypress', valideKey);
        multas.unbind('keypress', valideKey);
        Capacidad.unbind('keypress', valideKey);
        Cilindraje.unbind('keypress', valideKey);
        multas.blur(function () {
            txtMultas.val(utils.formatterDolar.format(txtMultas.val()));
            txtMultas.val(txtMultas.val().replace("$", "¢"));
        });
        btnGuardarVehiculo.unbind().click(fnConfirmarGuardar);     
        fnCargarVehiculo(objV);
        modalVehiculo.modal('show');


        cargarSelect2(txtCategoriaEdicion,
            {
                PlaceHolder: "Seleccione una categoria",
                Url: "Vehiculos/ListarCategoriasVehiculos",
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

        cargarSelect2(Departamento,
            {
                PlaceHolder: "Seleccione un departamento",
                Url: "Departamentos/ListarDepartamentosVehiculos",
                DataType: 'json',
                Type: "POST",
                Id: "IDDepartamento",
                Text: "NombreDepartamento",
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

    //var fnBuscarVehiculo = function (id) {
    //    var oData = {
    //        "IDVehiculo": id
    //    }

    //    try {
    //        var oUrl = 'Vehiculos/ListarVehiculos';
    //        var oProcessMessage = 'Buscando vehiculo';

    //        var success = function (result) {

    //            if (result.Data.length > 0) {
                    
    //               var objVehiculo = result.Data[0];
                   
    //               fnCargarVehiculo(objVehiculo); 
    //            }
    //        };
    //        app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
    //    } catch (ex) {

    //        retorno = false;
    //    }
    //};

    function selectElementDefault(id, valueToSelect) {
        let element = document.getElementById(id);
        element.value = valueToSelect;
    }

    var fnCargarVehiculo = function (result) {
        debugger;
        idVehiculo.val(result.IDVehiculo == null ? "" : result.IDVehiculo);
        marca.val(result.Marca == null ? "" : result.Marca);
        modelo.val(result.Modelo == null ? "" : result.Modelo);
        anno.val(result.Anno == null ? "" : result.Anno);
       
        Gps.val(result.GPS ==  "Sí" ? 1 : 0);
        fechaCompra.val(result.FechaCompra == null ? "" : result.FechaCompra);
        chasis.val(result.NumeroChasis == null ? "" : result.NumeroChasis);
        motor.val(result.NumeroMotor == null ? "" : result.NumeroMotor);
        Color.val(result.Color == null ? "" : result.Color);
        Transmision.val(result.Transmision == null ? "" : result.Transmision);
        Cilindraje.val(result.NumeroCilindros == null ? "" : result.NumeroCilindros);
        Peso.val(result.PesoKg == null ? "" : result.PesoKg);
        Carroceria.val(result.Carroceria == null ? "" : result.Carroceria);
        Traccion.val(result.Traccion == null ? "" : result.Traccion);
        Capacidad.val(result.Capacidad == null ? "" : result.Capacidad);

        rtvVencimientoAnno.val(result.RtvVencimientoAnno == null ? "" : result.RtvVencimientoAnno);
        rtvVencimientoMes.val(result.RtvVencimientoMes == null ? "" : result.RtvVencimientoMes);
        marchamoProximo.val(result.MarchamoProximo == null ? "" : result.MarchamoProximo);
       
        rtvSticker.val(result.RtvSticker == "Sí" ? 1 : 0);
        rtvPapel.val(result.RtvPapel ==  "Sí" ? 1 : 0);
        marchamoSticker.val(result.MarchamoSticker == "Sí" ? 1 : 0);
        marchamoPapel.val(result.MarchamoPapel == "Sí" ? 1 : 0);
        stickerPlaca.val(result.StickerPlaca == "Sí" ? 1 : 0);
        tituloPropiedad.val(result.TituloPropiedad ==  "Sí" ? 1 : 0);
        multas.val(result.Multas == null ? utils.formatterColon.format(0) : utils.formatterColon.format(result.Multas));
     
        multas.val().replace("$", "¢");
        Kilometraje.val(result.Kilometraje == null ? "" : result.Kilometraje);
        CodigoColor.val(result.CodigoColor == null ? "" : result.CodigoColor);
        Estado.val(result.Activo == null ? "" : result.Activo);
       
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

                selectElementDefault('txtCategoriaEdicion', objetoVehiculo.t_CategoriasVehiculos.IDCategoriaVehiculo);
                selectElementDefault('txtDepartamentoEdicion', objetoVehiculo.t_Departamentos.IDDepartamento); //result.t_CategoriasVehiculos.IDCategoriaVehiculo); 

            },
            error: function (msg) {
                $("#dvAlerta > span").text("Error al llenar el combo");
            }
        });


    };

    var ValidateFields = function () {
        var check = true;
        if (idVehiculo.val() == "") {
            Dialog.alert('Creacion Vehiculos', "El campo placa del vehiculo, no puede estar vacío.", function () {
            })
            check = false;
        }
        else
            if (marca.val() == "") {
                Dialog.alert('Creacion Vehiculos', "El campo marca del vehiculo, no puede estar vacío.", function () {
                })
                check = false;
            }
            else
                if (modelo.val() == "") {
                    Dialog.alert('Creacion Vehiculos', "El campo modelo del vehiculo, no puede estar vacío.", function () {
                    })
                    check = false;
                }
                else
                    if (anno.val() == "") {
                        Dialog.alert('Creacion Vehiculos', "El campo año del vehiculo, no puede estar vacío.", function () {
                        })
                        check = false;
                    }
                    else
                        if (chasis.val() == "") {
                            Dialog.alert('Creacion Vehiculos', "El campo número de chasis, no puede estar vacío.", function () {
                            })
                            check = false;
                        }
                        else
                            if (motor.val() == "") {
                                Dialog.alert('Creacion Vehiculos', "El campo número de motor, no puede estar vacío.", function () {
                                })
                                check = false;
                            }
                            else
                                if (Color.val() == "") {
                                    Dialog.alert('Creacion Vehiculos', "El campo color, no puede estar vacío.", function () {
                                    })
                                    check = false;
                                }
                                else
                                    if (Transmision.val() == "") {
                                        Dialog.alert('Creacion Vehiculos', "El campo transmision, no puede estar vacío.", function () {
                                        })
                                        check = false;
                                    }
                                    else
                                        if (Cilindraje.val() == "") {
                                            Dialog.alert('Creacion Vehiculos', "El campo número de cilindros, no puede estar vacío, ni puede ser 0.", function () {
                                            })

                                            check = false;
                                        }
                                        else
                                            if (Peso.val() == "") {
                                                Dialog.alert('Creacion Vehiculos', "El campo peso, no puede estar vacío.", function () {
                                                })
                                                check = false;
                                            }
                                            else
                                                if (Carroceria.val() == "") {
                                                    Dialog.alert('Creacion Vehiculos', "El campo carrocería, no puede estar vacío.", function () {
                                                    })
                                                    check = false;
                                                }
                                                else
                                                    if (Traccion.val() == "") {
                                                        Dialog.alert('Creacion Vehiculos', "El campo tracción, no puede estar vacío.", function () {
                                                        })
                                                        check = false;
                                                    }
                                                    else
                                                        if (Capacidad.val() == "") {
                                                            Dialog.alert('Creacion Vehiculos', "El campo capacidad, no puede estar vacío.", function () {
                                                            })
                                                            check = false;
                                                        }
                                                        else
                                                            if (IdCategoriaVehiculo == 0) {
                                                                Dialog.alert('Creacion Vehiculos', "Debe seleccionar una categoría para el vehiculo.", function () {
                                                                })
                                                                check = false;
                                                            }
                                                            else
                                                                if (IdDepartamento == 0) {
                                                                    Dialog.alert('Edicion Vehiculos', "Debe seleccionar una departamento para el vehiculo.", function () {
                                                                    })
                                                                    check = false;
                                                                }
                                                             if (IdCategoriaVehiculo == 0) {
                                                                Dialog.alert('Creacion Vehiculos', "Debe seleccionar una categoría para el vehiculo.", function () {
                                                                })
                                                                check = false;
                                                            }
                                                            else
                                                                if (rtvVencimientoAnno.val() == "") {
                                                                    Dialog.alert('Creacion Vehiculos', "El campo rtv vencimiento año, no puede estar vacío.", function () {
                                                                    })

                                                                    check = false;
                                                                }
                                                                else
                                                                    if (rtvVencimientoMes.val() == "") {
                                                                        Dialog.alert('Creacion Vehiculos', "El campo rtv vencimiento mes, no puede estar vacío.", function () {
                                                                        })
                                                                        check = false;
                                                                    }
                                                                    else
                                                                        if (marchamoProximo.val() == "") {
                                                                            Dialog.alert('Creacion Vehiculos', "El campo marchamo próximo, no puede estar vacío.", function () {
                                                                            })

                                                                            check = false;
                                                                        }
                                                                        else
                                                                            if (multas.val() == "") {
                                                                                Dialog.alert('Creacion Vehiculos', "El campo multas, no puede estar vacío.", function () {
                                                                                })

                                                                                check = false;
                                                                            }
                                                                            else
                                                                                if (Kilometraje.val() == "") {
                                                                                    Dialog.alert('Creacion Vehiculos', "El campo kilometraje, no puede estar vacío.", function () {
                                                                                    })

                                                                                    check = false;
                                                                                }
                                                                                else
                                                                                    check = true;
        return check;
    };

    var fnCargarFecha = function () {
        fechaCompra.datepicker("destroy");
        fechaCompra.datepicker({
            autoclose: true,
            dateFormat: "dd/mm/yy",
            onSelect: function (selected) {
                dateCompra = new Date(selected);
            },
            //minDate: '-500D',
            maxDate: '+500D'
        });
    };

    var fnConfirmarGuardar = function () {
        Dialog.confirm('Edicion Vehiculos', "Desea actualizar el Vehiculo?", function (respuesta) {
            if (respuesta == true)
                fnGuardarVehiculo();
            else
                modalVehiculo.modal('hide');
        })
    };

    var fnGuardarVehiculo = function () {
        var categoria = document.getElementById("txtCategoriaEdicion");
        IdCategoriaVehiculo = categoria == null ? IdCategoriaVehiculo : categoria.options[categoria.selectedIndex].value;

        var departamento = document.getElementById("txtDepartamentoEdicion");
        IdDepartamento = departamento == null ? IdDepartamento : departamento.options[departamento.selectedIndex].value;

        var nombreColor = $("#txtCodigoColorEdicion option:selected").text();

        debugger;
      
        if (ValidateFields() == true) {

            var oData = {
                "UsuarioCreacion": usuarioLogueado,
                "UsuarioModificacion": usuarioLogueado,
                "IdVehiculo": idVehiculo.val(),
                "Marca": marca.val(),
                "Modelo": modelo.val(),
                "Anno": anno.val(),
                "GPS": Gps.val() == 1 ? true : false,
                "FechaCompra": fechaCompra.val() == "" ? null : dateCompra,
                "NumeroChasis": chasis.val(),
                "NumeroMotor": motor.val(),
                "Color": Color.val(),
                "Transmision": Transmision.val(),
                "NumeroCilindros": Cilindraje.val(),
                "PesoKg": Peso.val(),
                "Carroceria": Carroceria.val(),
                "Traccion": Traccion.val(),
                "Capacidad": Capacidad.val(),
                "RtvVencimientoAnno": rtvVencimientoAnno.val(),
                "RtvVencimientoMes": rtvVencimientoMes.val(),
                "MarchamoProximo": marchamoProximo.val(),
                "RtvSticker": rtvSticker.val() == 'Sí' ? true : false,
                "RtvPapel": rtvPapel.val() == 'Sí' ? true : false,
                "MarchamoSticker": marchamoSticker.val() == 'Sí' ? true : false,
                "MarchamoPapel": marchamoPapel.val() == 'Sí' ? true : false,
                "StickerPlaca": stickerPlaca.val() == 'Sí' ? true : false,
                "TituloPropiedad": tituloPropiedad.val() == 'Sí' ? true : false,
                "Multas": parseFloat(multas.val().replace("¢", "")),
                "Kilometraje": Kilometraje.val(),
                "IDCategoriaVehiculo": parseInt(IdCategoriaVehiculo),
                "CodigoColor": CodigoColor.val(),
                "ColorClasificacion": nombreColor,
                "IDDepartamento": parseInt(IdDepartamento),
                "Activo": Estado.val() == 1 ? true : false
            }
            try {
                var oUrl = 'Vehiculos/GuardarVehiculo';
                var oProcessMessage = 'Guardando Vehiculo';

                var success = function (result) {
                    if (result.MessageType == "Success") {
                        modalVehiculo.modal('hide');
                        fnCallBack(result);
                    }
                    else {
                        Dialog.alert('Creacion Vehiculos', result.ErrorMessage, function () {
                        })
                    }
                };
                app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
            } catch (ex) {

                retorno = false;
            }

        }
    };

    var fnAbrirModal = function (objV, idVehiculo, callback) {
        //InitSelect();
        fnInit(objV, idVehiculo, callback);
    };

    return {
        AbrirModal: fnAbrirModal
    }
}();