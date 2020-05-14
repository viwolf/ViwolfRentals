

var reservaciones = function () {
    var txtNombreCliente = $("#txtNombreCliente");
    var txtHospedaje = $("#txtHospedaje");
    var txtEntregaHotel = $("#txtEntregaHotel");
    var txtSurfRacks = $("#txtSurfRacks");
    var txtMontoSurfRacks = $("#txtMontoSurfRacks");
    var txtCajon = $("#txtCajon");
    var txtMontoDia = $("#txtMontoDia");
    var txtMontoTotal = $("#txtMontoTotal");
    var txtNumeroDeposito = $("#txtNumeroDeposito");
    var txtMontoDeposito = $("#txtMontoDeposito");
    var txtSaldoActual = $("#txtSaldoActual");
    var txtUsuario = $("#txtUsuario");
    var txtEfectivo = $("#txtEfectivo");
    var txtCuentaCobrar = $("#txtCuentaCobrar");
    var txtProveedor = $("#txtProveedor");
    var txtPlaca = $("#txtPlaca");
    var txtFechaInicio = $("#txtFechaInicio");
    var txtHoraInicio = $("#txtHoraInicio")
    var txtFechaFinal = $("#txtFechaFinal");
    var txtHoraEntrega = $("#txtHoraEntrega")
    var btnGuardar = $("#btnGuardar");
    var btnInfo = $("#btnInfo");
    var objVehiculo = null;


    var cantidadDias = 0;
  
    var dateIni = new Date();
    var dateFin = new Date();


   
    var calcularTarifaTotal = function () {
        
        var montoDia = txtMontoDia.val() == '' ? 0 : parseFloat(txtMontoDia.val().replace("$", "")); // parseFloat(txtMontoDia.val());
        var montoSurfRacks = txtMontoSurfRacks.val() == '' ? 0 : parseFloat(txtMontoSurfRacks.val().replace("$", ""));
        var montoTotal = ((montoDia * (cantidadDias + 1)) + montoSurfRacks);
        txtMontoDia.val(utils.formatterDolar.format(montoDia));
        txtMontoTotal.val(utils.formatterDolar.format(montoTotal));
    };

    var Init = function () {

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

        txtPlaca.blur(function () {
            objVehiculo = null;
            if (txtPlaca.val() != "")
                fnValidarVehiculo();
            else
                document.getElementById("btnInfo").disabled = true;
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
        txtCuentaCobrar.change(cambiarEstadoProveedor);
        
        cargarSelect2(txtProveedor,
            {
                PlaceHolder: "Seleccione Proveedor",
                minimumResultsForSearch: Infinity,
                Url: "Proveedores/ListarProveedores",
                DataType: 'json',
                Type: "POST",
                Id: "IdProveedor",
                Text: "NombreProveedor",
                SuccessFunction: function (data) {
                    estado = data.Data;
                }
            });

        txtHoraInicio.change(function () {  })

        btnGuardar.click(fnGuardarReservacion);

        btnInfo.click(function () {
            informacionVehiculo.AbrirModal(objVehiculo);
        });
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
                
                timeIn = e.getTime(); // txtHoraInicio.val();
            }
           
        });

        txtHoraEntrega.timepicker({
            timeFormat: 'h:mm p',
            interval: 60,
            minTime: '5',
            maxTime: '11:00pm',
            startTime: '5:00',
            //defaultTime: '11',
            scrollbar: true,
            change: function (e) {
                
                timeOut = e.getTime(); // txtHoraInicio.val();
            }
        });
    }



    var cargarSelect2 = function (elemento, configuracion) {
        
        $.ajax({
            type: "POST",
            url: "Proveedores/ListarProveedores",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {

                $(msg.Data).each(function () {
                    
                    var option = $(document.createElement('option'));

                    option.text(this.NombreProveedor);
                    option.val(this.IdProveedor);

                    $("#txtProveedor").append(option);
                });

            },
            error: function (msg) {
                $("#dvAlerta > span").text("Error al llenar el combo");
            }
        });

      
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
        
        if (txtCuentaCobrar.val() == 'Si')
            document.getElementById("txtProveedor").disabled = false;
        else
            document.getElementById("txtProveedor").disabled = true;

        document.getElementById("txtProveedor").value = '';
    };

    var fnValidarVehiculo = function () {

        var oData = {
            "IDVehiculo": txtPlaca.val()
        }

        try {
            var oUrl = 'Vehiculos/ListarVehiculos';
            var oProcessMessage = 'Enlazando vehiculo';

            var success = function (result) {
                debugger;
                if (result.Data.length > 0) {
                    if (result.Data[0].t_Departamentos.NombreDepartamento == "Bodega") {
                        objVehiculo = result.Data[0];
                        document.getElementById("btnInfo").disabled = false;
                        msjApp.fnShowSuccessMessage('Se enlazó el vehiculo a la reservacion con exito');
                    }
                    else {
                        msjApp.fnShowErrorMessage("El vehiculo " + txtPlaca.val() + " no está disponible para su reservación")
                        //alert();
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


    var fnGuardarReservacion = function () {
        

        var proveedor = document.getElementById("txtProveedor");
        var IdProveedor = proveedor.options[proveedor.selectedIndex].value;

      
        var oData = {
            "UsuarioCreacion": txtUsuario.val(),
            "NombreCliente": txtNombreCliente.val(),
            "LugarEntrega": txtHospedaje.val(),
            "EntregaHotel": txtEntregaHotel.val() == 'Si' ? true : false,
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
            "Efectivo": txtEfectivo.val() == 'Si' ? true : false,
            "CuentaPorCobrar": txtCuentaCobrar.val() == 'Si' ? true : false,
            "ProveedorID": IdProveedor == "" ? "0" : IdProveedor,
            "IDUsuario": txtUsuario.val(),
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
    };

    var fnLimpiarDatos = function () {
        txtNombreCliente.val("");
        txtHospedaje.val("");
        txtEntregaHotel.val("");
        txtSurfRacks.val("");
        txtMontoSurfRacks.val("");
        txtCajon.val("");
        txtMontoDia.val("");
        txtMontoTotal.val("");
        txtNumeroDeposito.val("");
        txtMontoDeposito.val("");
        txtSaldoActual.val("");
        txtUsuario.val("");
        txtEfectivo.val("");
        txtCuentaCobrar.val("");
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


    });
}();