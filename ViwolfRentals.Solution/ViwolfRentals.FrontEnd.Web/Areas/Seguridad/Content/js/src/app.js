var app = function () {
    //var contenido = $('#main'), url_anterior = '', extension = '.html', original = window.location;
    //var defaultUrl = '#Notificaciones/Index';
    //var lockedUrl = '/Account/Locked';
    //var loginUrl = "/Account/Login?ReturlUrl=";
    //var logOffUrl = "/Account/Logoff";
    //var logoutMessage = 'Su sesi\u00F3n expir\u00F3. Por favor, vuelva a ingresar sus credenciales';
    //var argumentosInit = null;

    //var area = "Sapv/";
    //var site = utils.fnSiteUrl() + area;

    //var loginShowed = false;
    //var error500Message = "Ocurrió un error de sistema: ";
    //var error404Message = "El recurso que intenta accesar, no existe!";
    //var waitingDialog = null;
    //var oldIE;


    ///// <summary>
    ///// Function: function
    ///// Descripcion: 
    ///// Fecha de creación: 22-04-2015
    ///// Autor: 
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //$(function () {
    //    if (typeof sapvDatosIniciales != 'undefined')
    //        utils.ConfiguracionTablas(sapvDatosIniciales.InitialData().TablaRapiWeb);
    //    else
    //        utils.CargarColumnas('RapiWeb');
    //    checkVersion();
    //    toggleSettings();
    //    switchTheme();
    //    navToggleRight();
    //    navToggleLeft();
    //    navToggleSub();
    //    profileToggle();
    //    widgetToggle();
    //    widgetClose();
    //    widgetFlip();
    //    tooltips();
    //    switcheryToggle();
    //    fullscreenWidget();
    //    fullscreenMode();
    //    initMessage();
    //    setValidationMessages();
    //    setValidatorAddMethod();

    //});

    //function getInternetExplorerVersion()
    //    // Returns the version of Internet Explorer or a -1
    //    // (indicating the use of another browser).
    //{
    //    var rv = -1; // Return value assumes failure.
    //    if (navigator.appName == 'Microsoft Internet Explorer') {
    //        var ua = navigator.userAgent;
    //        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    //        if (re.exec(ua) != null)
    //            rv = parseFloat(RegExp.$1);
    //    }
    //    return rv;
    //}
    //function checkVersion() {
    //    var ver = getInternetExplorerVersion();
    //    if (ver > -1) {
    //        if (ver > 8)
    //            oldIE = false;
    //        else
    //            oldIE = true;
    //    }
    //    if (oldIE == true) {
    //        contenido.css(
    //            {
    //                width: "81%",
    //                float: "right"
    //            });
    //    }
    //}



    //function setValidationMessages() {
    //    $.extend(jQuery.validator.messages, {
    //        required: "Valor requerido",
    //        remote: "Corrija este valor",
    //        email: "Ingrese un email valido",
    //        url: "Ingrese una url v&aacute;lida",
    //        date: "Ingrese una fecha v&aacute;lida",
    //        dateISO: "Ingrese una fecha ISO v&aacute;lida",
    //        number: "Ingrese un n&uacute;mero v&aacute;lido",
    //        digits: "Ingrese solo d&iacute;gitos",
    //        creditcard: "Ingrese un n&uacute;mero de tarjeta v&aacute;lida",
    //        equalTo: "Ingrese el mismo valor",
    //        accept: "Ingrese una extensi&oacute;n v&aacute;lida",
    //        maxlength: jQuery.validator.format("Ingres&oacute; m&aacute;s de {0} caracteres"),
    //        minlength: jQuery.validator.format("Ingrese por lo menos {0} caracteres"),
    //        rangelength: jQuery.validator.format("Ingrese un valor con {0} a {1} caracteres"),
    //        range: jQuery.validator.format("Ingrese un valor entre {0} y {1}"),
    //        max: jQuery.validator.format("Ingrese un valor menor o igual a {0}"),
    //        min: jQuery.validator.format("Ingrese un valor mayor o igual a {0}"),
    //        notEqual: jQuery.validator.format("Ingrese un valor difenre a {0}")
    //    });
    //}

    //function setValidatorAddMethod() {
    //    jQuery.validator.addMethod("notEqual", function (value, element, param) {
    //        return this.optional(element) || value != $(param).val();
    //    }, "This has to be different...");
    //};

    ///// <summary>
    ///// Function: toggleSettings
    ///// Descripcion: 
    ///// Fecha de creación: 22-04-2015
    ///// Autor: 
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //var toggleSettings = function () {
    //    $('.config-link').click(function () {
    //        if ($(this).hasClass('open')) {
    //            $('#config').animate({
    //                "right": "-205px"
    //            }, 150);
    //            $(this).removeClass('open').addClass('closed');
    //        } else {
    //            $("#config").animate({
    //                "right": "0px"
    //            }, 150);
    //            $(this).removeClass('closed').addClass('open');
    //        }
    //    });
    //};

    ///// <summary>
    ///// Function: switchTheme
    ///// Descripcion: 
    ///// Fecha de creación: 22-04-2015
    ///// Autor: 
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //var switchTheme = function () {
    //    $('.theme-style-wrapper').click(function () {
    //        $('#main-wrapper').attr('class', '');
    //        var themeValue = $(this).data('theme');
    //        $('#main-wrapper').addClass(themeValue);
    //    });
    //};

    ///// <summary>
    ///// Function: navToggleRight
    ///// Descripcion: 
    ///// Fecha de creación: 22-04-2015
    ///// Autor: 
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //var navToggleRight = function () {
    //    $('#toggle-right').on('click', function () {
    //        $('#sidebar-right').toggleClass('sidebar-right-open');
    //        $("#toggle-right .fa").toggleClass("fa-indent fa-dedent");

    //    });
    //};

    ///// <summary>
    ///// Function: customCheckbox
    ///// Descripcion: 
    ///// Fecha de creación: 22-04-2015
    ///// Autor: 
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //var customCheckbox = function () {
    //    $('input.icheck').iCheck({
    //        checkboxClass: 'icheckbox_flat-grey',
    //        radioClass: 'iradio_flat-grey'
    //    });
    //}

    ///// <summary>
    ///// Function: navToggleLeft
    ///// Descripcion: 
    ///// Fecha de creación: 22-04-2015
    ///// Autor: 
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //var navToggleLeft = function () {
    //    $('#toggle-left').on('click', function () {
    //        var bodyEl = $('#main-wrapper');
    //        ($(window).width() > 767) ? $(bodyEl).toggleClass('sidebar-mini') : $(bodyEl).toggleClass('sidebar-opened');
    //    });
    //};

    ///// <summary>
    ///// Function: navToggleSub
    ///// Descripcion: 
    ///// Fecha de creación: 22-04-2015
    ///// Autor: 
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //var navToggleSub = function () {
    //    var subMenu = $('.sidebar .nav');
    //    $(subMenu).navgoco({
    //        caretHtml: false,
    //        accordion: true
    //    });

    //};

    ///// <summary>
    ///// Function: profileToggle
    ///// Descripcion: 
    ///// Fecha de creación: 22-04-2015
    ///// Autor: 
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //var profileToggle = function () {
    //    $('#toggle-profile').click(function () {
    //        $('.sidebar-profile').slideToggle();
    //    });
    //};

    ///// <summary>
    ///// Function: widgetToggle
    ///// Descripcion: 
    ///// Fecha de creación: 22-04-2015
    ///// Autor: 
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //var widgetToggle = function () {
    //    $(".actions > .fa-chevron-down").click(function () {
    //        $(this).parent().parent().next().slideToggle("fast"), $(this).toggleClass("fa-chevron-down fa-chevron-up")
    //    });
    //};

    ///// <summary>
    ///// Function: widgetClose
    ///// Descripcion: 
    ///// Fecha de creación: 22-04-2015
    ///// Autor: 
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //var widgetClose = function () {
    //    $(".actions > .fa-times").click(function () {
    //        $(this).parent().parent().parent().fadeOut()
    //    });
    //};

    ///// <summary>
    ///// Function: widgetFlip
    ///// Descripcion: 
    ///// Fecha de creación: 22-04-2015
    ///// Autor: 
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //var widgetFlip = function () {
    //    $(".actions > .fa-cog").click(function () {
    //        $(this).closest('.flip-wrapper').toggleClass('flipped')
    //    });
    //};

    ///// <summary>
    ///// Function: dateRangePicker
    ///// Descripcion: 
    ///// Fecha de creación: 22-04-2015
    ///// Autor: 
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //var dateRangePicker = function () {
    //    $('.reportdate').daterangepicker({
    //        format: 'YYYY-MM-DD',
    //        startDate: '2014-01-01',
    //        endDate: '2014-06-30'
    //    });
    //};

    ///// <summary>
    ///// Function: tooltips
    ///// Descripcion: 
    ///// Fecha de creación: 22-04-2015
    ///// Autor: 
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //var tooltips = function () {
    //    $('.tooltip-wrapper').tooltip({
    //        selector: "[data-toggle=tooltip]",
    //        container: "body"
    //    })
    //};

    ///// <summary>
    ///// Function: sliders
    ///// Descripcion: 
    ///// Fecha de creación: 22-04-2015
    ///// Autor: 
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //var sliders = function () {
    //    $('.slider-span').slider()
    //};


    ////Chart.js LineChart, BarChart, DoughnutChart
    ///// <summary>
    ///// Function: chartJs
    ///// Descripcion: 
    ///// Fecha de creación: 22-04-2015
    ///// Autor: 
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //var chartJs = function () {
    //    //Line Charts
    //    var randomScalingFactor = function () {
    //        return Math.round(Math.random() * 100)
    //    };
    //    var lineChartData = {
    //        labels: ["January", "February", "March", "April", "May", "June", "July"],
    //        datasets: [{
    //            label: 'Network Usage',
    //            fillColor: 'rgba(26,188,156,0.5)',
    //            strokeColor: 'rgba(26,188,156,1)',
    //            pointColor: 'rgba(220,220,220,1)',
    //            pointStrokeColor: '#fff',
    //            pointHighlightFill: '#fff',
    //            pointHighlightStroke: 'rgba(220,220,220,1)',
    //            data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
    //        }, {
    //            label: 'CPU Load',
    //            fillColor: 'rgba(31,123,182,0.5)',
    //            strokeColor: 'rgba(31,123,182,1)',
    //            pointColor: 'rgba(151,187,205,1)',
    //            pointStrokeColor: '#fff',
    //            pointHighlightFill: '#fff',
    //            pointHighlightStroke: 'rgba(151,187,205,1)',
    //            data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
    //        }]

    //    }
    //    //Bar Charts
    //    var randomScalingFactor = function () {
    //        return Math.round(Math.random() * 100)
    //    };
    //    var barChartData = {
    //        labels: ["January", "February", "March", "April", "May", "June", "July"],
    //        datasets: [{
    //            fillColor: 'rgba(26,188,156,0.5)',
    //            strokeColor: 'rgba(255,255,255,0.8)',
    //            highlightFill: 'rgba(26,188,156,1)',
    //            highlightStroke: 'rgba(255,255,255,0.8)',
    //            data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
    //        }, {
    //            label: 'CPU Load',
    //            fillColor: 'rgba(31,123,182,0.5)',
    //            strokeColor: 'rgba(255,255,255,0.8)',
    //            highlightFill: 'rgba(31,123,182,1)',
    //            highlightStroke: 'rgba(255,255,255,0.8)',
    //            data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
    //        }]

    //    }

    //    //DoughnutChart
    //    var doughnutData = [{
    //        value: 300,
    //        color: "#1ABC9C",
    //        highlight: "#1ABC9C",
    //        label: "Chrome"
    //    }, {
    //        value: 50,
    //        color: "#556B8D",
    //        highlight: "#556B8D",
    //        label: "IE"
    //    }, {
    //        value: 100,
    //        color: "#EDCE8C",
    //        highlight: "#EDCE8C",
    //        label: "Safari"
    //    }, {
    //        value: 40,
    //        color: "#CED1D3",
    //        highlight: "#1F7BB6",
    //        label: "Other"
    //    }, {
    //        value: 120,
    //        color: "#1F7BB6",
    //        highlight: "#1F7BB6",
    //        label: "Firefox"
    //    }

    //    ];



    //    window.onload = function () {
    //        var ctx1 = document.getElementById("canvas1").getContext("2d");
    //        window.myLine = new Chart(ctx1).Line(lineChartData, {
    //            responsive: true
    //        });

    //        var ctx2 = document.getElementById("canvas2").getContext("2d");
    //        window.myBar = new Chart(ctx2).Bar(barChartData, {
    //            responsive: true
    //        });

    //        var ctx3 = document.getElementById("doughnut-chart-area").getContext("2d");
    //        window.myDoughnut = new Chart(ctx3).Doughnut(doughnutData, {
    //            responsive: true
    //        });

    //    };

    //};

    ///// <summary>
    ///// Function: nestedSortable
    ///// Descripcion: 
    ///// Fecha de creación: 22-04-2015
    ///// Autor: 
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //var nestedSortable = function () {
    //    var updateOutput = function (e) {
    //        var list = e.length ? e : $(e.target),
    //            output = list.data('output');
    //        if (window.JSON) {
    //            output.val(window.JSON.stringify(list.nestable('serialize'))); //, null, 2));
    //        } else {
    //            output.val('JSON browser support required for this demo.');
    //        }
    //    };

    //    // activate Nestable for list 1
    //    $('#nestable').nestable({
    //        group: 1
    //    })
    //        .on('change', updateOutput);

    //    // activate Nestable for list 2
    //    $('#nestable2').nestable({
    //        group: 1
    //    })
    //        .on('change', updateOutput);

    //    // output initial serialised data
    //    updateOutput($('#nestable').data('output', $('#nestable-output')));
    //    updateOutput($('#nestable2').data('output', $('#nestable2-output')));

    //    $('#nestable-menu').on('click', function (e) {
    //        var target = $(e.target),
    //            action = target.data('action');
    //        if (action === 'expand-all') {
    //            $('.dd').nestable('expandAll');
    //        }
    //        if (action === 'collapse-all') {
    //            $('.dd').nestable('collapseAll');
    //        }
    //    });
    //};

    ///// <summary>
    ///// Function: formValidation
    ///// Descripcion: 
    ///// Fecha de creación: 22-04-2015
    ///// Autor: 
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //var formValidation = function () {
    //    $('#form').validate({
    //        rules: {
    //            input1: {
    //                required: true
    //            },
    //            input2: {
    //                minlength: 5,
    //                required: true
    //            },
    //            input3: {
    //                maxlength: 5,
    //                required: true
    //            },
    //            input4: {
    //                required: true,
    //                minlength: 4,
    //                maxlength: 8
    //            },
    //            input5: {
    //                required: true,
    //                min: 5
    //            },
    //            input6: {
    //                required: true,
    //                range: [5, 50]
    //            },
    //            input7: {
    //                minlength: 5
    //            },
    //            input8: {
    //                required: true,
    //                minlength: 5,
    //                equalTo: "#input7"
    //            },
    //            input9: {
    //                required: true,
    //                email: true
    //            },
    //            input10: {
    //                required: true,
    //                url: true
    //            },
    //            input11: {
    //                required: true,
    //                digits: true
    //            },
    //            input12: {
    //                required: true,
    //                phoneUS: true
    //            },
    //            input13: {
    //                required: true,
    //                minlength: 5
    //            }
    //        },
    //        highlight: function (element) {
    //            $(element).closest('.form-group').removeClass('success').addClass('error');
    //        },
    //        success: function (element) {
    //            element.text('OK!').addClass('valid')
    //                .closest('.form-group').removeClass('error').addClass('success');
    //        }
    //    });
    //}

    ///// <summary>
    ///// Function: spinStart
    ///// Descripcion: 
    ///// Fecha de creación: 22-04-2015
    ///// Autor: 
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //var spinStart = function (spinOn) {
    //    var spinFull = $('<div class="preloader"><div class="iconWrapper"><i class="fa fa-circle-o-notch fa-spin"></i></div></div>');
    //    var spinInner = $('<div class="preloader preloader-inner"><div class="iconWrapper"><i class="fa fa-circle-o-notch fa-spin"></i></div></div>');
    //    if (spinOn === undefined) {
    //        $('body').prepend(spinFull);
    //    } else {
    //        $(spinOn).prepend(spinInner);
    //    };

    //};

    ///// <summary>
    ///// Function: spinStop
    ///// Descripcion: 
    ///// Fecha de creación: 22-04-2015
    ///// Autor: 
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //var spinStop = function () {
    //    $('.preloader').remove();
    //};

    ///// <summary>
    ///// Function: switcheryToggle
    ///// Descripcion: 
    ///// Fecha de creación: 22-04-2015
    ///// Autor: 
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //var switcheryToggle = function () {
    //    var elems = null;
    //    elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
    //    elems.forEach(function (html) {
    //        var switchery = new Switchery(html, {
    //            size: 'small',
    //            color: '#27B6AF',
    //            secondaryColor: '#B3B8C3'
    //        });
    //    });
    //};

    ///// <summary>
    ///// Function: fullscreenWidget
    ///// Descripcion: 
    ///// Fecha de creación: 22-04-2015
    ///// Autor: 
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //var fullscreenWidget = function () {
    //    $('.panel .fa-expand').click(function () {
    //        var panel = $(this).closest('.panel');
    //        panel.toggleClass('widget-fullscreen');
    //        $(this).toggleClass('fa-expand fa-compress');
    //        $('body').toggleClass('fullscreen-widget-active')

    //    })
    //};

    ///// <summary>
    ///// Function: fullscreenMode
    ///// Descripcion: 
    ///// Fecha de creación: 22-04-2015
    ///// Autor: 
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //var fullscreenMode = function () {
    //    $('#toggle-fullscreen.expand').on('click', function () {
    //        $(document).toggleFullScreen()
    //        $('#toggle-fullscreen .fa').toggleClass('fa-expand fa-compress');
    //    });
    //};

    ///// <summary>
    ///// Nombre: fnGetSelectedRow.
    ///// Descripcion:  Function encargado de la inicialización de la tabla que se reciba por parametro como un widget de tipo datatables.
    ///// Fecha de creación: 27-04-2015
    ///// Autor: jquesada
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //var fnInitDatatables = function (oTable, configuration) {

    //    return utils.fnInitDatatables(oTable, configuration);
    //}

    ///// <summary>
    ///// Function: EnableAjaxContent
    ///// Descripcion: Metodo encargado de realizar la carga de las vistas en un Div por medio de ajax.
    ///// Fecha de creación: 22-04-2015
    ///// Autor: jquesada
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //var enableAjaxContent = function () {

    //    $('a').on('click', function (e) {
    //        if ($(this).data('hash')) {
    //            var hash = $(this).attr('href');
    //            navigateAjax(e, hash);
    //        }
    //        else if ($(this).data('lock')) {
    //            utils.fnShowLockedScreen();
    //        }

    //    });
    //    if (window.location.hash == "") //Se debe setear un hash default
    //    {
    //        var hash = defaultUrl;
    //        navigateAjax(e, hash, 2);
    //    }
    //    /*
    //    $('ul#nav a').each(function () { //Cambiamos los href por el contenido del atributo data-hash
    //        $(this).attr('href', $(this).data('hash'));
    //    });

    //    $('ul#nav a').on('click', function (e) {

    //        var hash = $(this).attr('href');

    //        navigateAjax(e, hash);

    //    });
    //    */
    //    console.log(window.location.hash);

    //    revisarURL(window.location.hash).fail(function () {
    //        window.location.href = '#error';
    //    }).done(function (datos) {
    //        if (isLoginShown() === false) {
    //            contenido.html(datos);
    //            $(document).trigger('ajaxloadcomplete');
    //        }



    //    })

    //};


    //function isLoginShown() {
    //    return loginShowed;
    //}

    ///// <summary>
    ///// Function: cargarPagina
    ///// Descripcion: Function encarga de retornar el contenido de una vista en base una url de entrada.
    ///// Fecha de creación: 22-04-2015
    ///// Autor: jquesada
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //function cargarPagina(hash) {

    //    url = hash.replace('#', '');  //Quitamos la almohadilla

    //    return $.ajax({
    //        url: site + url, //+ extension,
    //        async: true,
    //        dataType: "html",
    //        success: function (data, textStatus, jqXHR) {
    //            if (jqXHR.getResponseHeader("X-Responded-Json") != undefined) {
    //                if (JSON.parse(jqXHR.getResponseHeader("X-Responded-Json")).status == 401)
    //                    doLogout();
    //            }

    //        }
    //    });
    //}

    //function logOffNavigate() {
    //    window.location.replace(utils.fnSiteUrl() + logOffUrl);
    //    //navigateAjax(null, logOffUrl, 1);
    //}

    ///// <summary>
    ///// Function: doLogout
    ///// Descripcion: Redirecciona a la pagina de Login
    ///// Fecha de creación: 27-05-15
    ///// Autor: mortiz
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion: Minor Sabe
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //function doLogout() {
    //    showInfoMessage(logoutMessage);
    //    utils.fnShowLockedScreen();
    //    //navigateAjax(null, loginUrl, 1);
    //}

    ///// <summary>
    ///// Function: revisarURL
    ///// Descripcion: Function encarga de validar la url ingresada
    ///// Fecha de creación: 22-04-2015
    ///// Autor: jquesada
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //function revisarURL(hash) {
    //    showWaitingDialog();
    //    var deferred = $.Deferred();
    //    if (!hash) { // Esto ocurre	cuando se pulsa el botón de atrás o adelante en el navegador o al pasar una URL con hash
    //        hash = window.location.hash;
    //    }
    //    /*
    //    if (!hash) { // Esto puede pasar si es la primera URL - index.html en nuestro caso
    //        var url = window.location.pathname; // Obtenemos la URL completa
    //        var archivo = url.substring(url.lastIndexOf('/') + 1); // Nos quedamos con el Function del archivo (index.html)
    //        hash = archivo.replace(extension, ''); // Le quitamos la extensión para convertirlo en "hash"
    //    }
    //    */
    //    if (hash !== '' && hash !== '#') {

    //        $('a[data-hash="' + url_anterior + '"]').closest('li').removeClass('active').parents('li').removeClass('open')
    //        var link_element = $('a[data-hash="' + hash + '"]');

    //        if (link_element.length > 0) {
    //            var nav = link_element.closest('.nav');
    //            if (nav.length > 0) {

    //                nav.find('.active').each(function () {
    //                    var $class = 'active';
    //                    $(this).removeClass($class);

    //                })

    //                link_element.closest('li').addClass('active').parents('li').addClass('active open');
    //            }
    //        }
    //        //
    //        url_anterior = hash;
    //        cargarPagina(hash).done(
    //            function (data) {
    //                showHideDialog();
    //                var html = $(data);

    //                if (oldIE) {
    //                    deferred.resolve(html);
    //                }
    //                else {
    //                    deferred.resolve(html);
    //                }
    //            }
    //        ).fail(function () { // La URL no existe					
    //            showHideDialog();
    //            deferred.reject('<p>La página no existe.</p>'); // Rechazamos nuestro deferred		
    //        });
    //    }
    //    return deferred.promise(); // Devolvemos una promesa, no un deferred
    //}

    ///// <summary>
    ///// Function: navigateAjax
    ///// Descripcion: Function encarga realizar la navegación por medio de ajax y la navegacion nativa de mvc.
    ///// Fecha de creación: 22-04-2015
    ///// Autor: jquesada
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //function navigateAjax(e, url, option) {
    //    var urlComplete = site + url;
    //    if (option == 1) {
    //        urlComplete = urlComplete.replace('#', '');
    //        window.location.replace(urlComplete)
    //        return;
    //    }

    //    if (option == 2) {
    //        window.location.replace(urlComplete)
    //        return;
    //    }

    //    var hash = url;
    //    //e.preventDefault();
    //    revisarURL(hash).done(function (datos) {
    //        if (isLoginShown() === false) {
    //            contenido.html(datos);
    //            window.location.replace(urlComplete); // Buen hash, cambiemoslo en la URL			
    //            $(document).trigger('ajaxloadcomplete');
    //        }
    //    }).fail(function () {
    //        showErrorMessage(error404Message);
    //        window.location.href = '#error';
    //    });
    //};




    ///// <summary>
    ///// Function: initMessage
    ///// Descripcion: Metodo encargado de inicializar la funcionalidad para los messages.
    ///// Fecha de creación: 22-04-2015
    ///// Autor: jquesada
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //var initMessage = function () {
    //    var loc = ['top', 'right'];
    //    var style = 'flat';

    //    var $output = $('.controls output');
    //    var $lsel = $('.location-selector');
    //    var $tsel = $('.theme-selector');

    //    var update = function () {
    //        var classes = 'messenger-fixed';

    //        for (var i = 0; i < loc.length; i++)
    //            classes += ' messenger-on-' + loc[i];

    //        $.globalMessenger({ extraClasses: classes, theme: style });
    //        Messenger.options = { extraClasses: classes, theme: style };

    //        $output.text("Messenger.options = {\n    extraClasses: '" + classes + "',\n    theme: '" + style + "'\n}");
    //    };

    //    update();
    //}

    ///// <summary>
    ///// Function: showErrorMessage
    ///// Descripcion: Metodo encargado de mostrar mensajes de error en el aplicativo.
    ///// Fecha de creación: 24-04-2015
    ///// Autor: jquesada
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //var showErrorMessage = function (msg, oUrl) {
    //    utils.fnShowErrorMessage(msg, oUrl);
    //}

    //var showErrorMessage = function (msg) {
    //    utils.fnShowErrorMessage(msg, "RAPIWEB");
    //}

    ///// <summary>
    ///// Function: showWarningMessage
    ///// Descripcion: Metodo encargado de mostrar mensajes de error en el aplicativo.
    ///// Fecha de creación: 24-04-2015
    ///// Autor: jsantamaria
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //var showInfoMessage = function (msg) {
    //    Messenger().post({
    //        message: msg,
    //        type: 'error',
    //        showCloseButton: true,
    //        hideAfter: 3
    //    });
    //}

    ///// <summary>
    ///// Function: showSuccessMessage
    ///// Descripcion: Metodo encargado de mostrar mensajes de error en el aplicativo.
    ///// Fecha de creación: 24-04-2015
    ///// Autor: jquesada
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //var showSuccessMessage = function (msg) {

    //    $()

    //    Messenger().post({
    //        message: msg,
    //        type: 'success',
    //        showCloseButton: true,
    //        hideAfter: 3
    //    });
    //}

    /// <summary>
    /// Function: showWaitingDialog
    /// Descripcion: Metodo encargado de mostrar preloader en el momento en que se ejecuta un proceso.
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
    var showWaitingDialog = function (msg) {
        waitingDialog = new ajaxLoader(document.body, { msg: msg, classOveride: 'blue-loader', bgColor: '#000' });
        /*
        $(".fakeloader").fakeLoader({
            bgColor: "#1D212A",
            spinner: "spinner3"
        });
        */
    }

    /// <summary>
    /// Function: showHideDialog
    /// Descripcion: Metodo encargado de ocultar el preloader en el momento en que se finaliza un proceso.
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
    var showHideDialog = function (msg) {
        debugger;
        if (waitingDialog!=null)
            waitingDialog.remove();
        /*
        $(".fakeloader").fadeOut();
        */
    }

    ///// <summary>
    ///// Function: standarErrorHandler
    ///// Descripcion: Funcion en cargada de hacer mostrar un mensaje de error estandar.
    ///// Fecha de creación: 24-04-2015
    ///// Autor: jquesada
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //var standarErrorHandler = function (error) {
    //    if (error !== undefined) {
    //        if (error instanceof Error)
    //            utils.fnShowErrorMessage(error.message);
    //        else {
    //            utils.fnShowErrorMessage(JSON.stringify(error));
    //        }
    //    }
    //};

    /// <summary>
    /// Function: DoJsonAsyncPostBack
    /// Descripcion: Funcion en cargada de hacer solicitudes asincronicas.
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
    var doJsonAsyncPostBack = function (waitMessage, calls, postThenCall, errorCall, noWaitingDialog) {
        if (window.navigator.onLine == false) {
            if (errorCall !== undefined)
                errorCall(new Error('No hay conexión a internet en este momento'));
            else
                showErrorMessage('No hay conexión a internet en este momento');
            return;
        }

        if (!(noWaitingDialog && noWaitingDialog==true))
            app.fnShowWaitingDialog(waitMessage);

        var whenCalls = [];
        $.each(calls, function (i, call) {
            var isAsyncHtml = call instanceof ViwolfAsyncHtml;
            if (isAsyncHtml === true) {
                whenCalls.push(
                    $.get(call.Url, null, 'html')
                );
            }
            else {
                if (call.Args && call.Args != null)
                    whenCalls.push(
                            $.ajax({
                                url: call.Url,
                                type: "POST",
                                async: true,
                                timeout: 180000,
                                dataType: 'json',
                                data: call.Args,
                                contentType: 'application/json; charset=utf-8',
                                success: function (data, textStatus, jqXHR) {
                                    if (jqXHR.getResponseHeader("X-Responded-Json") != undefined) {
                                        if (JSON.parse(jqXHR.getResponseHeader("X-Responded-Json")).status == 401) {
                                            doLogout();
                                            return;
                                        }

                                    }
                                    else if (jqXHR.statusCode().status == 401) { //Error
                                        {
                                            doLogout();
                                            return;
                                        }
                                    }
                                    if (data.Resultado != undefined)//Error
                                    {
                                        showErrorMessage(data.Mensaje);
                                        return;
                                    }
                                    call.ResultFunction(data);
                                },
                                error: function (request, status, error) {
                                    handleAjaxError(request, status, error);
                                }
                            })
                    );
                else
                    whenCalls.push(
                            $.ajax({
                                url: call.Url,
                                type: "POST",
                                async: true,
                                timeout: 180000,
                                dataType: 'json',
                                contentType: 'application/json; charset=utf-8',
                                success: function (data, textStatus, jqXHR) {
                                    if (jqXHR.getResponseHeader("X-Responded-Json") != undefined) {
                                        if (JSON.parse(jqXHR.getResponseHeader("X-Responded-Json")).status == 401) {
                                            doLogout();
                                            return;
                                        }

                                    }
                                    else if (jqXHR.statusCode().status == 401) { //Error
                                        {
                                            doLogout();
                                            return;
                                        }
                                    }
                                    if (data.Resultado != undefined)//Error
                                    {
                                        showErrorMessage(data.Mensaje);
                                        return;
                                    }
                                    call.ResultFunction(data);
                                },
                                error: function (request, status, error) {
                                    handleAjaxError(request, status, error);
                                }
                            })
                    );
            }
        });

        $.when.apply($, whenCalls).then(function () {
            debugger;
            app.fnShowHideDialog();

            if (postThenCall && postThenCall != null)
                debugger;
               // postThenCall();
        }).fail(function (ex) {

            app.fnShowHideDialog();

            if (errorCall !== undefined) {
                errorCall(ex);
            }
        });
    }

    ///// <summary>
    ///// Function: DoJsonAsyncPostBack
    ///// Descripcion: Funcion en cargada de hacer solicitudes asincronicas.
    ///// Fecha de creación: 24-04-2015
    ///// Autor: jquesada
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //var doJsonAsyncPostBackIncreasedTimeout = function (waitMessage, calls, postThenCall, errorCall) {
    //    if (window.navigator.onLine == false) {
    //        if (errorCall !== undefined)
    //            errorCall(new Error('No hay conexión a internet en este momento'));
    //        else
    //            showErrorMessage('No hay conexión a internet en este momento');
    //        return;
    //    }

    //    app.fnShowWaitingDialog();

    //    var whenCalls = [];
    //    $.each(calls, function (i, call) {
    //        var isAsyncHtml = call instanceof GMGAsyncHtml;
    //        if (isAsyncHtml === true) {
    //            whenCalls.push(
    //                $.get(call.Url, null, 'html')
    //            );
    //        }
    //        else {
    //            if (call.Args && call.Args != null)
    //                whenCalls.push(
    //                        $.ajax({
    //                            url: call.Url,
    //                            type: "POST",
    //                            async: true,
    //                            timeout: 1200000,
    //                            dataType: 'json',
    //                            data: call.Args,
    //                            contentType: 'application/json; charset=utf-8',
    //                            success: function (data, textStatus, jqXHR) {
    //                                if (jqXHR.getResponseHeader("X-Responded-Json") != undefined) {
    //                                    if (JSON.parse(jqXHR.getResponseHeader("X-Responded-Json")).status == 401) {
    //                                        doLogout();
    //                                        return;
    //                                    }

    //                                }
    //                                else if (jqXHR.statusCode().status == 401) { //Error
    //                                    {
    //                                        doLogout();
    //                                        return;
    //                                    }
    //                                }
    //                                if (data.Resultado != undefined)//Error
    //                                {
    //                                    showErrorMessage(data.Mensaje);
    //                                    return;
    //                                }
    //                                call.ResultFunction(data);
    //                            },
    //                            error: function (request, status, error) {
    //                                handleAjaxError(request, status, error);
    //                            }
    //                        })
    //                );
    //            else
    //                whenCalls.push(
    //                        $.ajax({
    //                            url: call.Url,
    //                            type: "POST",
    //                            async: true,
    //                            timeout: 1200000,
    //                            dataType: 'json',
    //                            contentType: 'application/json; charset=utf-8',
    //                            success: function (data, textStatus, jqXHR) {
    //                                if (jqXHR.getResponseHeader("X-Responded-Json") != undefined) {
    //                                    if (JSON.parse(jqXHR.getResponseHeader("X-Responded-Json")).status == 401) {
    //                                        doLogout();
    //                                        return;
    //                                    }

    //                                }
    //                                else if (jqXHR.statusCode().status == 401) { //Error
    //                                    {
    //                                        doLogout();
    //                                        return;
    //                                    }
    //                                }
    //                                if (data.Resultado != undefined)//Error
    //                                {
    //                                    showErrorMessage(data.Mensaje);
    //                                    return;
    //                                }
    //                                call.ResultFunction(data);
    //                            },
    //                            error: function (request, status, error) {
    //                                handleAjaxError(request, status, error);
    //                            }
    //                        })
    //                );
    //        }
    //    });

    //    $.when.apply($, whenCalls).then(function () {
    //        app.fnShowHideDialog();

    //        if (postThenCall && postThenCall != null)
    //            postThenCall();
    //    }).fail(function (ex) {

    //        app.fnShowHideDialog();

    //        if (errorCall !== undefined) {
    //            errorCall(ex);
    //        }
    //    });
    //}

    ///// <summary>
    ///// Function: function
    ///// Descripcion:  funcion para el manejo de errores del Ajax response
    ///// Fecha de creación: 29-05-2015
    ///// Autor: Marco Ortiz
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //function handleAjaxError(request, status, error) {
    //    if (request.status == 401) {
    //        doLogout();
    //    }
    //    else if (request.status == 404) {
    //        showErrorMessage(error404Message);
    //    }
    //    else if (request.status == 500) {
    //        showErrorMessage(error500Message + error);
    //    }

    //}

    /// <summary>
    /// Function: GMGAsyncJSON
    /// Descripcion: 
    /// Fecha de creación: 27-04-2015
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
    function ViwolfAsyncJSON(url, args, resultFunction) {
        this.Url = url;
        this.ResultFunction = resultFunction;
        this.Args = args;
        this.CallBackEjecutado = false;
    }

    /// <summary>
    /// Function: ViwolfAsyncHtml
    /// Descripcion: 
    /// Fecha de creación: 27-04-2015
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
    function ViwolfAsyncHtml(url, resultFunction) {
        this.Url = url;
        this.ResultFunction = resultFunction;
        this.CallBackEjecutado = false;
    }

    ///// <summary>
    ///// Function: fnExecute.
    ///// Descripcion:  Evento que se encarga de ejecutar solicitudes al servidor sin esperar respuesta.
    ///// Fecha de creación: 29-04-2015
    ///// Autor: jquesada
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //function fnExecute(e, oUrl, oData, oProcessMessage, oInfoMessage, oErrorMessage) {

    //    e.preventDefault();

    //    var success = function (data) {
    //        if (data.hasOwnProperty('ErrorMessage')) {
    //            app.showErrorMessage(oErrorMessage);

    //            return false;
    //        }

    //        app.showSuccessMessage(oInfoMessage);

    //        return true;
    //    };

    //    try {

    //        var calls = [new app.GMGAsyncJSON(oUrl, JSON.stringify(oData), success)];

    //        app.doJsonAsyncPostBack(oProcessMessage, calls, null, app.standarErrorHandler);

    //    }
    //    catch (e) {
    //        app.showErrorMessage(e.message);
    //    }
    //};

    /// <summary>
    /// Function: fnExecuteWithResult.
    /// Descripcion:  Evento que se encarga de ejecutar solicitudes al servidor retornando una respuesta.
    /// Fecha de creación: 29-04-2015
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
    function fnExecuteWithResult(e, oUrl, oData, oProcessMessage, success, noWaitingDialog) {
        
        if (e !== null)
            e.preventDefault();

        try {

            var calls = [new ViwolfAsyncJSON(oUrl, JSON.stringify(oData), success)];
            //console.log(calls);
            doJsonAsyncPostBack(oProcessMessage, calls, null, app.standarErrorHandler, noWaitingDialog);

        }
        catch (e) {
            showErrorMessage(e.message);
        }
    };

    //function fnExecuteWithResultIncreasedTimeout(e, oUrl, oData, oProcessMessage, success) {
    //    if (e !== null)
    //        e.preventDefault();

    //    try {

    //        var calls = [new GMGAsyncJSON(oUrl, JSON.stringify(oData), success)];
    //        //console.log(calls);
    //        doJsonAsyncPostBackIncreasedTimeout(oProcessMessage, calls, null, app.standarErrorHandler);

    //    }
    //    catch (e) {
    //        showErrorMessage(e.message);
    //    }
    //};

    ///// <summary>
    ///// Function: fnJsonArray
    ///// Descripcion: Function encargada de convertir un json en un json array.
    ///// Fecha de creación: 22-04-2015
    ///// Autor: jquesada
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //function fnJsonArray(data) {
    //    return $.map(data, function (el) { return el; })
    //}

    //function getQueryStringItem(name, queryString) {
    //    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    //    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    //        results = regex.exec(queryString);
    //    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    //}

    //function oldBrowser() {
    //    return oldIE;
    //}

    //this.GetParameterByName = function (name) {
    //    var location = window.location.hash.split("?");
    //    if (location.length > 1)
    //        return getQueryStringItem(name.toLowerCase(), '?' + location[1].toLowerCase());
    //    else
    //        return "";
    //}

    ///// <summary>
    ///// Function: return
    ///// Descripcion: Retorno de las funciones que pueden ser invocadas por los diferentes forms.
    ///// Fecha de creación: 22-04-2015
    ///// Autor: jquesada
    ///// 
    ///// Modificaciones:
    ///// -----------------------------------------------------------------------------
    ///// Número: 
    ///// Ticket: 
    ///// Descripcion:
    ///// Fecha de creación:
    ///// Autor:
    ///// -----------------------------------------------------------------------------
    ///// </summary>
    //var obtenerSimboloMonetario = function () {

    //    return argumentosInit.SimboloMonetario;
    //};

    //var obtenerSimboloMiles = function () {

    //    return argumentosInit.SimboloMiles;
    //};

    //var obtenerSimboloDecimales = function () {

    //    return argumentosInit.SimboloDecimal;
    //};
    //var initRapiWebArgumentos = function (args) {
    //    if (args != null && args != undefined) {
    //        argumentosInit = args;
    //    }
    //    return argumentosInit;
    //};

    //function getMontoFormateado(monto) {
    //    return obtenerSimboloMonetario() + $.number(parseFloat(monto), 2, obtenerSimboloDecimales(), obtenerSimboloMiles())
    //};

    //$(document).on('ajaxloadcomplete', function () {

    //    var hashTag = (window.location.hash);
    //    if (hashTag != '') {
    //        hashTag = hashTag.replace("#", "").trim();
    //        var hashTag = hashTag.match("(.*)/");
    //        parametrizacionEtiquetas.fnParametrizacionEtiquetasRapiWeb(hashTag[1].trim());
    //    }
    //    return;
    //});

    return {
    //    fnEnableAjaxContent: enableAjaxContent,
    //    fnShowErrorMessage: showErrorMessage,
       // fnShowSuccessMessage: showSuccessMessage,
    //    fnShowInfoMessage: showInfoMessage,
        fnShowWaitingDialog: showWaitingDialog,
        fnShowHideDialog: showHideDialog,
    //    fnInitDatatables: fnInitDatatables,
    //    fnExecuteAsyncPostBack: fnExecute,
        fnExecuteWithResult: fnExecuteWithResult//,
    //    fnExecuteWithResultIncreasedTimeout: fnExecuteWithResultIncreasedTimeout,
    //    fnNavigateAjax: navigateAjax,
    //    fnDoLogOff: logOffNavigate,
    //    fnJsonArray: fnJsonArray,
    //    fnGetDate: utils.fnGetDate,
    //    GetParameterByName: GetParameterByName,
    //    fnOldBrowser: oldBrowser,
    //    Init: initRapiWebArgumentos,
    //    fnGetMontoFormateado: getMontoFormateado,
    //    SimboloMonetario: obtenerSimboloMonetario,
    //    SimboloMiles: obtenerSimboloMiles,
    //    SimboloDecimal: obtenerSimboloDecimales
    };
}();

