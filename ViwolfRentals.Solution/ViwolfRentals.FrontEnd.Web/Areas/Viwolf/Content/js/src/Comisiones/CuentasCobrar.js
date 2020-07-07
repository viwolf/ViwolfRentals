var cuentasCobrar = function () {
    var txtIDClienteProveedor = $('#txtIDClienteProveedor');
    var txtNombreClienteProveedor = $('#txtNombreClienteProveedor');
    var txtEstadoCxC = $('#txtEstadoCxC');
    var tblDataCxC = $('#tblDataCxC');
    var btnBuscarProveedores = $('#btnBuscarProveedores');
    var btnCxC = $('#btnCxC');
    var objSeleccionado = null;
    var iPos = 0;
    var objComisiones = null;
    var arrayModificacion = [];
    var rows_selected = [];


    var fnInit = function () {

        btnBuscarProveedores.click(fnBuscarProveedores);
        btnCxC.click(function (e) {
            if (rows_selected.length > 0) {
                fnConfirmarPagar(e);
            }
            else {
                Dialog.alert('Comisiones', "Debe seleccionar una cuenta.", function () {
                })
            }
        });

    };

    var fnConfirmarPagar = function (e) {

        Dialog.confirm('Comisiones', "Desea aplicar las cuentas generadas?", function (respuesta) {
            if (respuesta == true)
                fnAplicarCxC(e);
        })
    };

    var fnAplicarCxC = function (e) {


        var oData = {
            "EnumPagosComisiones": rows_selected,
            "ExtendedProperties": arrayModificacion
        }
        try {
            var oUrl = 'AplicarCuentaxCobrar';
            var oProcessMessage = 'Aplicando Cuentas';

            var success = function (result) {
                debugger;
                if (result.MessageType == "Success") {
                    Dialog.alert('Comisiones', result.InfoMessage, function () {
                    })
                    var ids = "";
                    for (var i = 0; i < result.Data.length; i++) {

                        if (ids == "")
                            ids = result.Data[i].IDCuentaxCobrar;
                        else
                            ids = ids + ',' + result.Data[i].IDCuentaxCobrar;
                    }

                    generarCxC.fnReporteTicket(e, ids)
                }
                else {
                    Dialog.alert('Comisiones', result.ErrorMessage, function () {
                    })
                }
            };
            app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
        } catch (ex) {

            retorno = false;
        }
    };

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




    var fnBuscarProveedores = function () {

        
        if ((txtIDClienteProveedor.val() == '') && (txtNombreClienteProveedor.val() == '')) {
            Dialog.alert('Comisiones', "Se debe de especificar algún criterio de búsqueda.", function () {
            })
        }
        else {

            var oData = {
                "IDClienteProveedor": txtIDClienteProveedor.val(),
                "t_Proveedores.NombreProveedor": txtNombreClienteProveedor.val(),
                "CuentaCobrada ": txtEstadoCxC.val(),
                "t_Contratos.IDEstadoContrato": configViwolf.EstadosContratos.Facturado
            };
            try {
                var oUrl = 'ListarCuentasxCobrar';
                var oProcessMessage = 'Buscando Cuentas por Cobrar';
                var success = function (result) {

                    if (result.Data.length > 0) {



                        // objComisiones = result.Data;
                        tblDataCxC.dataTable({
                            destroy: true,
                            processing: true,
                            responsive: true,
                            data: result.Data,
                            select: true,
                            columns: [
                                { data: 'IDCuentaxCobrar' },
                                { data: 'IDContrato' },
                                { data: 'NumeroContrato' },
                                { data: 'NombreCliente' },
                                { data: 'Total' },
                                { data: 'CuentaCobrada' },
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
                                    "targets": [5],
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

                        tblDataCxC.on('click', 'input[type="checkbox"]', function (e) {

                            var $row = $(this).closest('tr');


                            // Get row ID
                            var rowId = tblDataCxC.fnGetData($row)

                            // Determine whether row ID is in the list of selected row IDs
                            var index = $.inArray(rowId, rows_selected);

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
                            updateDataTableSelectAllCtrl(tblDataCxC);

                            // Prevent click event from propagating to parent
                            e.stopPropagation();
                        });

                        // Handle click on table cells with checkboxes
                        tblDataCxC.on('click', 'tbody td, thead th:first-child', function (e) {

                            $(this).parent().find('input[type="checkbox"]').trigger('click');
                        });

                        // Handle click on "Select all" control
                        $('thead input[name="select_all"]').on('click', function (e) {

                            if (this.checked) {
                                $('#tblDataCxC tbody input[type="checkbox"]:not(:checked)').trigger('click');
                            } else {
                                $('#tblDataCxC tbody input[type="checkbox"]:checked').trigger('click');
                            }

                            // Prevent click event from propagating to parent
                            e.stopPropagation();
                        });

                        // Handle table draw event
                        tblDataCxC.on('draw', function () {

                            // Update state of "Select all" control
                            updateDataTableSelectAllCtrl(table);
                        });



                        tblDataCxC.on("click", "tr", function () {
                            iPos = tblDataCxC.fnGetPosition(this);
                            objSeleccionado = tblDataCxC.fnGetData(iPos);
                        });
                        tblDataCxC.on("change", "input", function () {
                            if (this.type != "checkbox") {
                                var valor = this.value;
                                var idComision = document.getElementById("tblDataCxC").rows[iPos + 1].cells[0].innerText
                                objSeleccionado.TotalPagar = ((valor / 100) * objSeleccionado.PrecioTotal);
                                document.getElementById("tblDataCxC").rows[iPos + 1].cells[4].innerText = objSeleccionado.TotalPagar;
                                document.getElementById("tblDataCxC").rows[iPos + 1].cells[4].innerHTML = objSeleccionado.TotalPagar;
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
                        tblDataCxC.dataTable().fnClearTable();
                    };
                };
                app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
            } catch (ex) {

                retorno = false;
            }
        }
    };



    $(function () {
        fnInit();
    });


}();