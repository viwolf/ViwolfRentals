

var reservaciones = function () {
    var txtNombreCliente = $("#txtNombreCliente");
    var txtHospedaje = $("#txtHospedaje");
    var txtAplicaComision = $("#txtAplicaComision");
    var txtSurfRacks = $("#txtSurfRacks");
    var txtMontoSurfRacks = $("#txtMontoSurfRacks");
    var txtCajon = $("#txtCajon");
    var txtMontoDia = $("#txtMontoDia");
    var txtMontoTotal = $("#txtMontoTotal");
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
    var objVehiculo = null;
    var IdProveedor = 0; 
    var IdComisionista = 0; 
    var cantidadDias = 0;
    var timeIn = 0;
    var timeOut = 0;
  
    var dateIni = new Date();
    var dateFin = new Date();


   
    var calcularTarifaTotal = function () {
      
        var montoDia = txtMontoDia.val() == '' ? 0 : parseFloat(txtMontoDia.val().replace("$", "")); // parseFloat(txtMontoDia.val());
        var montoSurfRacks = txtMontoSurfRacks.val() == '' ? 0 : parseFloat(txtMontoSurfRacks.val().replace("$", ""));
        var montoTotal = 0;

        if (timeIn == timeOut) {
            cantidadDias == 0 ? 0 : cantidadDias - 1;
            montoTotal = ((montoDia * (cantidadDias)) + montoSurfRacks);
        } else {
            montoTotal = ((montoDia * (cantidadDias + 1)) + montoSurfRacks);
        }        
        txtMontoDia.val(utils.formatterDolar.format(montoDia));
        txtMontoTotal.val(utils.formatterDolar.format(montoTotal));
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
                        data: configuracion.data, // null,
                        dataType: 'json',
                        type: 'POST'
                    }).done(function (data) {
                        //bodegas = data.Data;
                        //callback(data.Data);
                    });
                },
                //SuccessFunction: function (data) {
                //    bodegas = data.Data;
                //}
            });


        //cargarSelect2(txtProveedor,
        //    {
        //        PlaceHolder: "Seleccione Proveedor",
        //        minimumResultsForSearch: Infinity,
        //        Url: "Proveedores/ListarProveedores",
        //        DataType: 'json',
        //        Type: "POST",
        //        Id: "IdProveedor",
        //        Text: "NombreProveedor",
        //        SuccessFunction: function (data) {
        //            estado = data.Data;
        //        }
        //    });

        cargarSelect2(txtComisionistas,
            {
                PlaceHolder: "",
                Url: "Comisionistas/ListarComisionistas",
                DataType: 'json',
                Type: "POST",
                Id: "IdClienteComisionista",
                Text: "NombreClienteComisionista",
                InitSelection: function (callback, configuracion) {
                    $.ajax(configuracion.Url, {
                        url: configuracion.Url,
                        data: configuracion.data, // null,
                        dataType: 'json',
                        type: 'POST'
                    }).done(function (data) {
                        //bodegas = data.Data;
                        //callback(data.Data);
                    });
                },
                //SuccessFunction: function (data) {
                //    bodegas = data.Data;
                //}
            });

        //cargarSelect2(txtComisionistas,
        //    {
        //        PlaceHolder: "Seleccione Comisionista",
        //        minimumResultsForSearch: Infinity,
        //        Url: "Comisionistas/ListarComisionistas",
        //        DataType: 'json',
        //        Type: "POST",
        //        Id: "IdClienteComisionista",
        //        Text: "NombreClienteComisionista",
        //        SuccessFunction: function (data) {
        //            estado = data.Data;
        //        }
        //    });
    };

    var Init = function () {

        //txtUsuario.val(usuarioLogueado);

        txtAplicaComision.change(cambiarEstadoAplicaComision);

        
        fnCargaFechas();

        txtMontoSurfRacks.bind('keypress', valideKey);

        txtMontoSurfRacks.blur(function () {
            txtMontoSurfRacks.val(utils.formatterDolar.format(parseFloat(txtMontoSurfRacks.val().replace("$", ""))));
            calcularTarifaTotal();
        });

        txtMontoDia.bind('keypress', valideKey);

        txtMontoDia.blur(function () {
            
            if (txtMontoDia.val() < 50) {
                alert("El monto no puede ser menor de $50");
                txtMontoDia.val("");
            }
            else {
                calcularTarifaTotal();
            }
        })

        //txtPlaca.blur(function () {
        //    objVehiculo = null;
        //    if (txtPlaca.val() != "")
        //        fnValidarVehiculo();
        //    //else
        //        //document.getElementById("btnInfo").disabled = true;
        //})

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

        txtHoraInicio.change(function () { })

        btnGuardar.click(fnGuardarReservacion);

        btnCargarVehiculo.click(function () {
            BuscarVehiculo.AbrirModal(fnCallBack);
        });
    }

    var fnCallBack = function (data) {
        debugger;
        txtPlaca.val("");
        txtPlaca.val(data.IDVehiculo);
    };

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
        var tiempo = horaSeleccionada + ':00'; 

        txtHoraEntrega.timepicker({
            timeFormat: 'h:mm p',
            interval: 480,
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
            format: "mm/dd/yyyy",
            onSelect: function (selected) {
                dateIni = new Date(selected);
                txtFechaFinal.datepicker("option", "minDate", selected);
                cantidadDias = ((moment(txtFechaFinal.val()).diff(selected, 'days')));
                calcularTarifaTotal();
            }, minDate: '-500D'
            , maxDate: '+500D'
        });

        txtFechaFinal.datepicker({
            autoclose: true,
            format: "mm/dd/yyyy",
            onSelect: function (selected) {
                
                dateFin = new Date(selected);
                txtFechaInicio.datepicker("option", "maxDate", selected);
                cantidadDias = ((moment(selected).diff(txtFechaInicio.val(), 'days')));
                calcularTarifaTotal();
            },
            maxDate: '+500D'
        });

        txtFechaInicio.datepicker('setDate', new Date());
        txtFechaFinal.datepicker('setDate', new Date());

        txtHoraInicio.timepicker({
            timeFormat: 'h:mm p',
            interval: 60,
            minTime: '5',
            maxTime: '11:00pm',
            startTime: '5:00',
            //defaultTime: '11',
            scrollbar: true,
            change: function (e) {
                timeIn = e.getTime();
                txtHoraEntrega.timepicker('setTime', new Date(e));
                calcularTarifaTotal();
                cargarHoraFinal(e);

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

                    option.text(this[configuracion.Text]);  //(this.NombreProveedor);
                    option.val(this[configuracion.Id]); //(this.IdProveedor);


                    //$("#txtProveedor").append(option);
                    elemento.append(option);
                });

            },
            error: function (msg) {
                $("#dvAlerta > span").text("Error al llenar el combo");
            }
        });

      
    };


    var cambiarEstadoAplicaComision = function () {
       
        if (txtAplicaComision.val() == 'Si') {
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

    var fnValidarVehiculo = function () {

        var oData = {
            "IDVehiculo": txtPlaca.val()
        }

        try {
            var oUrl = 'Vehiculos/ListarVehiculos';
            var oProcessMessage = 'Enlazando vehiculo';

            var success = function (result) {
               
                if (result.Data.length > 0) {
                    if (result.Data[0].t_Departamentos.NombreDepartamento == "Disponible") {
                        objVehiculo = result.Data[0];
                        //document.getElementById("btnInfo").disabled = false;
                        alert('Se enlazó el vehiculo a la reservacion con exito')
                        //msjApp.fnShowSuccessMessage('Se enlazó el vehiculo a la reservacion con exito');
                    }
                    else {
                       // msjApp.fnShowErrorMessage("El vehiculo " + txtPlaca.val() + " no está disponible para su reservación")
                        alert('El vehiculo ' + txtPlaca.val() + ' no está disponible para su reservación');
                    }
                }
                else {
                    alert("No se encontró el vehiculo en la busqueda");
                };
            };
            app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
        } catch (ex) {
            //utils.fnShowErrorMessage(ex.message);
            retorno = false;
        }
        //return retorno;

    }

    var ValidateFields = function () {
        var check = true;

     

        if (txtNombreCliente.val() == "") {
            alert("El campo nombre del cliente, no puede estar vacío.");
            check = false;
        }
        else
            if (txtHospedaje.val() == "") {
                alert("El campo hospedaje, no puede estar vacío.");
                check = false;
            }
            else
                if (txtAplicaComision.val() == "") {
                    alert("Debe escoger el lugar de entrega.");
                    check = false;
                }
                else
                    if (txtCajon.val() == "") {
                        alert("Debe escojer si desea el vehiculo con cajón.");
                        check = false;
                    }
                    else
                        if (txtFechaInicio.val() == "") {
                            alert("El campo fecha de inicio, no puede estar vacío.");
                            check = false;
                        }
                        else
                            if (txtHoraInicio.val() == "") {
                                alert("El campo hora de inicio, no puede estar vacío.");
                                check = false;
                            }
                            else
                                if (txtFechaFinal.val() == "") {
                                    alert("El campo fecha de entrega, no puede estar vacío.");
                                    check = false;
                                }
                                else
                                    if (txtHoraEntrega.val() == "") {
                                        alert("El campo hora de entrega, no puede estar vacío.");
                                        check = false;
                                    }
                                    else
                                        if ((txtMontoDia.val() == "") || (parseFloat(txtMontoDia.val().replace("$", "")) <= "0")) {
                                            alert("El campo monto día, no puede estar vacío, ni puede ser 0.");
                                            check = false;
                                        }
                                        else
                                            if (txtSurfRacks.val() == "") {
                                                alert("Debe escoger si desea surf racks.");
                                                check = false;
                                            }
                                            else
                                                if ((txtSurfRacks.val() == "Si") && (parseFloat(txtMontoSurfRacks.val().replace("$", "")) <= "0")) {
                                                    alert("El campo monto surf racks, no puede estar vacío, ni puede ser 0.");
                                                    check = false;
                                                }
                                                else
                                                    if (txtMontoSurfRacks.val() == "") {
                                                        alert("El campo monto surf racks, no puede estar vacío.");
                                                        check = false;
                                                    }
                                                    else
                                                        if (txtMontoTotal.val() == "") {
                                                            alert("El campo monto total, no puede estar vacío.");
                                                            check = false;
                                                        }
                                                        else
                                                            if (txtUsuario.val() == "") {
                                                                alert("El campo reservado por, no puede estar vacío.");
                                                                check = false;
                                                            }
                                                            else
                                                                if (txtSaldoActual.val() == "") {
                                                                    alert("El campo saldo actual, no puede estar vacío.");
                                                                    check = false;
                                                                }
                                                                else
                                                                    if (txtModoPago.val() == "") {
                                                                        alert("Debe escoger si se desea pagar en efectivo.");
                                                                        check = false;
                                                                    }
                                                                    else
                                                                        if (txtComisionistas.val() == "") {
                                                                            alert("Debe seleccionar si aplica una cuenta por cobrar.");
                                                                            check = false;
                                                                        }
                                                                        else
                                                                            if ((txtComisionistas.val() == "Si") && (IdProveedor == "")) {
                                                                                alert("Debe seleccionar un proveedor para la cuenta por cobrar.");
                                                                                check = false;
                                                                            }
                                                                            else
                                                                                if (txtPlaca.val() == "") {
                                                                                    alert("El campo placa, no puede estar vacío.");
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
                "AplicaComision": txtAplicaComision.val() == 'Si' ? true : false,
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
                "IdClienteComisionista": IdComisionista == "" ? null : IdComisionista,
                "ProveedorID": IdProveedor == "" ? null : IdProveedor,
                "IDUsuario": idUsuarioLogueado,
                "IDVehiculo": txtPlaca.val()
            }

            try {
                var oUrl = 'Reservaciones/GuardarReservacion';
                var oProcessMessage = 'Guardando Reservacion';

                var success = function (result) {
                    if (result.MessageType == "Success") {
                        alert("Reservacion creada con exito");
                        fnLimpiarDatos();
                    }


                };
                app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
            } catch (ex) {
                //utils.fnShowErrorMessage(ex.message);
                retorno = false;
            }
        //return retorno;
        }
    };

    var fnLimpiarDatos = function () {
        txtNombreCliente.val("");
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
    }

    $(function () {

        Init();
        InitSelect();


    });
}();