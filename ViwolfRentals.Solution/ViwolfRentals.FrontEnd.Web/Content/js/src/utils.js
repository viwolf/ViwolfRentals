var utils = function () {
    var lockedUrl = '/Account/Locked';
    var loginUrl = "/Account/Login?ReturlUrl=";
    var logOffUrl = "/Account/Logoff";
    var logoutMessage = 'Su sesi\u00F3n expir\u00F3. Por favor, vuelva a ingresar sus credenciales';
    var idleSeconds = 1000;
    var site = window.location.protocol + "//" + window.location.hostname + '/Gmg.Sapv.FrontEnd.Web/';
    var loginShowed = false;
    var error500Message = "Ocurrió un error de sistema: ";
    var error404Message = "El recurso que intenta accesar, no existe!";
    var waitingDialog = null;
    var oldIE;
    var tableIdentifier = $('#detail-table');
    var configuracion = null;
    var ssoModalUrl = '';
    tablaConfiguracion = [];
    arregloNombreColumnas = [];
    var keyCodeEnter = 13;
    var configuracionTablas = null;

    var fnImports = function (path) {

        document.write('<scr' + 'ipt type="text/javascript" src="' + path + '" ></scr' + 'ipt>');
    }

    var fnCreateGuid = function () {

        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
    }

    var fnSoloLetras = function (e) {
        this.value = this.value.replace(/[^a-zA-Z+\s]/g, '');
    };

    $.fn.enterKey = function (fnc) {
        return this.each(function () {
            $(this).keypress(function (ev) {
                var keycode = (ev.keyCode ? ev.keyCode : ev.which);
                if (keycode == keyCodeEnter) {
                    fnc.call(this, ev);
                }
            })
        })
    }

    var fnFormat = function (str, col) {
        col = typeof col === 'object' ? col : Array.prototype.slice.call(arguments, 1);

        return str.replace(/\{\{|\}\}|\{(\w+)\}/g, function (m, n) {
            if (m == "{{") { return "{"; }
            if (m == "}}") { return "}"; }
            return col[n];
        });
    };

    String.prototype.replaceAll = function (search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };


    $(function () {
        switchTheme();
        navToggleRight();
        navToggleLeft();
        navToggleSub();
        profileToggle();
        widgetToggle();
        widgetClose();
        widgetFlip();
        tooltips();
        initMessage();
        setValidationMessages();
        setValidatorAddMethod();
    });



    function estilosModalTarjeta(tabla) {

        //$("#tblTarjetasRegalo_wrapper>div>div").removeClass("col-sm-6").addClass("col-sm-4 pull-right");
        $(tabla + "_wrapper>div>div").removeClass("col-sm-6").addClass("col-sm-4 pull-right");

        $("#btnGuardarTarjeta").css("margin-right", "20px");
    };

    var FnOnlyNumeral = function (element, maxLength) {
        $(element).keypress(function (event) {

            num = $(this).val();
            num = isNaN(num) || num === '' || num === null ? 0 : num;
            if (num.length >= maxLength) {
                event.preventDefault();
            }
        });
    }

    var FnOnlyDecimal = function (element, decimals, maxLength) {
        $(element).keypress(function (event) {
            num = $(this).val();
            num = isNaN(num) || num === '' || num === null ? 0.00 : num;
            if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
                event.preventDefault();

            }
            if ($(this).val() == parseFloat(num).toFixed(decimals)) {
                event.preventDefault();
            }
            var res = $(this).val().split(".");
            if (res[0].length >= maxLength) {
                event.preventDefault();
            }
        });
    }


    var cargarColumnas = function (Tabla) {
        try {
            var oUrl = 'Common/CargarTablas';
            var newUrl = utils.fnSiteUrl() + oUrl;
            var oData =
                {
                    NombreTabla: Tabla
                };
            var oProcessMessage = '';
            utils.fnExecuteWithResult(null, newUrl, oData, oProcessMessage, cargarConfiguracionTablaFinalizada);
        }
        catch (e) {
            msjApp.fnShowErrorMessage(e.message);
        }
    };

    var cargarConfiguracionTablaFinalizada = function (result) {

        configuracionTablas = result.Data;
    };

    var validarCargarColumnas = function (estado, classes) {
        arregloNombreColumnas = [];
        tablaConfiguracion = null;
        var tablas = $.grep(configuracionTablas, function (e) {
            return e.NombreTabla == estado;
        });
        tablaConfiguracion = tablas;

        for (var i = 0; i < tablas.length; i++) {

            arregloNombreColumnas.push({
                "sTitle": tablas[i].Nombre,
                "sClass": tablas[i].Titulo == "Nombre" ? 'text_Left' : tablas[i].Interno == true ? 'hide_me' : classes || '',
                //"sClass": tablas[i].Interno == true ? 'hide_me' : classes || '',
                "aTargets": [i]
            });
        };
    };

    /// <summary>
    /// Nombre: fnGetSelectedRow.
    /// Descripcion:  Function encargado de la inicialización de la tabla que se reciba por parametro como un widget de tipo datatables.
    /// Fecha de creación: 27-04-2015
    /// Autor: jquesada
    /// 
    /// Modificaciones:
    /// -----------------------------------------------------------------------------
    /// Número: 
    /// Ticket: 
    /// Descripcion:
    /// Fecha de creación:
    /// Autor:
    /// -----------------------------------------------------------------------------
    /// </summary>
    //var fnInitDatatables = function (oTable, configuracion, UsaCheckBox) {
    var fnInitDatatables = function (oTable, configuracion) {
        var rows_selected = [];
        if (configuracion.Ordenamiento == undefined || configuracion.Ordenamiento == null) {
            configuracion.Ordenamiento = [[1, 'asc']];
        }
        var dataTableArgs = {
            "scrollX": true,
            responsive: {
                details: {
                    type: 'column'
                },
            },

            //columnDefs: [{
            //    'targets': 0,
            //    'searchable': false,
            //    'orderable': false,
            //    'render': function (data, type, full, meta){
            //return '<input type="checkbox" name="id[]" value="' 
            //   + $('<div/>').text(data).html() + '">';}
            //}],
            select: {
                style: 'os',
                selector: 'td:first-child'
            },
            fnCreatedRow: function (nRow, aData, iDataIndex) {
                // 
                // nRow - this is the HTML element of the row
                // aData - array of the data in the columns. Get column 4 data: aData[3]
                // iDataIndex - row index in the table
                // Append to the first column
                if (configuracion.Detalle != undefined) {

                    $.each(configuracion.Detalle, function (index, data) {
                        if (!data.Datos) {
                            // 
                            //$('td:eq(0)', nRow).html('<input type="checkbox" name="checkbox" class="checkbox" value="' + aData.Id + '">');
                            //$('td:eq(' + index + ')', nRow).html(data.DataSource.replace('@Texto', aData[index]).replace('@disabled', aData[index] == 'Si' ? '' : 'disabled').replace('@esdevuelto', aData[index] == true ? 'disabled' : '').replace('@checked', aData[index] == true ? 'checked' : '').replace('@IdFacturaDetalle', aData[index]));
                            $('td:eq(' + index + ')', nRow).html(data.DataSource.replace('@Texto', aData[index]).replace('@disabled', aData[index] == 'Si' || aData[index] != '' && aData[index] != 'No' ? '' : 'disabled').replace('@Serie', aData[index] != '' ? aData[index] == 'Si' ? '' : aData[index] : '').replace('@esdevuelto', aData[index] == true ? 'disabled' : '').replace('@checked', aData[index] == true ? 'checked' : '').replace('@IdFacturaDetalle', aData[index]));
                        }

                    });
                }
                // 
                if (configuracion) {

                    if (configuracion.UsaChekBox)
                        $('td:eq(' + configuracion.PosicionCheckBox + ')', nRow).html("<input  type='checkbox' name='id[]' value=''>");

                    if (configuracion.UsaChekBoxExtragarantia) {

                        $('td:eq(' + configuracion.PosicionCheckBox + ')', nRow).html("<input  type='checkbox' name='id[]' value='' @checked>".replace('@checked', aData[configuracion.PosicionCheckBox + 1] == true ? 'checked' : ''));
                        //$('td:eq(' + configuracion.PosicionCheckBox + ')', nRow).html(data.DataSource.replace('@Texto', aData[index]).replace('@checked', aData[index] == 'Si' ? '' : 'checked'));
                    }
                    if (configuracion.UsaTextbox)

                        $('td:eq(' + configuracion.PosicionTextbox + ')', nRow).html("<input id='campoTexto' type='" + configuracion.TipoTextbox + "' value=''></input>");

                    if (configuracion.BotonEliminar)
                        $('td:eq(' + configuracion.PosicionBotonEliminar + ')', nRow).html("<button id='botonEliminar' class='btn btn-link pe-7s-trash text-danger' type='button' style='font-size:20px'></button>");

                    if (configuracion.UsaExtragarantia) {
                        $('td:eq(' + configuracion.PosicionCombo + ')', nRow).html(configuracion.SelectComboExtragarantia);
                    }

                    if (configuracion.UsaBoton)
                        $('td:eq(' + configuracion.PosicionBoton + ')', nRow).html("<button class='btn btn-success btn-info-tarjeta'><i class='fa fa-info'></i></button>");
                    //if (configuracion.UsaBotonArticulosRelacionados)
                    //    $('td:eq(' + configuracion.PosicionBotonArticulosRelacionados + ')', nRow).html("<button id='botonPlanPago' class='btn w-xs btn-primary pe-7s-upload pe-7s-news-paper' type='button' style='font-size:12px'></button>");
                    //if (configuracion.UsaBotonArticulosSustitutos)
                    //    $('td:eq(' + configuracion.PosicionBotonArticulosSustitutos + ')', nRow).html("<button id='botonPlanPago' class='btn w-xs btn-primary pe-7s-upload pe-7s-news-paper' type='button' style='font-size:12px'></button>");

                    if (configuracion.UsaSwitch) {

                        var $check = '';
                        if (aData[configuracion.SwitchValuePosition])
                            $check = "checked";
                        $('td:eq(' + configuracion.PosicionSwitch + ')', nRow).html("<div name='rowSwtch'><span class='onoffswitch'><input type='checkbox' " + $check + " data-value='cellvalue' class='onoffswitch-checkbox' id='chActivo_" + aData[configuracion.SwitchIdPosition] + "' name='chActivo_" + aData[configuracion.SwitchIdPosition] + "' data-id='" + aData[configuracion.SwitchIdPosition] + "' data-info='" + JSON.stringify(configuracion.SwitchDataInfo) + "'> <label class='onoffswitch-label' for='chActivo_" + aData[configuracion.SwitchIdPosition] + "'><span class='onoffswitch-inner' data-swchon-text='ON' data-swchoff-text='OFF'></span><span class='onoffswitch-switch'></span></label></span><div class='onoffswitch-container'><span class='onoffswitch-title'> </span></div></div>");

                    }
                    if (configuracion.UsaSwitchD) {

                        var $check1 = '';
                        if (aData[configuracion.SwitchValuePosition])
                            $check1 = "checked";
                        $('td:eq(' + configuracion.PosicionSwitch + ')', nRow).html("<div name='rowSwtch'><span class='onoffswitch'><input type='checkbox' " + $check1 + " data-value='cellvalue' class='onoffswitch-checkbox' id='chActivo_" + aData[configuracion.SwitchIdPosition] + "' name='chActivo_" + aData[configuracion.SwitchIdPosition] + "' data-id='" + aData[configuracion.SwitchIdPosition] + "' data-info='" + JSON.stringify(configuracion.SwitchDataInfo) + "' disabled = 'true'> <label class='onoffswitch-label' for='chActivo_" + aData[configuracion.SwitchIdPosition] + "'><span class='onoffswitch-inner' data-swchon-text='ON' data-swchoff-text='OFF'></span><span class='onoffswitch-switch'></span></label></span><div class='onoffswitch-container'><span class='onoffswitch-title'> </span></div></div>");

                    }
                    
                    if (configuracion.UsaBotonOjo)
                        $('td:eq(' + configuracion.PosicionBotonOjo + ')', nRow).html("<div><button id='botonOjo' class='fa fa-2x fa-eye color-white " + configuracion.PosicionBotonOjoClass + "' data-id='" + aData[configuracion.PosicionBotonEditarIdPosition] + "' type='button' style='font-size:20px'></button></div>");


                    if (configuracion.UsaBotonEditar)
                        $('td:eq(' + configuracion.PosicionBotonEditar + ')', nRow).html("<div><button id='botonEditar' class='fa fa-2x fa-pencil color-white " + configuracion.PosicionBotonEditarClass + "' data-id='" + aData[configuracion.PosicionBotonEditarIdPosition] + "' type='button' style='font-size:20px'></button></div>");

                    //if (configuracion.UsaBotonEditarTarjetaRegalo)
                    //    $('td:eq(' + configuracion.PosicionBotonEditarTarjetaRegalo + ')', nRow).html("<div><button id='botonEditar' name='btnE_' class='btn btn-success btn-edit-tarjeta'><i class='fa fa-edit'></i></button></div>");

                    if (configuracion.UsaBotonInfoTarjetaRegalo)
                        $('td:eq(' + configuracion.PosicionBotonInfoTarjetaRegalo + ')', nRow).html("<div><button id='botonInfo' name='btnI_' class='btn btn-success btn-info-tarjeta'><i class='fa fa-info'></i></button></div>");

                    if (configuracion.RowCreated) {
                        configuracion.RowCreated(nRow, aData, iDataIndex);
                    }
                }

                
            },
            order: configuracion.Ordenamiento,
            rowCallback: function (row, data, dataIndex) {
                // Get row ID
                if (configuracion.UsaChekBox) {
                    var rowId = data[configuracion.PosicionCheckBox];

                    // If row ID is in the list of selected row IDs
                    if ($.inArray(rowId, rows_selected) !== -1) {
                        $(row).find('input[type="checkbox"]').prop('checked', true);
                        $(row).addClass('selected');
                    }
                }
                if (configuracion.UsaEtiquetas) {
                    $(row).find('td:nth-child(1)').css("display", "none");
                    $(row).find('td:nth-child(2)').css("display", "none");
                    $(row).find('td:nth-child(3)').css("display", "none");
                    $(row).find('td:nth-child(4)').css("display", "none");
                    $(row).find('td:nth-child(6)').css("display", "none");
                }

                //if (configuracion.UsaExtragarantia) {
                //$(row).find('td:nth-child(17)').css("display", "none");
                //$(row).find('td:nth-child(18)').css("display", "none");
                //$(row).find('td:nth-child(19)').css("display", "none");
                //}

                if (configuracion.UsaEntradaMercaderia) {
                    $(row).find('td:nth-child(8)').css("display", "none");
                    $(row).find('td:nth-child(9)').css("display", "none");
                    $(row).find('td:nth-child(10)').css("display", "none");

                }
                if (configuracion.UsaEntradaPorAjuste) {
                    $(row).find('td:nth-child(10)').css("display", "none");
                }
                if (configuracion.UsaSalidaMercaderia) {
                    $(row).find('td:nth-child(09)').css("display", "none");
                    $(row).find('td:nth-child(10)').css("display", "none");
                }
                if (configuracion.usaDepositos) {
                    $(row).find('td:nth-child(04)').css("display", "none");
                }
                if (configuracion.usaVoucher) {
                    $(row).find('td:nth-child(02)').css("display", "none");
                    $(row).find('td:nth-child(03)').css("display", "none");
                    $(row).find('td:nth-child(04)').css("display", "none");
                    $(row).find('td:nth-child(12)').css("display", "none");
                    //$(row).find('td:nth-child(12)').css("display", "none");
                    $(row).find('td:nth-child(17)').css("display", "none");
                    $(row).find('td:nth-child(23)').css("display", "none");
                    $(row).find('td:nth-child(24)').css("display", "none");
                    $(row).find('td:nth-child(25)').css("display", "none");
                    $(row).find('td:nth-child(26)').css("display", "none");
                    $(row).find('td:nth-child(27)').css("display", "none");
                }

                if (configuracion.usaCliente) {


                }
            },
            order: configuracion.Ordenamiento,
            "aoColumns": configuracion.Columnas != null ? configuracion.Columnas : null,
            "fnInitComplete": function () {
                oTable.fnAdjustColumnSizing(true);
            },
            "language": {
                "sProcessing": "Procesando...",
                "sLengthMenu": "Mostrar _MENU_ registros",
                "sZeroRecords": "No se encontraron resultados",
                "sEmptyTable": "Ning\u00FAn dato disponible en esta tabla",
                "sInfo": "Registros del _START_ al _END_ de un total de _TOTAL_",
                "sInfoEmpty": "Registros del 0 al 0 de un total de 0",
                "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix": "",
                "sSearch": "Buscar:",
                "sUrl": "",

                "sInfoThousands": ",",
                "sLoadingRecords": "Cargando...",
                "bAutoWidth": true,
                "oPaginate": {
                    "sFirst": "Primero",
                    "sLast": "Último",
                    "sNext": "Siguiente",
                    "sPrevious": "Anterior"
                },
                "oAria": {
                    "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                }
            },
            dom: "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs'l>r>" +
                    'T<"clear">t' +
                "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
            tableTools: {
                "sRowSelect": "single",
                "aButtons": []
            }
        };

        oTable = oTable.on('page.dt', function (evt) {
            setTimeout(function () {
                fnApplyLeftAligment(oTable);
            }, 50);
        }).dataTable(dataTableArgs);

        if (configuracion) {
            if (configuracion.UsaSwitch) {

                oTable.on('click', 'tbody tr input[type="checkbox"]', function (e) {
                    var $this = $(this);
                    var $arr = jQuery.parseJSON(JSON.stringify($this.data("info")));
                    var $check = $("#chActivo_" + $this.data("id")).is(":checked");
                    if (!$check) {
                        if (configuracion.UsaSwitchConfirmationMessage !== undefined && !$check) {
                            msjApp.fnShowConfirm(configuracion.UsaSwitchConfirmationMessage, function () {
                                fnCreatInputsSwitch($this, $arr);
                                mostrarBotones("divGuardar");
                                mostrarBotones("divMantenimientoPromociones");

                            }, function () {
                                $("#chActivo_" + $this.data("id")).prop('checked', true);
                            });

                        } else {
                            fnCreatInputsSwitch($this, $arr);
                            mostrarBotones("divGuardar");
                            mostrarBotones("divMantenimientoPromociones");

                        }
                    }
                    else {
                        if (configuracion.UsaSwitchConfirmationMessageActivar !== undefined && $check) {

                            msjApp.fnShowConfirm(configuracion.UsaSwitchConfirmationMessageActivar, function () {
                                fnCreatInputsSwitch($this, $arr);
                                mostrarBotones("divGuardar");
                                mostrarBotones("divMantenimientoPromociones");

                            }, function () {
                                $("#chActivo_" + $this.data("id")).prop('checked', false);
                            });


                        } else {
                            fnCreatInputsSwitch($this, $arr);
                            mostrarBotones("divGuardar");
                            mostrarBotones("divMantenimientoPromociones");
                        }

                    }



                });

            }
        }

        if (configuracion.hasOwnProperty('headerConfig'))
            fnApplyHeaderStyleDataTable(configuracion.headerConfig);

        return oTable;
    }

    function fnCreatInputsSwitch($this, $arr) {

        $.each($arr, function (index, group) {
            var $obj = $this.closest("tr").children('td:eq(' + group.Posicion + ')');
            var $id = group.idName + $this.data("id");
            var $val = $('#' + $id).val();

            if ($val === undefined)
                $val = $obj.html();

            var $class = '';

            if (group.class != '' || group.class !== undefined)
                $class = group.class;

            var tamano = group.maxLenght == undefined ? '' : group.maxLenght

            $obj.html("<input id='" + $id + "' maxlength='" + tamano + "' type='" + group.InputType + "' value='' class='textDin " + $class + "' data-id='" + $this.data("id") + "' ></input>");

            $('#' + $id).val($val);

        });
    }

    function mostrarBotones(idElemento) {

        $("#" + idElemento).removeClass("displayNone");
    }

    function setMessagesSelect2() {
        //"use strict";

        (function ($) {
            $.extend($.fn.select2.defaults, {
                formatNoMatches: function () { return "No se encontraron resultados"; },
                formatInputTooShort: function (input, min) { var n = min - input.length; return "Por favor adicione " + n + " caracter" + (n == 1 ? "" : "es"); },
                formatInputTooLong: function (input, max) { var n = input.length - max; return "Por favor elimine " + n + " caracter" + (n == 1 ? "" : "es"); },
                formatSelectionTooBig: function (limit) { return "Solo puede seleccionar " + limit + " elemento" + (limit == 1 ? "" : "s"); },
                formatLoadMore: function (pageNumber) { return "Cargando más resultados..."; },
                formatSearching: function () { return "Buscando..."; }
            });
        })(jQuery);
    };

    function setDatePicker() {
        /* Inicialización en español para la extensión 'UI date picker' para jQuery. */
        /* Traducido por Vester (xvester [en] gmail [punto] com). */

        jQuery(function ($) {
            $.datepicker.regional['es'] = {
                closeText: 'Limpiar',
                prevText: '<i class="fa fa-chevron-left"></i>',
                nextText: '<i class="fa fa-chevron-right"></i>',
                currentText: 'Hoy',
                monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado'],
                dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sab'],
                dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
                weekHeader: 'Sm',
                dateFormat: 'dd/mm/yy',
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: false,
                showButtonPanel: true,
                //showOn: "button",
                buttonImage: "Content/img/calendar.gif",
                buttonText: "Ver calendario",
                onClose: function () {
                    var event = arguments.callee.caller.caller.arguments[0];
                    // If "Clear" gets clicked, then really clear it
                    if ($(event.delegateTarget).hasClass('ui-datepicker-close')) {
                        $(this).val('');
                    }
                },
                maxDate: '0',
                autoclose: true
            };
            $.datepicker.setDefaults($.datepicker.regional['es']);

        });
    };

    function getDate(date) {
        let d = null;

        try {
            d = $.datepicker.parseDate('dd/mm/yy', date);
        } catch (err) {
            d = new Date(date);
        }

        return d;
    };

    function setValidationMessages() {
        $.extend(jQuery.validator.messages, {
            required: "Valor requerido",
            remote: "Corrija este valor",
            email: "Ingrese un email valido",
            url: "Ingrese una url v&aacute;lida",
            date: "Ingrese una fecha v&aacute;lida",
            dateISO: "Ingrese una fecha ISO v&aacute;lida",
            number: "Ingrese un n&uacute;mero v&aacute;lido",
            digits: "Ingrese solo d&iacute;gitos",
            creditcard: "Ingrese un n&uacute;mero de tarjeta v&aacute;lida",
            equalTo: "Ingrese el mismo valor",
            accept: "Ingrese una extensi&oacute;n v&aacute;lida",
            maxlength: jQuery.validator.format("Ingres&oacute; m&aacute;s de {0} caracteres"),
            minlength: jQuery.validator.format("Ingrese por lo menos {0} caracteres"),
            rangelength: jQuery.validator.format("Ingrese un valor con {0} a {1} caracteres"),
            range: jQuery.validator.format("Ingrese un valor entre {0} y {1}"),
            max: jQuery.validator.format("Ingrese un valor menor o igual a {0}"),
            min: jQuery.validator.format("Ingrese un valor mayor o igual a {0}"),
            notEqual: jQuery.validator.format("Ingrese un valor difenre a {0}")
        });
    }


    function setValidatorAddMethod() {
        jQuery.validator.addMethod("notEqual", function (value, element, param) {
            return this.optional(element) || value != $(param).val();
        }, "This has to be different...");
    };


    var switchTheme = function () {
        $('.theme-style-wrapper').click(function () {
            $('#main-wrapper').attr('class', '');
            var themeValue = $(this).data('theme');
            $('#main-wrapper').addClass(themeValue);
        });
    };

    var navToggleRight = function () {
        $('#toggle-right').on('click', function () {
            $('#sidebar-right').toggleClass('sidebar-right-open');
            $("#toggle-right .fa").toggleClass("fa-indent fa-dedent");

        });
    };

    var customCheckbox = function () {
        $('input.icheck').iCheck({
            checkboxClass: 'icheckbox_flat-grey',
            radioClass: 'iradio_flat-grey'
        });
    }

    var navToggleLeft = function () {
        $('#toggle-left').on('click', function () {
            var bodyEl = $('#main-wrapper');
            ($(window).width() > 767) ? $(bodyEl).toggleClass('sidebar-mini') : $(bodyEl).toggleClass('sidebar-opened');
        });
    };

    var navToggleSub = function () {
        var subMenu = $('.sidebar .nav');
        $(subMenu).navgoco({
            caretHtml: false,
            accordion: true
        });

    };

    var profileToggle = function () {
        $('#toggle-profile').click(function () {
            $('.sidebar-profile').slideToggle();
        });
    };

    var widgetToggle = function () {
        $(".actions > .fa-chevron-down").click(function () {
            $(this).parent().parent().next().slideToggle("fast"), $(this).toggleClass("fa-chevron-down fa-chevron-up")
        });
    };

    var widgetClose = function () {
        $(".actions > .fa-times").click(function () {
            $(this).parent().parent().parent().fadeOut()
        });
    };

    var widgetFlip = function () {
        $(".actions > .fa-cog").click(function () {
            $(this).closest('.flip-wrapper').toggleClass('flipped')
        });
    };

    var dateRangePicker = function () {
        $('.reportdate').daterangepicker({
            format: 'YYYY-MM-DD',
            startDate: '2014-01-01',
            endDate: '2014-06-30'
        });
    };

    var tooltips = function () {
        $('.tooltip-wrapper').tooltip({
            selector: "[data-toggle=tooltip]",
            container: "body"
        })
    };

    var sliders = function () {
        $('.slider-span').slider()
    };

    function isValidEmail(email) {
        //return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email);
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    /// <summary>
    /// Function: formValidation
    /// Descripcion: 
    /// Fecha de creación: 22-04-2015
    /// Autor: 
    /// 
    /// Modificaciones:
    /// -----------------------------------------------------------------------------
    /// Número: 
    /// Ticket: 
    /// Descripcion:
    /// Fecha de creación:
    /// Autor:
    /// -----------------------------------------------------------------------------
    /// </summary>
    var formValidation = function () {
        $('#form').validate({
            rules: {
                input1: {
                    required: true
                },
                input2: {
                    minlength: 5,
                    required: true
                },
                input3: {
                    maxlength: 5,
                    required: true
                },
                input4: {
                    required: true,
                    minlength: 4,
                    maxlength: 8
                },
                input5: {
                    required: true,
                    min: 5
                },
                input6: {
                    required: true,
                    range: [5, 50]
                },
                input7: {
                    minlength: 5
                },
                input8: {
                    required: true,
                    minlength: 5,
                    equalTo: "#input7"
                },
                input9: {
                    required: true,
                    email: true
                },
                input10: {
                    required: true,
                    url: true
                },
                input11: {
                    required: true,
                    digits: true
                },
                input12: {
                    required: true,
                    phoneUS: true
                },
                input13: {
                    required: true,
                    minlength: 5
                }
            },
            highlight: function (element) {
                $(element).closest('.form-group').removeClass('success').addClass('error');
            },
            success: function (element) {
                element.text('OK!').addClass('valid')
                    .closest('.form-group').removeClass('error').addClass('success');
            }
        });
    }


    function isLoginShown() {
        return loginShowed;
    }

    function logOffNavigate() {
        window.location.replace(site + logOffUrl);
        //navigateAjax(null, logOffUrl, 1);
    }

    function doLogout() {
        //showInfoMessage(logoutMessage);
        showLockedScreen();
        //navigateAjax(null, loginUrl, 1);
    }

    function showLockedScreen() {
        loginShowed = true;
        $('#ssoFrame').attr('src', ssoModalUrl.replace(/&amp;/g, '&'));
        //$('#password').val('');
        //$('#password').css({ 'display': 'block' });
        $('#popupLockedScreen').modal('show');
    }

    function hideLockedScreen() {
        loginShowed = false;
        $('#ssoFrame').attr('src', '');
        //$('#password').val('');
        //$('#password').css({ 'display': 'none' });
        $('#popupLockedScreen').modal('hide');
    }
    var initMessage = function () {
        var loc = ['top', 'right'];
        var style = 'flat';

        var $output = $('.controls output');
        var $lsel = $('.location-selector');
        var $tsel = $('.theme-selector');

        var update = function () {
            var classes = 'messenger-fixed';

            for (var i = 0; i < loc.length; i++)
                classes += ' messenger-on-' + loc[i];

            $.globalMessenger({ extraClasses: classes, theme: style });
            Messenger.options = { extraClasses: classes, theme: style };

            $output.text("Messenger.options = {\n    extraClasses: '" + classes + "',\n    theme: '" + style + "'\n}");
        };

        update();
    }

    function handleAjaxError(request, status, error) {
        if (request.status == 401) {
            doLogout();
        }
        else if (request.status == 404) {
            showErrorMessage(error404Message, request);
        }
        else if (request.status == 500) {
            showErrorMessage(error500Message + error, request);
        }

    }



    function GMGAsyncHtml(url, resultFunction) {
        this.Url = url;
        this.ResultFunction = resultFunction;
        this.CallBackEjecutado = false;
    }

    function fnExecute(e, oUrl, oData, oProcessMessage, oInfoMessage, oErrorMessage) {
        e.preventDefault();
        var success = function (data) {
            if (data.hasOwnProperty('ErrorMessage')) {
                utils.showErrorMessage(oErrorMessage, oUrl);

                return false;
            }

            utils.showSuccessMessage(oInfoMessage);

            return true;
        };

        try {

            var calls = [new GMGAsyncJSON(oUrl, JSON.stringify(oData), success)];

            utils.doJsonAsyncPostBack(oProcessMessage, calls, null, utils.standarErrorHandler);

        }
        catch (e) {
            utils.showErrorMessage(e.message, oUrl);
        }
    };

    function fnExecuteWithResult(e, oUrl, oData, oProcessMessage, success, opts) {
        
        opts = opts || {};

        if (e !== null)
            e.preventDefault();

        try {
            var calls = [new GMGAsyncJSON(oUrl, JSON.stringify(oData), success, opts)];

            doJsonAsyncPostBack(oProcessMessage, calls, null, utils.standarErrorHandler);

        } catch (e) {
            showErrorMessage(e.message, oUrl);
        }
    };


    function fnExecuteParallelWithResult(oProcessMessage, calls) {

        try {
            doJsonAsyncPostBack(oProcessMessage, calls, null, utils.standarErrorHandler);

        } catch (e) {
            showErrorMessage(e.message, '');
        }
    };

    /// <summary>
    /// Function: showErrorMessage
    /// Descripcion: Metodo encargado de mostrar mensajes de error en el aplicativo.
    /// Fecha de creación: 24-04-2015
    /// Autor: jquesada
    /// 
    /// Modificaciones:
    /// -----------------------------------------------------------------------------
    /// Número: 
    /// Ticket: 
    /// Descripcion:
    /// Fecha de creación:
    /// Autor:
    /// -----------------------------------------------------------------------------
    /// </summary>
    //var showErrorMessage = function (msg) {

    //if (typeof oUrl === 'undefined') { myVariable = ''; }

    // messageModal.fnShowMessageModal(msg, oUrl);

    //    //Messenger().post({
    //    //    message: msg,
    //    //    type: 'error',
    //    //    showCloseButton: true,
    //    //    hideAfter: 3
    //    //});
    //}

    var showErrorMessage = function (msg, oUrl) {
        msjApp.fnShowErrorMessage(msg, '', oUrl);
    }

    /// <summary>
    /// Function: showWarningMessage
    /// Descripcion: Metodo encargado de mostrar mensajes de error en el aplicativo.
    /// Fecha de creación: 24-04-2015
    /// Autor: jsantamaria
    /// 
    /// Modificaciones:
    /// -----------------------------------------------------------------------------
    /// Número: 
    /// Ticket: 
    /// Descripcion:
    /// Fecha de creación:
    /// Autor:
    /// -----------------------------------------------------------------------------
    /// </summary>
    var showInfoMessage = function (msg) {
        Messenger().post({
            message: msg,
            type: 'error',
            showCloseButton: true,
            hideAfter: 3
        });
    }

    /// <summary>
    /// Function: showSuccessMessage
    /// Descripcion: Metodo encargado de mostrar mensajes de error en el aplicativo.
    /// Fecha de creación: 24-04-2015
    /// Autor: jquesada
    /// 
    /// Modificaciones:
    /// -----------------------------------------------------------------------------
    /// Número: 
    /// Ticket: 
    /// Descripcion:
    /// Fecha de creación:
    /// Autor:
    /// -----------------------------------------------------------------------------
    /// </summary>
    var showSuccessMessage = function (msg) {
        Messenger().post({
            message: msg,
            type: 'success',
            showCloseButton: true,
            hideAfter: 3
        });
    }

    var showWaitingDialog = function (msg) {

        waitingDialog = new ajaxLoader(document.body, { msg: msg, classOveride: 'blue-loader', bgColor: '#000', height: '100%' });
    }

    var showHideDialog = function (msg) {
        waitingDialog.remove();
    }

    var standarErrorHandler = function (error) {
        if (error !== undefined) {
            if (error instanceof Error)
                utils.showErrorMessage(error.message);
            else {
                utils.showErrorMessage(JSON.stringify(error));
            }
        }
    };

    var doJsonAsyncPostBack = function (waitMessage, calls, postThenCall, errorCall) {
        if (!window.navigator.onLine) {
            if (fnCheckObject(errorCall))
                errorCall(new Error('No hay conexion a internet en este momento'));

            else
                showErrorMessage('No hay conexion a internet en este momento', calls);

            return;
        }

        if (fnCheckObject(waitMessage, true))
            showWaitingDialog(waitMessage);

        calls.forEach(call => {
            if (call instanceof GMGAsyncHtml) {
                $.get(call.Url, null, 'html');

                if (fnCheckObject(waitMessage, true))
                    utils.fnShowHideDialog();

            } else {
                let configAjax = {
                    url: call.Url,
                    type: "POST",
                    async: true,
                    timeout: 600000, //Se establece en 10 minutos
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    success: (data, textStatus, jqXHR) => {
                        if (fnCheckObject(jqXHR.getResponseHeader("X-Responded-Json")))
                            if (JSON.parse(jqXHR.getResponseHeader("X-Responded-Json")).status == 401)
                                doLogout();

                            else if (jqXHR.statusCode().status == 401)  //Error
                                doLogout();

                        if (fnCheckObject(data, true)) {
                            if (data.Resultado != undefined)//Error
                                showErrorMessage(data.Mensaje, call.Url);

                            else
                                call.ResultFunction(data);
                        }
                    },
                    error: (request, status, error) => {
                        if (fnCheckObject(errorCall))
                            errorCall(ex);

                        handleAjaxError(request, status, error, call.Url);
                    },
                    complete: (jqXHR, textStatus) => {
                        if (fnCheckObject(waitMessage, true))
                            utils.fnShowHideDialog();
                    }
                };

                if (fnCheckObject(call.Args, true))
                    configAjax['data'] = call.Args;


                if (fnCheckObject(call.opts, true)) {

                    if (call.opts.hasOwnProperty('type'))
                        configAjax['type'] = call.opts.type;

                    if (call.opts.hasOwnProperty('dataType'))
                        configAjax['dataType'] = call.opts.dataType;

                    if (call.opts.hasOwnProperty('contentType'))
                        configAjax['contentType'] = call.opts.contentType;

                    if (call.opts.hasOwnProperty('beforeSend'))
                        configAjax['beforeSend'] = call.opts.beforeSend;

                    if (call.opts.hasOwnProperty('complete')) {
                        let tmp = configAjax['complete'];

                        configAjax['complete'] = (jqXHR, textStatus) => {
                            call.opts.complete(jqXHR, textStatus);
                            tmp(jqXHR, textStatus);
                        };
                    }
                }

                $.ajax(configAjax);
            }
        });
    };


    function handleAjaxError(request, status, error, oUrl) {
        if (request.status == 401) {
            doLogout();
        }
        else if (request.status == 404) {
            showErrorMessage(error404Message, oUrl);
        }
        else if (request.status == 500) {
            showErrorMessage(error500Message + error, oUrl);
        }

    }

    function fnExecute(e, oUrl, oData, oProcessMessage, oInfoMessage, oErrorMessage) {
        e.preventDefault();
        var success = function (data) {
            if (data.hasOwnProperty('ErrorMessage')) {
                utils.showErrorMessage(oErrorMessage);

                return false;
            }

            utils.showSuccessMessage(oInfoMessage);

            return true;
        };

        try {

            var calls = [new GMGAsyncJSON(oUrl, JSON.stringify(oData), success)];

            utils.doJsonAsyncPostBack(oProcessMessage, calls, null, utils.standarErrorHandler);

        }
        catch (e) {
            utils.showErrorMessage(e.message);
        }
    };

    function fnExecuteWithResultSync(url, data, message, success, error) {
        try {

            $.ajax({
                type: 'POST',
                url: url,
                data: JSON.stringify(data),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                async: false,
                success: success,
                error: error
            });

        } catch (err) {
            console.log('Ocurrio un error en el metodo: %s. \nUrl: %s. \nParams: %o. \nError: %o',
                'fnExecuteWithResultSync', url, data, err);
        }
    };

    function fnJsonArray(data) {
        return $.map(data, function (el) { return el; })
    }

    function getQueryStringItem(name, queryString) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(queryString);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    function oldBrowser() {
        return oldIE;
    }

    this.GetParameterByName = function (name) {
        var location = window.location.hash.split("?");
        if (location.length > 1)
            return getQueryStringItem(name.toLowerCase(), '?' + location[1].toLowerCase());
        else
            return "";
    }

    var mostrarModal = function (modal, configuracion) {
        configuracion.encabezado.text(configuracion.encabezadoMensaje);
        configuracion.cuerpo.text(configuracion.cuerpoMensaje);
        modal.modal('show');
    };

    var formatoFechaJson = function (fecha) {

        var parsedDate = new Date(parseInt(fecha.substr(6)));
        var jsDate = new Date(parsedDate); //Date object
        var dia = jsDate.getDate();
        var mes = (jsDate.getMonth() + 1);
        var anno = jsDate.getFullYear();
        fecha = dia + '/' + mes + '/' + anno;
        return fecha;
    };

    var fechaActual = function () {
        var fullDate = new Date();
        var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : '0' + (fullDate.getMonth() + 1);
        var currentDate = fullDate.getDate() + "/" + twoDigitMonth + "/" + fullDate.getFullYear();
        return currentDate;
    };

    var fnFormaFechaServer = function (fecha) {
        return fecha.split("/")[2] + '/' + fecha.split("/")[1] + '/' + fecha.split("/")[0];
    }

    //validate configuration from BD
    var cargarConfiguracion = function (nombrePantalla) {
        try {
            var oUrl = 'Cotizador/Home/CargarConfiguracion';
            var oData =
            {
                NombrePantalla: nombrePantalla
            };
            var oProcessMessage = 'Cargando configuracion, espere por favor...';
            fnExecuteWithResult(null, oUrl, oData, oProcessMessage, cargarConfiguracionFinalizada);
        }
        catch (e) {
            fnShowErrorMessage(e.message);
        }
    };

    var cargarConfiguracionFinalizada = function (result) {
        configuracion = result.Data;
        utils.fnValidarEstadoControles("Entrada");
    };

    var validarEstadoControles = function (estado) {

        var controles = $.grep(configuracion, function (e) {
            return e.NombreEstado == estado;
        });

        $.each(controles, function (index, value) {
            if (!$(value.Selector).data('select2'))
                $(value.Selector).prop('disabled', value.ValorEstado);
            else
                $(value.Selector).select2('enable', (!value.ValorEstado));
        });
    };

    var formatNumber = {

        separador: ",", // separador para los miles
        sepDecimal: '.', // separador para los decimales
        formatear: function (num) {
            num += '';
            var splitStr = num.split('.');
            var splitLeft = splitStr[0];
            var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1].substring(0, 2) : '';
            var regx = /(\d+)(\d{3})/;
            while (regx.test(splitLeft)) {
                splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
            }

            if (splitRight == '')
                splitRight = '.00'
            return this.simbol + splitLeft + splitRight;
        },
        new: function (num, simbol) {
            this.simbol = simbol || '';
            return this.formatear(num);
        }
    };

    //Funcion que obtiene el row de una tabla segun valor deseado
    var fnObtenerRow = function (table_id, arg1) {
        var oTable = $('#' + table_id).dataTable(),
            data = oTable.fnGetData(),
            row, i, l = data.length;

        for (i = 0; i < l; i++) {
            row = data[i];

            // columns to search are hard-coded, but you could easily pass this in as well
            //if ($.inArray(arg1, row) == 0 && $.inArray(arg2, row) == 1) {
            if (row[0] == arg1) {
                return $('#' + table_id + ' tr').eq(i + 1);
            }
        }
        return false;
    };

    var EsCombo = function (idDetalle1) {
        //var idDetalle1 = $(this).data('btndelete-id');
        //var row = utils.fnObtenerRow('tblDetalleDevolucion', idDetalle1);
        var oTable = $('#' + 'tblDetalleDevolucion').dataTable();
        var data = oTable.fnGetData();
        var idComboEliminar = 0;
        var rowPrueba = utils.fnObtenerRow('tblDetalleDevolucion', idDetalle1);
        idComboEliminar = rowPrueba[15];

        for (var i = 0; i < data.length; i++) {
            var row = data[i];

            if (row[0] == idDetalle1) {
                if (row[15] == 0) {
                    return false;
                }

            }

        }
        return true;
    };


    var init = function (ssoModal) {
        ssoModalUrl = ssoModal;
        $.idle(idleSeconds, function () {
            if (!loginShowed) {
                var urlLocked = lockedUrl;
                showLockedScreen();
            }

        });
    };

    var obtenerSimboloMonetario = function () {
        return argumentosInit.SimboloMonetario;
    };

    function fnCrearElemento(tag, options) {
        let elemento = document.createElement(tag);

        if (typeof options !== 'undefined' && options !== null) {
            if (options.hasOwnProperty('text'))
                $(elemento).text(options.text);

            if (options.hasOwnProperty('attrs'))
                options.attrs.forEach(function (val, index, arr) {
                    $(elemento).attr(val.name, val.value);
                });

            if (options.hasOwnProperty('classes'))
                options.classes.forEach(function (val, index, arr) {
                    $(elemento).addClass(val);
                });

            if (options.hasOwnProperty('props'))
                options.props.forEach(function (val, index, arr) {
                    $(elemento).prop(val.name, val.value);
                });

            if (options.hasOwnProperty('value'))
                $(elemento).val(options.value);
        }

        return elemento;
    };

    /**
    * Este metodo se encarga de buscar y cargar las etiquetas o textos configurables en la aplicación.
    *
    * @param params:
    *           Este objeto JSON contiene la siguiente estrcutura:
    *           {
    *               url: Indica el servicio Web que se desea consumir: Controller/Metodo
    *               mensaje: Indica un mensaje que se puede mostrar mientras se cargan los lables en la pantalla.
    *           }
    *
    * @param callback:
    *       Esta funcion es ejecutada cuando el Servicio Web es exitoso y es la encargada se poner los textos a los controles en la pantalla.
    */
    function fnLoadLables(params, callback) {
        try {
            fnExecuteWithResult(null, params.url, null, params.mensaje, function (result) {
                if (typeof result !== 'undefined' && result !== null && result.MessageType != 1)
                    callback(result.lables);

                else if (result.MessageType == 1) {
                    msjApp.fnShowErrorMessage(result.ErrorMessage, "fnLoadLables", params.url);
                    callback(null);
                }
            });
        } catch (err) {
            console.error('Ocurrio un error: %s, metodo: %s, url: %s', err.message, 'fnLoadLables', params.url);

            msjApp.fnShowErrorMessage(err, "fnLoadLables", params.url);
        }
    };

    function fnCapitalize(text) {
        let arr = fnCheckObject(text, true) ? text.split(' ') : [],
            capitalized = '';

        if (typeof arr !== 'undefined' && arr !== null)
            arr.forEach(function (val, index, arr) {
                capitalized += val.substring(0, 1).toUpperCase() + val.substring(1).toLowerCase();

                if (index < arr.length)
                    capitalized += ' ';
            });

        else
            capitalized = text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();

        return capitalized;
    };

    /**
    * Este metodo se encarga de aplicar el lineamiento a la izquierda a los textos que poseen gran cantidad de caracteres,
    * dentro de un dataTable.
    *
    * @param table
    *           Elemento de tipo dataTable al que se le aplicara el lineamiento a las columnas que poseean un texto mayor a los 60 caracteres.
    */
    function fnApplyLeftAligment(table) {
        try {
            if (table.is('table')) {
                const MAX_SIZE = 60;

                table.find('tbody tr td').
                    each(function (index, val) {
                        let text = $(val).text();

                        if (typeof text !== 'undefiend' || text !== null) {
                            if (text.length >= MAX_SIZE)
                                $(val).addClass('text-left');
                        }
                    });
            }
        } catch (err) {
            console.error('Ocurrio un error en el metodo: %s. %nMensaje: %s. %nparams: %o',
'fnApplyLeftAligment', err.message, table);
        }
    };

    /**
    * Esta funcion se encarga de convertir una fecha con formato UNIX a un objeto Date de JavaScript.
    */
    function fnUnixDateToDate(date) {
        return new Date(parseInt(date.match(/[0-9]+/)[0]));
    }

    function fnToDate(date) {
        if (typeof date === 'string' && date.startsWith('/Date('))
            return fnUnixDateToDate(date);

        return getDate(date);
    }

    /**
     * Este metodo se encarga de verificar si un objeto esta inicializado y no es nulo, ademas puede comprobar si no
     * esta vasio, siempre y cuando el objeto sea de tipo 'Array', 'String' o 'JSON', segun sus parametros.
     * 
     * @param obj
     *          Instancia que se desea comprobar.
     * 
     * @param [noEmpty]
     *          Este parametro es opcional e indica si se desea comprobar si el objeto esta vacio o no. Si no se especifica
     *          se toma el valor de 'false'.
     */
    function fnCheckObject(obj, noEmpty) {
        noEmpty = noEmpty || false;

        if (noEmpty && typeof obj !== 'number')
            return fnIsNotNull(obj) && fnIsNotEmpty(obj);

        else
            return fnIsNotNull(obj);

        function fnIsNotNull(obj) {
            return typeof obj !== 'undefined' && obj !== null;
        }

        function fnIsNotEmpty(obj) {
            let length = obj.length || 0;

            return length > 0 ||
                ($.isPlainObject(obj) && !$.isEmptyObject(obj));
        }
    };

    var _formatoPorcentaje = function (porcentaje) {

        porcentaje = porcentaje + '%';
        return porcentaje;
    };

    //Funcion que obtiene los checkbox de una tabla que tengan el mismo sku 145876
    var fnObtenerCheckBoxBySku = function (table_id, arg1, idComboSelected) {

        var checkBoxArray = Array();


        var oTable = $('#' + table_id).dataTable(),
            data = oTable.DataTable().rows().data(),
            row, i, l = data.length;

        for (i = 0; i < l; i++) {
            row = data[i];

            if (row[2] == arg1 && row[14] == true && row[15] == idComboSelected) {
                var row = $('#' + table_id + ' tr').eq(i + 1);
                var checkBox = row.find("[type=checkbox]");
                checkBoxArray.push(checkBox);
            }
            else {
                if (row[2] == arg1 && idComboSelected == 0) {
                    var row = $('#' + table_id + ' tr').eq(i + 1);
                    var checkBox = row.find("[type=checkbox]");
                    if (checkBox.is(':checked')) {
                        checkBoxArray.push(checkBox);
                        break;
                    }

                }
            }
        }
        return checkBoxArray;
    };



    //devuelve  los Rows de una tabla que tengan el mismo sku
    var fnObtenerRowsBySku = function (table_id, arg1, idComboSelected) {

        var rowsArray = Array();

        var oTable = $('#' + table_id).dataTable(),
            data = oTable.fnGetData(),
            row, i, l = data.length;

        for (i = 0; i < data.length; i++) {
            row = data[i];

            if (row[2] == arg1 && row[14] == true && row[15] == idComboSelected) {
                var row = data[i];

                rowsArray.push(row);
            }
            else {
                if (row[2] == arg1 && idComboSelected == 0) {
                    var row = data[i];

                    rowsArray.push(row);
                    break;
                }
            }
        }
        return rowsArray;
    };

    //devuelve conjunto de index a eliminar
    var fnGetAllIndex = function (data, sku, idComboSelected) {

        var indexArray = Array();

        for (var i = 0; i < data.length; i++) {
            var row = data[i];

            if (row[1] == sku && idComboSelected != 0 && idComboSelected == row[15]) {
                indexArray.push(i);
            }
            else {
                if (row[1] == sku && idComboSelected == 0) {
                    indexArray.push(i);
                    break;
                }
            }
        }
        return indexArray;
    };

    //devuelve el indice a eliminar
    var fnGetIndex = function (data, sku, idComboSelected) {

        var index = 0;

        for (var i = 0; i < data.length; i++) {
            var row = data[i];

            if (row[1] == sku && idComboSelected != 0 && idComboSelected == row[15]) {
                index = i;
                return index;
            }
            else {
                if (row[1] == sku && idComboSelected == 0) {
                    index = i;
                    return index;
                }
            }

        }

        return false;
    };

    function fnIsEmptytable(table) {
        var totalRecords = table.DataTable().page.info().recordsTotal;
        //test if dataTable is empty
        if (totalRecords === 0) {
            return true;
        }
        else {
            return false;
        }


    }

    /*
        Esta funcion es para poner un background color #07728e en la zona que esta y lo quita 
        Andres Quesada, UST
        11/15/16  */
    function fnAplicarZonaActiva(element, title) {
        element.addClass("zona-activa-accion").
               removeClass('zona-activa');
        if (fnCheckObject(title))
            title.addClass("zona-activa-accion-titulo").
            removeClass("zona-activa-titulo");


        $(".zona-activa input").blur(function () {
            $('.zona-activa-accion').addClass("zona-activa").
                removeClass("zona-activa-accion");
            $('.zona-activa-accion-titulo').addClass("zona-activa-titulo").
                removeClass("zona-activa-accion-titulo");
        });
    }

    function fnAplicarZonaActivaOne() {
        $('.zona-activa').addClass("zona-activa-accion").
            removeClass("zona-activa");
        $('.zona-activa-titulo').addClass("zona-activa-accion-titulo").
            removeClass("zona-activa-titulo");
    };

    function fnShowFilterTable(table) {
        $('#' + table.attr('id') + '_wrapper').
                        find('.dt-toolbar, .dataTables_filter').
                        css({ display: 'block' });
    };
    function fnHiddenFilterTable(table) {
        $('#' + table.attr('id') + '_wrapper').
                        find('.dt-toolbar, .dataTables_filter').
                        css({ display: 'none' });
    };



    /*Seccion de calculos para devoluciones*/
    function ObtenerDescuento(cantidadOriginal, descuentoTotal, cantidadDevolver) {
        var descuento = 0;
        if (descuentoTotal > 0) {
            impuesto = (descuentoTotal / cantidadOriginal) * (cantidadDevolver);
        }

        return descuento;
    };
    var ObtenerRetencion = function (cantitadDisponible, cantidadDevolver, totalRetencion) {
        var impuesto = 0;
        impuesto = (totalRetencion / cantitadDisponible) * (cantidadDevolver);
        return impuesto;
    };
    function ObtenerImpuesto(cantitadDisponible, cantidadDevolver, totalImpuesto) {
        var impuesto = 0;
        impuesto = (totalImpuesto / cantitadDisponible) * (cantidadDevolver);
        return impuesto;
    };
    function ObtenerSubTotal(cantidadDevolver, precioUnitario) {
        var subTotal = 0;
        subTotal = (cantidadDevolver * precioUnitario);
        return subTotal;
    };
    function ObtenerTotal(totalLineal, cantidadOriginal, cantidadDevoler) {
        var total = 0;
        total = ((totalLineal / cantidadOriginal) * (cantidadDevoler));
        return total;
    };

    function ValidaFecha(fecha) {
        var bits = fecha.split('/');
        var d = new Date(bits[2], bits[1] - 1, bits[0]);

        return d && (d.getMonth() + 1) == bits[1];
    }

    function ValidaFechaInicialFinal(fechaInicial, fechaFinal) {
        var fiBits = fechaInicial.split('/');
        var fi = new Date(fiBits[2], fiBits[1] - 1, fiBits[0]);

        var ffBits = fechaFinal.split('/');
        var ff = new Date(ffBits[2], ffBits[1] - 1, ffBits[0]);


        if (fi > ff) {
            return false
        }

        return true;
    }


    return {
        FormaFechaServer: fnFormaFechaServer,
        aplicarZonaActivaOne: fnAplicarZonaActivaOne,
        aplicarZonaActiva: fnAplicarZonaActiva,
        fnIsEmptytable: fnIsEmptytable,
        fnInitDatatables: fnInitDatatables,
        fnShowErrorMessage: showErrorMessage,
        fnFormatNumber: formatNumber,
        fnObtenerSimboloMonetario: obtenerSimboloMonetario,
        fnShowSuccessMessage: showSuccessMessage,
        fnShowInfoMessage: showInfoMessage,
        fnShowWaitingDialog: showWaitingDialog,
        fnShowHideDialog: showHideDialog,
        fnExecuteAsyncPostBack: fnExecute,
        fnExecuteWithResult: fnExecuteWithResult,
        fnHideLockedScreen: hideLockedScreen,
        fnDoLogOff: logOffNavigate,
        fnJsonArray: fnJsonArray,
        GetParameterByName: GetParameterByName,
        fnInitMessagesSelect2: setMessagesSelect2,
        fnsetDatePicker: setDatePicker,
        fnGetDate: getDate,
        fnFechaJson: formatoFechaJson,
        fnObtenerFecha: fechaActual,
        fnOldBrowser: oldBrowser,
        MostrarModal: mostrarModal,
        fnCargarConfiguracion: cargarConfiguracion,
        fnValidarEstadoControles: validarEstadoControles,
        fnIdleSeconds: function () {
            return idleSeconds;
        },
        fnSiteUrl: function () {
            return site;
        },
        CargarColumnas: cargarColumnas,
        ValidarCargarColumnas: validarCargarColumnas,
        fnObtenerRow: fnObtenerRow,
        crearElemento: fnCrearElemento,
        loadLables: fnLoadLables,
        capitalize: fnCapitalize,
        fnApplyLeftAligment: fnApplyLeftAligment,
        toDate: fnToDate,
        fnFormatoPorcentaje: _formatoPorcentaje,
        fnExecuteWithResultSync: fnExecuteWithResultSync,
        fnObtenerCheckBoxBySku: fnObtenerCheckBoxBySku,
        fnObtenerRowsBySku: fnObtenerRowsBySku,
        fnGetAllIndex: fnGetAllIndex,
        fnGetIndex: fnGetIndex,
        EsCombo: EsCombo,
        checkObject: fnCheckObject,
        fnShowLockedScreen: showLockedScreen,
        fnHideLockedScreen: hideLockedScreen,
        fnInit: init,
        isValidEmail: isValidEmail,
        fnExecuteParallelWithResult: fnExecuteParallelWithResult,
        onlyDecimal: FnOnlyDecimal,
        onlyNumeral: FnOnlyNumeral,
        showFilterTable: fnShowFilterTable,
        hiddenFilterTable: fnHiddenFilterTable,
        EstilosModalTarjeta: estilosModalTarjeta,
        Format: fnFormat,
        fnObtenerDescuento: ObtenerDescuento,
        fnObtenerRetencion: ObtenerRetencion,
        fnObtenerImpuesto: ObtenerImpuesto,
        fnObtenerSubTotal: ObtenerSubTotal,
        fnObtenerTotal: ObtenerTotal,
        Imports: fnImports,
        CreateGuid: fnCreateGuid,
        ConfiguracionTablas: function (value) {
            if (value && value != null)
                configuracionTablas = value;
            return configuracionTablas;
        },
        SoloLetras: fnSoloLetras,
        fnValidaFecha: ValidaFecha,
        fnValidaFechaInicialFinal: ValidaFechaInicialFinal
    };

}();


