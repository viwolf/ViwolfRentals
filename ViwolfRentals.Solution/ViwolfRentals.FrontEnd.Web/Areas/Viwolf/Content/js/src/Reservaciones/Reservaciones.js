var reservaciones = function () {
    var txtNombreCliente = $("#txtNombreCliente");
    var txtIdentificacionCliente = $('#txtIdentificacionCliente');
    var txtNacionalidadCliente = $('#txtNacionalidadCliente');
    var txtProfesionCliente = $('#txtProfesionCliente');
    var txtHospedaje = $("#txtHospedaje");
    var txtAplicaComision = $("#txtAplicaComision");
    var txtSurfRacks = $("#txtSurfRacks");
    var txtMontoSurfRacks = $("#txtMontoSurfRacks");
    var txtCajon = $("#txtCajon");
    var txtMontoDia = $("#txtMontoDia");
    var txtMontoTotal = $("#txtMontoTotal");
    var txtAplicaPagoAdelantado = $("#txtAplicaPagoAdelantado");
    var txtNumeroDeposito = $("#txtNumeroDeposito");
    var txtMontoDeposito = $("#txtMontoDeposito");
    var txtSaldoActual = $("#txtSaldoActual");
    var txtUsuario = $("#txtUsuario");
    var txtModoPago = $("#txtModoPago");
    var txtComisionistas = $("#txtComisionistas");
    var txtProveedor = $("#txtProveedor");
    var txtPlaca = $("#txtPlaca");
    var txtFechaInicio = $("#txtFechaInicio");
    var txtHoraInicio = $("#txtHoraInicio")
    var txtFechaFinal = $("#txtFechaFinal");
    var txtHoraEntrega = $("#txtHoraEntrega")
    var btnGuardar = $("#btnGuardar");
    var btnCargarVehiculo = $("#btnCargarVehiculo");
    var IdProveedor = 0; 
    var IdComisionista = 0; 
    var cantidadDias = 0;
    var timeIn = 0;
    var timeOut = 0;
    var checkValidaAdm = false;
   
    var dateIni = new Date();
    var dateFin = new Date();

       
    var calcularTarifaTotal = function () {
      

        if ((txtFechaInicio.val() != "") && (txtHoraInicio.val()) && (txtFechaFinal.val()) && (txtHoraEntrega.val())) {
          
            //var now = moment(timeIn); //todays date
            //var end = moment(timeOut); // another date
            //var duration = moment.duration(end.diff(now));
            //var horasTranscurridas = duration.asHours();


            if (checkValidaAdm == false)
                txtMontoDia.val("");

            var montoDia = txtMontoDia.val() == '' ? 0 : parseFloat(txtMontoDia.val().replace("$", ""));
            var montoSurfRacks = txtMontoSurfRacks.val() == '' ? 0 : parseFloat(txtMontoSurfRacks.val().replace("$", ""));
            var montoTotal = 0;

          

            if (timeIn >= timeOut) {
                cantidadDias == 0 ? 1 : cantidadDias - 1;
                montoTotal = ((montoDia * (cantidadDias)) + montoSurfRacks);
            } else {
                montoTotal = ((montoDia * (cantidadDias + 1)) + montoSurfRacks);
            }



            txtMontoDia.val(utils.formatterDolar.format(montoDia));
            txtMontoTotal.val(utils.formatterDolar.format(montoTotal));
        }
    };
    
    var InitSelect = function () {
       
        cargarSelect2(txtProveedor,
            {
                PlaceHolder: "",
                Url: "Proveedores/ListarProveedores",
                DataType: 'json',
                Type: "POST",
                Id: "IdProveedor",
                Text: "NombreProveedor",
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


      

        cargarSelect2(txtComisionistas,
            {
                PlaceHolder: "",
                Url: "Comisionistas/ListarComisionistas",
                DataType: 'json',
                Type: "POST",
                Id: "IDClienteComisionista",
                Text: "NombreClienteComisionista",
                InitSelection: function (callback, configuracion) {
                    $.ajax(configuracion.Url, {
                        url: configuracion.Url,
                        data: configuracion.data, 
                        dataType: 'json',
                        type: 'POST'
                    }).done(function (data) {
                       
                    });
                },
               
            });

       
    };

    var fnConfirmarGuardar = function () {
       
        Dialog.confirm('Reservaciones', "Desea guardar la reservacion?", function (respuesta) {
           
            if (respuesta == true)
                fnGuardarReservacion();
        })
    };

    var Init = function () {

        fnCargaFechas();

        fnLimpiarDatos();

        txtAplicaComision.change(cambiarEstadoAplicaComision);

        
       

        txtMontoSurfRacks.bind('keypress', valideKey);

        txtMontoSurfRacks.blur(function () {
            txtMontoSurfRacks.val(utils.formatterDolar.format(parseFloat(txtMontoSurfRacks.val().replace("$", ""))));
            calcularTarifaTotal();
        });

        txtMontoDia.bind('keypress', valideKey);

        txtMontoDia.blur(function () {
            if (txtMontoDia.val() != "") {
                if (txtMontoDia.val() < 50) {
                    
                    if (sessionStorage.getItem('IdRol') != configViwolf.Roles.Administrador) {
                        checkValidaAdm = false;
                        Dialog.confirm('Reservaciones', "Desea autorizar el monto menor a $50?", function (respuesta) {
                            if (respuesta == true) {
                                autorizacionLogin.AbrirModal(fnCallBackAutorizar);
                            }
                            else {
                                txtMontoDia.val("");
                                txtMontoTotal.val("");
                            }
                        })
                    }
                    else {
                        checkValidaAdm = true;
                        calcularTarifaTotal();
                    }
                }
                else {
                    checkValidaAdm = true;
                    calcularTarifaTotal();
                }
            }
            
        })

    
        txtNumeroDeposito.bind('keypress', valideKey);
        txtNumeroDeposito.blur(function (){
            txtMontoDeposito.val(utils.formatterDolar.format(0));
            txtSaldoActual.val(utils.formatterDolar.format(0));
        });

        txtMontoDeposito.bind('keypress', valideKey);
        txtMontoDeposito.blur(function () {
            if ((txtNumeroDeposito.val() != "") || (txtNumeroDeposito.val() != "0")) {
                txtMontoDeposito.val(utils.formatterDolar.format(parseFloat(txtMontoDeposito.val().replace("$", ""))));
                var saldo = txtMontoTotal.val() == "" ? 0  : parseFloat(txtMontoTotal.val().replace("$", "")) - parseFloat(txtMontoDeposito.val().replace("$", ""))
                txtSaldoActual.val(utils.formatterDolar.format(saldo));
            }

            
        });

        txtSurfRacks.change(cambiarEstadoSurfRacks);
        txtModoPago.change(cambiarEstadoProveedor);
        txtAplicaPagoAdelantado.change(cambiarEstadoPagoAdelantado)

        txtHoraInicio.change(function () { })

        btnGuardar.click(fnConfirmarGuardar);

        btnCargarVehiculo.click(function () {
            
            BuscarVehiculo.AbrirModal(fnCallBack, dateIni, dateFin,"Reservacion");
        });

        txtHoraInicio.bind('keypress', delimitarTextos);
        txtHoraEntrega.bind('keypress', delimitarTextos);

    }

    var fnCallBackAutorizar = function (result) {
        
        checkValidaAdm = false;
        if (result != null) {
            if (result.Data.length > 0) {
                if (result.Data[0].IdRol != configViwolf.Roles.Administrador) {
                    Dialog.alert("Reservaciones", "El usuario no es un administrador.");
                    txtMontoDia.val("");
                    txtMontoTotal.val("");
                }
                else {
                    checkValidaAdm = true;
                    calcularTarifaTotal();
                }
            }
            else {
                Dialog.alert("Reservaciones", "El Usuario no existe.");
                calcularTarifaTotal();
                txtMontoDia.val("");
                txtMontoTotal.val("");
            }
        }
        else {
            txtMontoDia.val("");
            txtMontoTotal.val("");
        }

    };

    var fnCallBack = function (data) {
        
        txtPlaca.val("");
        txtPlaca.val(data.IDVehiculo);
    };

    //No se permite escribir dentro del input text
    var delimitarTextos = function (e) {
        e.preventDefault();
    }

    //Solo permite introducir numeros.
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

    var cargarHoraFinal = function (hora) {
       
        var horaSeleccionada = hora.getHours().toString();
        var tiempo = horaSeleccionada + ':60'; 

        txtHoraEntrega.timepicker({
            timeFormat: 'h:mm p',
            interval: 30,
            //minTime: '5',
            //maxTime: '11:00pm',
            startTime: tiempo, // '5:00',
            //defaultTime: '11',
            scrollbar: true,
            change: function (e) {
                timeOut = e.getTime(); // txtHoraInicio.val();
                calcularTarifaTotal();
            }
        });
    }

    function fnCargaFechas() {

        txtFechaInicio.datepicker("destroy");
        txtFechaFinal.datepicker("destroy");

        txtFechaInicio.datepicker({
            autoclose: true,
            dateFormat: "dd/mm/yy",
            onSelect: function (selected) {
                txtHoraInicio.val("");
                txtFechaFinal.val("");
                txtHoraEntrega.val("");
                var fechaFinal = moment(txtFechaFinal.val(), 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss');
                var fechaSeleccionada = moment(selected, 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss');
                dateIni = new Date(fechaSeleccionada);
                txtFechaFinal.datepicker("option", "minDate", selected);
                cantidadDias = ((moment(fechaFinal).diff(fechaSeleccionada, 'days')));
                calcularTarifaTotal();
            }, minDate: '-0D'
            , maxDate: '+500D'
        });

        txtFechaFinal.datepicker({
            autoclose: true,
            dateFormat: "dd/mm/yy",
            onSelect: function (selected) {

                txtHoraEntrega.val("");
                var fechaInicial = moment(txtFechaInicio.val(), 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss');
                var fechaSeleccionada = moment(selected, 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss');
                dateFin = new Date(fechaSeleccionada);
                txtFechaInicio.datepicker("option", "maxDate", selected);
                cantidadDias = ((moment(fechaSeleccionada).diff(fechaInicial, 'days')));
                calcularTarifaTotal();
            },
            maxDate: '+500D'
        });

        txtFechaInicio.datepicker('setDate', new Date());
        txtFechaFinal.datepicker('setDate', new Date());

        txtHoraInicio.timepicker({
            timeFormat: 'h:mm p',
            interval: 30,
            //minTime: '5',
            //maxTime: '11:00pm',
            startTime: '00:00',
            //defaultTime: '11',
            scrollbar: true,
            change: function (e) {
                timeIn = e.getTime();
                //txtHoraEntrega.timepicker('setTime', new Date(e));
                //calcularTarifaTotal();
                if (txtHoraInicio.val() != "") {
                    txtFechaFinal.val("");
                    txtHoraEntrega.val("");
                    cargarHoraFinal(e);
                }

            }
           
        });

        txtHoraEntrega.timepicker({
            timeFormat: 'h:mm p',
            interval: 30,
            //minTime: '5',
            //maxTime: '11:00pm',
            startTime: '00:00',
            //defaultTime: '11',
            scrollbar: true,
            change: function (e) {
                timeOut = e.getTime(); // txtHoraInicio.val();
                //timeIn = e.getTime();
                //txtHoraEntrega.timepicker('setTime', new Date(e));
                if (txtHoraEntrega.val() != "") {
                    calcularTarifaTotal();
                    cargarHoraFinal(e);
                }

            }

        });
    }

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


    var cambiarEstadoAplicaComision = function () {
       
        if (txtAplicaComision.val() == 1) {
            document.getElementById("txtModoPago").disabled = false;
            txtModoPago.val(0);
        }
        else {
            document.getElementById("txtModoPago").disabled = true;
            document.getElementById("txtComisionistas").disabled = true;
            document.getElementById("txtProveedor").disabled = true;

            txtModoPago.val(1);
        }
    };

    function cambiarEstadoSurfRacks() {
        
        if (txtSurfRacks.val() == 'Si')
            document.getElementById("txtMontoSurfRacks").disabled = false;
        else
            document.getElementById("txtMontoSurfRacks").disabled = true;

        document.getElementById("txtMontoSurfRacks").value = utils.formatterDolar.format(parseFloat(0));
        txtMontoSurfRacks.val(utils.formatterDolar.format(0));
        calcularTarifaTotal();
    };

    function cambiarEstadoPagoAdelantado() {
      
        if (txtAplicaPagoAdelantado.val() == 1) {
            document.getElementById("txtNumeroDeposito").disabled = false;
            document.getElementById("txtMontoDeposito").disabled = false;
            txtNumeroDeposito.val("");
            txtMontoDeposito.val("");
        }
        else
            if (txtAplicaPagoAdelantado.val() == 0) {
                document.getElementById("txtNumeroDeposito").disabled = true;
                document.getElementById("txtMontoDeposito").disabled = true;
                txtMontoDeposito.val(utils.formatterDolar.format(parseFloat(0)));
                txtMontoDeposito.val(utils.formatterDolar.format(parseFloat(txtMontoDeposito.val().replace("$", ""))));
                var saldo = txtMontoTotal.val() == "" ? 0 : parseFloat(txtMontoTotal.val().replace("$", "")) - parseFloat(txtMontoDeposito.val().replace("$", ""))
                txtSaldoActual.val(utils.formatterDolar.format(saldo));
                txtNumeroDeposito.val("");
            };
    }

    function cambiarEstadoProveedor() {

        if (txtModoPago.val() == 1) {
            document.getElementById("txtComisionistas").disabled = false;
            document.getElementById("txtProveedor").disabled = true;
            txtProveedor.val("");
        }
        else
            if (txtModoPago.val() == 2) {
                document.getElementById("txtComisionistas").disabled = true;
                document.getElementById("txtProveedor").disabled = false;
                txtComisionistas.val("");
            };
    };


    var ValidateFields = function () {
        var check = true;

        if (txtIdentificacionCliente.val() == "") {
            Dialog.alert('Reservaciones', "El campo identificacion del cliente, no puede estar vacío.", function () {
            })
            check = false;
        }
        else
        if (txtNombreCliente.val() == "") {
            Dialog.alert('Reservaciones', "El campo nombre del cliente, no puede estar vacío.", function () {
            })
            check = false;
        }
        else
            if (txtHospedaje.val() == "") {
                Dialog.alert('Reservaciones', "El campo hospedaje, no puede estar vacío.", function () {
                })
                check = false;
            }
            else
                if (txtAplicaComision.val() == "") {
                    Dialog.alert('Reservaciones', "Debe escoger el lugar de entrega.", function () {
                    })
                    check = false;
                }
                else
                    if (txtCajon.val() == "") {
                        Dialog.alert('Reservaciones', "Debe escojer si desea el vehiculo con cajón.", function () {
                        })
                        check = false;
                    }
                    else
                        if (txtFechaInicio.val() == "") {
                            Dialog.alert('Reservaciones', "El campo fecha de inicio, no puede estar vacío.", function () {
                            })
                            check = false;
                        }
                        else
                            if (txtHoraInicio.val() == "") {
                                Dialog.alert('Reservaciones', "El campo hora de inicio, no puede estar vacío.", function () {
                                })
                                check = false;
                            }
                            else
                                if (txtFechaFinal.val() == "") {
                                    Dialog.alert('Reservaciones', "El campo fecha de entrega, no puede estar vacío.", function () {
                                    })
                                    check = false;
                                }
                                else
                                    if (txtHoraEntrega.val() == "") {
                                        Dialog.alert('Reservaciones', "El campo hora de entrega, no puede estar vacío.", function () {
                                        })
                                        check = false;
                                    }
                                    else
                                        if ((txtMontoDia.val() == "") || (parseFloat(txtMontoDia.val().replace("$", "")) <= "0")) {
                                            Dialog.alert('Reservaciones', "El campo monto día, no puede estar vacío, ni puede ser 0.", function () {
                                            })
                                            check = false;
                                        }
                                        else
                                            if (txtSurfRacks.val() == "") {
                                                Dialog.alert('Reservaciones', "Debe escoger si desea surf racks.", function () {
                                                })
                                                check = false;
                                            }
                                            else
                                                if ((txtSurfRacks.val() == "Si") && (parseFloat(txtMontoSurfRacks.val().replace("$", "")) <= "0")) {
                                                    Dialog.alert('Reservaciones', "El campo monto surf racks, no puede estar vacío, ni puede ser 0.", function () {
                                                    })
                                                    check = false;
                                                }
                                                else
                                                    if (txtMontoSurfRacks.val() == "") {
                                                        Dialog.alert('Reservaciones', "El campo monto surf racks, no puede estar vacío.", function () {
                                                        })
                                                        check = false;
                                                    }
                                                    else
                                                        if (txtMontoTotal.val() == "") {
                                                            Dialog.alert('Reservaciones', "El campo monto total, no puede estar vacío.", function () {
                                                            })
                                                            check = false;
                                                        }
                                                            else
                                                            if (txtSaldoActual.val() == "") {
                                                                Dialog.alert('Reservaciones', "El campo saldo actual, no puede estar vacío.", function () {
                                                                })
                                                                    
                                                                    check = false;
                                                                }
                                                                else
                                                                if (txtModoPago.val() == "") {
                                                                    Dialog.alert('Reservaciones', "Debe escoger si se desea pagar en efectivo.", function () {
                                                                    })
                                                                        
                                                                        check = false;
                                                                    }
                                                                    else
                                                                    if (((txtModoPago.val() == 1) && (txtAplicaComision.val() == 1) && (txtComisionistas.val() == ""))) {
                                                                        Dialog.alert('Reservaciones', "Debe seleccionar un comisionista.", function () {
                                                                        })
                                                                            
                                                                            check = false;
                                                                        }
                                                                        else
                                                                        if ((txtComisionistas.val() == "Si") && (IdProveedor == "")) {
                                                                            Dialog.alert('Reservaciones', "Debe seleccionar un proveedor para la cuenta por cobrar.", function () {
                                                                            })
                                                                                
                                                                                check = false;
                                                                            }
                                                                            else
                                                                            if (txtPlaca.val() == "") {
                                                                                Dialog.alert('Reservaciones', "El campo placa, no puede estar vacío.", function () {
                                                                                })
                                                                                    
                                                                                    check = false;
                                                                                }
                                                                                else
                                                                                    check = true;
        return check;
    };


    var fnGuardarReservacion = function () {
        
       
        var proveedor = document.getElementById("txtProveedor");
        IdProveedor = proveedor.options[proveedor.selectedIndex].value;

        var comisionista = document.getElementById("txtComisionistas");
        IdComisionista = comisionista.options[comisionista.selectedIndex].value;
     
        if (ValidateFields() == true) {
            
            var oData = {
                "UsuarioCreacion": usuarioLogueado,
                "NombreCliente": txtNombreCliente.val(),
                "LugarEntrega": txtHospedaje.val(),
                "AplicaComision": txtAplicaComision.val() == 1 ? true : false,
                "FechaInicio": dateIni,
                "HoraInicio": txtHoraInicio.val(),
                "FechaEntrega": dateFin,
                "HoraEntrega": txtHoraEntrega.val(),
                "SurfRacks": txtSurfRacks.val() == 'Si' ? true : false,
                "MontoSurfRacks": parseFloat(txtMontoSurfRacks.val().replace("$", "")),
                "Cajon": txtCajon.val() == 'Si' ? true : false,
                "MontoDia": parseFloat(txtMontoDia.val().replace("$", "")),
                "MontoTotal": parseFloat(txtMontoTotal.val().replace("$", "")),
                "NumeroDeposito": txtNumeroDeposito.val(),
                "MontoDeposito": parseFloat(txtMontoDeposito.val().replace("$", "")),
                "SaldoActual": parseFloat(txtSaldoActual.val().replace("$", "")),
                "ModoPago": txtModoPago.val(),
                "IDClienteComisionista": IdComisionista == "" ? null : IdComisionista,
                "IdProveedor": IdProveedor == "" ? null : IdProveedor,
                "IDUsuario": idUsuarioLogueado,
                "IDVehiculo": txtPlaca.val(),
                "IdentificacionCliente": txtIdentificacionCliente.val(),
                "NacionalidadCliente": txtNacionalidadCliente.val(),
                "ProfesionCliente": txtProfesionCliente.val(),
                "Extendido": false,
                "Referencia": null
            }

            try {
                var oUrl = 'Reservaciones/GuardarReservacion';
                var oProcessMessage = 'Guardando Reservacion';

                var success = function (result) {
                    if (result.MessageType == "Success") {
                        Dialog.alert('Reservaciones', result.InfoMessage, function () {
                        })
                        fnLimpiarDatos();
                    }
                    else {
                        Dialog.alert('Reservaciones', result.ErrorMessage, function () {
                        })
                    }
                };
                app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
            } catch (ex) { 
                retorno = false;
            }
        }
    };

    var fnLimpiarDatos = function () {
        txtIdentificacionCliente.val("");
        txtNombreCliente.val("");
        txtNacionalidadCliente.val("");
        txtProfesionCliente.val("");
        txtHospedaje.val("");
        txtAplicaComision.val("");
        txtSurfRacks.val("");
        txtMontoSurfRacks.val("");
        txtCajon.val("");
        txtMontoDia.val("");
        txtMontoTotal.val("");
        txtNumeroDeposito.val("");
        txtMontoDeposito.val("");
        txtSaldoActual.val("");
        txtUsuario.val("");
        txtModoPago.val("");
        txtComisionistas.val("");
        txtProveedor.val("");
        txtPlaca.val("");
        txtFechaInicio.val("");
        txtHoraInicio.val("");
        txtFechaFinal.val("");
        txtHoraEntrega.val("");
        btnGuardar.val("");
        timeIn = null;
        timeOut = null;
        objVehiculo = null;
        IdProveedor = 0;
        IdComisionista = 0;
    }

    $(function () {

        Init();
        InitSelect();


    });
}();