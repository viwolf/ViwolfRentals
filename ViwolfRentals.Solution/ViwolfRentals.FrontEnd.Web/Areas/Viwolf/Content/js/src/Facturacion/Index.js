﻿var indexFacturacion = function () {
    var txtNumroContrato = $('#txtNumroContrato');
    var txtNombreCliente = $('#txtNombreCliente');
    var txtLugarEntrega = $('#txtLugarEntrega');
    var txtEstadoContrato = $('#txtEstadoContrato');
    var tblDataContratos = $('#tblDataContratos');
    var btnBuscarContratos = $('#btnBuscarContratos');
    var btnFacturar = $('#btnFacturar');
    var objSeleccionado = null;
    var iPos = 0;
    var objComisiones = null;
    var arrayModificacion = [];
    var rows_selected = [];
    var rows_DetallePago = [];
    var idEstado = 0;
    var TotalFacturado = 0

    var InitSelect = function () {
        cargarSelect2(txtEstadoContrato,
            {
                PlaceHolder: "",
                Url: "Contratos/ListarEstadosContratos",
                DataType: 'json',
                Type: "POST",
                Id: "IDEstadoContrato",
                Text: "Descripcion",
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
        debugger;
        fnBuscarContratos();
       
        //btnBuscarContratos.click(fnBuscarContratos);
        btnFacturar.bind().click(function (e) {
            if (rows_selected.length > 0) {
                fnConfirmarPagar(e);
            }
            else {
                Dialog.alert('Contratos', "Debe seleccionar un contrato.", function () {
                })
            }
        });

        //txtEstadoContrato.change(cambiarEstadoContrato)

    };

    var callBackFactura = function (objPago) {
        for (var i = 0; i < objPago.length; i++) {
            rows_DetallePago.push(objPago[i]);
        }
        fnCrearFactura();
    };

    var fnConfirmarPagar = function (e) {

        Dialog.confirm('Facturar', "Desea facturar los contratos seleccionados?", function (respuesta) {
            if (respuesta == true) {
                TotalFacturado = 0;
                rows_selected.forEach(function (item) {
                    TotalFacturado = TotalFacturado + item.TotalContrato;
                })
                detallePago.AbrirModal(TotalFacturado, callBackFactura);
            }
        })
    };

   function cambiarEstadoContrato() {
        var estado = document.getElementById("txtEstadoContrato");
        idEstado = estado.options[estado.selectedIndex].value;

        if (idEstado == configViwolf.EstadosContratos.Pendiente)
            document.getElementById("btnFacturar").disabled = false;
        else
            document.getElementById("btnFacturar").disabled = true;
    }

   function updateDataTableSelectAllCtrl(table) {

        var $chkbox_all = $('tbody input[type="checkbox"]', table);
        var $chkbox_checked = $('tbody input[type="checkbox"]:checked', table);
        var chkbox_select_all = $('thead input[name="select_all"]', table).get(0);

        // If none of the checkboxes are checked
        if ($chkbox_checked.length === 0) {
            chkbox_select_all.checked = false;
            if ('indeterminate' in chkbox_select_all) {
                chkbox_select_all.indeterminate = false;
            }

            // If all of the checkboxes are checked
        } else if ($chkbox_checked.length === $chkbox_all.length) {
            chkbox_select_all.checked = true;
            if ('indeterminate' in chkbox_select_all) {
                chkbox_select_all.indeterminate = false;
            }

            // If some of the checkboxes are checked
        } else {
            chkbox_select_all.checked = true;
            if ('indeterminate' in chkbox_select_all) {
                chkbox_select_all.indeterminate = true;
            }
        }
    }

    var fnBuscarContratos = function () {
        TotalFacturado = 0;
        rows_selected = [];
        //var estado = document.getElementById("txtEstadoContrato");
        //var EstadoID = estado.options[estado.selectedIndex].value;
       

        var oData = {
            "NumeroContrato": txtNumroContrato.val(),
            "t_Reservaciones.NombreCliente": txtNombreCliente.val(),
            "t_Reservaciones.LugarEntrega": txtLugarEntrega.val(),
            "IDEstadoContrato": configViwolf.EstadosContratos.Pendiente
        };
            try {
                var oUrl = 'Contratos/ListarContratos';
                var oProcessMessage = 'Buscando Contratos.';
                var success = function (result) {

                    if (result.Data.length > 0) {



                        // objComisiones = result.Data;
                        tblDataContratos.dataTable({
                            destroy: true,
                            processing: true,
                            responsive: true,
                            data: result.Data,
                            select: true,
                            columns: [
                                { data: 'IDContrato' },
                                { data: 'IDReservacion' },
                                { data: 'IDEstadoContrato' },
                                { data: 'NumeroContrato' },
                                { data: 'NombreCliente' },
                                { data: 'LugarEntrega' },
                                { data: 'Descripcion' },
                                { data: 'TotalContrato' },
                                { data: 'chkPago' }
                            ],
                            columnDefs: [
                                {
                                    "targets": [0],
                                    "visible": false,
                                    "searchable": false
                                },
                                {
                                    "targets": [1],
                                    "visible": false,
                                    "searchable": false
                                },
                                {
                                    "targets": [2],
                                    "visible": false,
                                    "searchable": false
                                }
                            ],
                            order: [[1, 'asc']],
                            rowCallback: function (row, data, dataIndex) {
                                // Get row ID
                                var rowId = data;

                                // If row ID is in the list of selected row IDs
                                if ($.inArray(rowId, rows_selected) !== -1) {
                                    $(row).find('input[type="checkbox"]').prop('checked', true);
                                    $(row).addClass('selected');
                                }
                            }
                        });

                        tblDataContratos.on('click', 'input[type="checkbox"]', function (e) {

                            var $row = $(this).closest('tr');

                            // Get row ID
                            var rowId = tblDataContratos.fnGetData($row)

                            // Determine whether row ID is in the list of selected row IDs
                            var index = $.inArray  (rowId, rows_selected);

                            // If checkbox is checked and row ID is not in list of selected row IDs
                            if (this.checked && index === -1) {
                                rows_selected.push(rowId);

                                // Otherwise, if checkbox is not checked and row ID is in list of selected row IDs
                            } else if (!this.checked && index !== -1) {
                                rows_selected.splice(index, 1);
                            }

                            if (this.checked) {
                                $row.addClass('selected');
                            } else {
                                $row.removeClass('selected');
                            }

                            // Update state of "Select all" control
                            updateDataTableSelectAllCtrl(tblDataContratos);

                            // Prevent click event from propagating to parent
                            e.stopPropagation();
                        });

                        // Handle click on table cells with checkboxes
                        tblDataContratos.on('click', 'tbody td, thead th:first-child', function (e) {

                            $(this).parent().find('input[type="checkbox"]').trigger('click');
                        });

                        // Handle click on "Select all" control
                        $('thead input[name="select_all"]').on('click', function (e) {

                            if (this.checked) {
                                $('#tblDataContratos tbody input[type="checkbox"]:not(:checked)').trigger('click');
                            } else {
                                $('#tblDataContratos tbody input[type="checkbox"]:checked').trigger('click');
                            }

                            // Prevent click event from propagating to parent
                            e.stopPropagation();
                        });

                        // Handle table draw event
                        tblDataContratos.on('draw', function () {

                            // Update state of "Select all" control
                            updateDataTableSelectAllCtrl(table);
                        });



                        tblDataContratos.on("click", "tr", function () {
                            iPos = tblDataContratos.fnGetPosition(this);
                            objSeleccionado = tblDataContratos.fnGetData(iPos);
                        });
                        tblDataContratos.on("change", "input", function () {
                            if (this.type != "checkbox") {
                                var valor = this.value;
                                var idComision = document.getElementById("tblDataContratos").rows[iPos + 1].cells[0].innerText
                                objSeleccionado.TotalPagar = ((valor / 100) * objSeleccionado.PrecioTotal);
                                document.getElementById("tblDataContratos").rows[iPos + 1].cells[4].innerText = objSeleccionado.TotalPagar;
                                document.getElementById("tblDataContratos").rows[iPos + 1].cells[4].innerHTML = objSeleccionado.TotalPagar;
                                arrayModificacion.push({
                                    "Key": idComision,
                                    "Value": valor
                                })
                            }
                        });
                    }
                    else {
                        Dialog.alert('Comisiones', result.InfoMessage == "" ? result.ErrorMessage : result.InfoMessage, function () {
                        })
                        tblDataContratos.dataTable().fnClearTable();
                    };
                };
                app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
            } catch (ex) {

                retorno = false;
            }
     
    };

    var fnCrearFactura = function (e) {
        var oData = {
            "UsuarioCreacion": usuarioLogueado,
            "NombreCliente": rows_selected[0].NombreCliente,
            "IDTipoFactura": configViwolf.TiposFactura.Contado,
            "IDEstadoFactura": configViwolf.EstadosFactura.Activa,
            "Descuento": 0,
            "TotalDescuento": 0,
            "TotalFacturado": TotalFacturado,
            "t_FacturasDetalles": rows_selected,
            "t_FacturaDetallePago": rows_DetallePago
        }
        try {
            var oUrl = 'Facturacion/CrearFactura';
            var oProcessMessage = 'Guardando Factura';

            var success = function (result) {
                debugger;
                if (result.MessageType == "Success") {
                    Dialog.alert('Contrato', result.InfoMessage, function () {
                    })
                    generarTicket.fnReporteTicket(e, result.Data.IDFactura);
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
        InitSelect();
    });



}();