$(window).resize(function () {
    //utils.chartJs();
});


String.format = function () {
    var theString = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
        theString = theString.replace(regEx, arguments[i]);
    }
    return theString;
}


$.extend({
    getUrlVars: function () {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function (name) {
        return $.getUrlVars()[name];
    }
});

if (!(window.console && console.log)) {
    console = {
        log: function () { },
        debug: function () {
        },
        info: function () {
        },
        warn: function () {
        },
        error: function () {
        }
    };
}

var cargarSelect2 = function (elemento, configuracion) {
    debugger;
    let opts = {
        cacheDataSource: [],
        placeholder: configuracion.PlaceHolder,
        multiple: configuracion.Multiple,
        dropdownCssClass: "bigdrop", // apply css that makes the dropdown taller
        escapeMarkup: function (m) { return m; } // we do not want to escape markup since we are displaying html in results
    };



    if (elemento.is('input')) {
        opts.initSelection = function (element, callback) {
            if (configuracion.InitSelection && (configuracion.hasOwnProperty('defaultInitSelection') && configuracion['defaultInitSelection']))
                configuracion.InitSelection(element, callback);

            else if (configuracion.InitSelection)
                configuracion.InitSelection(callback, configuracion);
        };

        //MARCO ORTIZ


        var procesarResultado = function (serverData) {

            var data = {
                results: []
            };
            $.each(serverData, function () {
                if (configuracion.hasOwnProperty('tranformResult'))
                    data.results.push(configuracion.tranformResult(this));

                else
                    data.results.push({
                        id: this[configuracion.Id], text: this[configuracion.Text]
                    });
            });

            results = data.results;
            return data;
        };


        opts.query = function (query) {
            let self = this;
            var key = query.term;
            var cachedData = self.cacheDataSource[key];

            if (cachedData == null
                && key == ''
                && configuracion.hasOwnProperty('PreloadedData')
                && configuracion['PreloadedData']) {
                cachedData = procesarResultado(configuracion.PreloadedData).results;
            }
            if (cachedData) {
                query.callback({
                    results: cachedData
                });
                return;
            } else {
                $.ajax({
                    url: configuracion.Url,
                    data: configuracion.Data,
                    dataType: 'json',
                    type: 'POST',
                    success: function (serverData) {
                        if (configuracion.SuccessFunction) {
                            configuracion.SuccessFunction(serverData);
                        }
                        var data = procesarResultado(serverData.Data);
                        self.cacheDataSource[key] = data.results;
                        query.callback(data);

                    }
                })
            }
        };

    } else if (elemento.is('select') && !$.isEmptyObject(configuracion)) {
        utils.fnExecuteWithResult(null, configuracion.Url, configuracion.Data, '',
            function (result) {
                if (result.MessageType == 0) {
                    let optionDefault = utils.crearElemento('option', {
                        text: '',
                        attrs: [
                    {
                        name: 'selected', value: 'selected'
                    },
                {
                    name: 'value', value: -1
                }
                        ],
                        props: [{
                            name: 'disabled', value: 'disabled'
                        }]
                    });

                    elemento.prepend(optionDefault);

                    result.Data.forEach(function (val, index, arr) {

                        let option = utils.crearElemento('option');

                        $(option).attr('value', val[configuracion.Id]).
                            text(val[configuracion.Text]);

                        if (val.hasOwnProperty('options') || val.hasOwnProperty('Options')) {
                            let keys = Object.keys(val.options) || Object.keys(val.Options);

                            for (var i = 0; i < keys.length; i++) {
                                let attribute = 'data-' + keys[i].toLowerCase();

                                $(option).attr(attribute, val.options[keys[i]]);
                            }
                        }

                        elemento.append(option);
                    });

                    if (typeof configuracion.SuccessFunction === 'function')
                        configuracion.SuccessFunction(result);
                } else
                    msjApp.fnShowErrorMessage(result.ErrorMessage, "cargarSelect2", configuracion.Url);

            });
    }

    elemento.select2(opts);

    if (configuracion.hasOwnProperty('InitSelection'))
        elemento.select2('val', []);
};

var cargarSelect2multiple = function (elemento, configuracion) {

    elemento.select2({
        cacheDataSource: [],
        placeholder: configuracion.PlaceHolder,
        multiple: configuracion.Multiple,
        query: function (query) {
            self = this;
            var key = query.term;
            var cachedData = self.cacheDataSource[key];
            if (cachedData) {
                query.callback({
                    results: cachedData
                });
                return;
            } else {
                $.ajax({
                    url: configuracion.Url,
                    data: configuracion.Data,
                    dataType: 'json',
                    type: 'POST',
                    success: function (serverData) {
                        if (configuracion.SuccessFunction) {
                            configuracion.SuccessFunction(serverData);
                        }
                        var data = {
                            results: []
                        };
                        $.each(serverData.Data, function () {
                            data.results.push({
                                id: this[configuracion.Id], text: this[configuracion.Text]
                            });
                        });
                        self.cacheDataSource[key] = data.results;
                        results = data.results;
                        query.callback(data);
                    }
                })
            }
        },

        initSelection: configuracion.InitSelection,
        dropdownCssClass: "bigdrop", // apply css that makes the dropdown taller
        escapeMarkup: function (m) {
            return m;
        } // we do not want to escape markup since we are displaying html in results
    });






};



function GMGAsyncJSON(url, args, resultFunction, opts) {
    this.Url = url;
    this.ResultFunction = resultFunction;
    this.Args = args;
    this.CallBackEjecutado = false;
    this.opts = opts || {
    };
}