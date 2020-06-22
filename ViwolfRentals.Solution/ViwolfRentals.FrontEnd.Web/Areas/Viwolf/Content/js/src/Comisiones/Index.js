var indexPagoComision = function () {
    var txtIDClienteComisionista = $('#txtIDClienteComisionista');
    var txtNombreClienteComisionista = $('#txtNombreClienteComisionista');
    var txtEstadoComision = $('#txtEstadoComision');
    var tblDataComisiones = $('#tblDataComisiones');
    var btnBuscarComisiones = $('#btnBuscarComisiones');
    var btnPagarComision = $('#btnPagarComision');
    var objSeleccionado = null;
    var iPos = 0;
    var objComisiones = null;
    var arrayModificacion = [];
    var rows_selected = [];


    var fnInit = function () {
       
        btnBuscarComisiones.click(fnBuscarComisiones);
        btnPagarComision.click(function (e) {
            if (rows_selected.length > 0) {
                fnConfirmarPagar(e);
            }
            else {
                Dialog.alert('Comisiones', "Debe seleccionar una comision.", function () {
                })
            }
        });

    };

    var fnConfirmarPagar = function (e) {
        
        Dialog.confirm('Comisiones', "Desea cancelar las comisiones generadas?", function (respuesta) {
            if (respuesta == true)
                fnPagarComisiones(e);
        })
    };

    var fnPagarComisiones = function (e) {
        
        
        var oData = {
            "EnumPagosComisiones": rows_selected,
            "ExtendedProperties": arrayModificacion
        }
        try {
            var oUrl = 'Comisiones/GuardarPagosComision';
            var oProcessMessage = 'Guardando Contrato';

            var success = function (result) {
                
                if (result.MessageType == "Success") {
                    Dialog.alert('Contrato', result.InfoMessage, function () {
                    })
                    var ids = "";
                    for (var i = 0; i < result.Data.length; i++) {
                        
                        if (ids == "")
                            ids = result.Data[i].IDPagoComision;
                        else
                            ids = ids + ',' + result.Data[i].IDPagoComision;
                    }

                    generarPagoComision.fnReporteTicket(e, ids)
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




    var fnBuscarComisiones = function () {

      
        if ((txtIDClienteComisionista.val() == '') && (txtNombreClienteComisionista.val() == '')) {
            Dialog.alert('Comisiones', "Se debe de especificar algún criterio de búsqueda.", function () {
            })
        }
        else {

            var oData = {
                "IDClienteComisionista": txtIDClienteComisionista.val(),
                "t_ClientesComisionistas.NombreClienteComisionista": txtNombreClienteComisionista.val(),
                "ComisionPaga": txtEstadoComision.val()
            };
            try {
                var oUrl = 'Comisiones/ListarPagosComision';
                var oProcessMessage = 'Buscando Comisiones por pagar';
                var success = function (result) {

                    if (result.Data.length > 0) {

                       

                       // objComisiones = result.Data;
                        tblDataComisiones.dataTable({
                            destroy: true,
                            processing: true,
                            responsive: true,
                            data: result.Data,
                            select: true,
                            columns: [
                                { data: 'IDPagoComision' },
                                { data: 'IDContrato' },
                                { data: 'NumeroContrato' },
                                { data: 'NombreCliente' },
                                { data: 'PrecioTotal' },
                                { data: 'PorcentajeComision' },
                                { data: 'TotalPagar' },
                                { data: 'ComisionPaga' },
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
                                    "targets": [7],
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

                        tblDataComisiones.on('click', 'input[type="checkbox"]', function (e) {
                            
                            var $row = $(this).closest('tr');

                           
                            // Get row ID
                            var rowId = tblDataComisiones.fnGetData($row)

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
                            updateDataTableSelectAllCtrl(tblDataComisiones);

                            // Prevent click event from propagating to parent
                            e.stopPropagation();
                        });

                        // Handle click on table cells with checkboxes
                        tblDataComisiones.on('click', 'tbody td, thead th:first-child', function (e) {
                            
                            $(this).parent().find('input[type="checkbox"]').trigger('click');
                        });

                        // Handle click on "Select all" control
                        $('thead input[name="select_all"]').on('click', function (e) {
                            
                            if (this.checked) {
                                $('#tblDataComisiones tbody input[type="checkbox"]:not(:checked)').trigger('click');
                            } else {
                                $('#tblDataComisiones tbody input[type="checkbox"]:checked').trigger('click');
                            }

                            // Prevent click event from propagating to parent
                            e.stopPropagation();
                        });

                        // Handle table draw event
                        tblDataComisiones.on('draw', function () {
                            
                            // Update state of "Select all" control
                            updateDataTableSelectAllCtrl(table);
                        });



                        tblDataComisiones.on("click", "tr", function () {
                            iPos = tblDataComisiones.fnGetPosition(this);
                            objSeleccionado = tblDataComisiones.fnGetData(iPos);
                        });
                        tblDataComisiones.on("change", "input", function () {
                            if (this.type != "checkbox") {
                                var valor = this.value;
                                var idComision = document.getElementById("tblDataComisiones").rows[iPos + 1].cells[0].innerText
                                objSeleccionado.TotalPagar = ((valor / 100) * objSeleccionado.PrecioTotal);
                                document.getElementById("tblDataComisiones").rows[iPos + 1].cells[4].innerText = objSeleccionado.TotalPagar;
                                document.getElementById("tblDataComisiones").rows[iPos + 1].cells[4].innerHTML = objSeleccionado.TotalPagar;
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
                        tblDataComisiones.dataTable().fnClearTable();
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