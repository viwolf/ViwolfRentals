//DOCUMENTACION: https://nakupanda.github.io/bootstrap3-dialog/#available-options
var msjApp = function () {
    //PROPIEDADES**************************************
    //Objeto Mensajes para manejar los tipos de mensaje y los textos.
    var mensaje = {
        tipo: {
            error: BootstrapDialog.TYPE_DANGER,
            warning: BootstrapDialog.TYPE_WARNING,
            confirm: BootstrapDialog.TYPE_WARNING,
            success: BootstrapDialog.TYPE_SUCCESS
        },
        titulo: {
            error: "<span class='fa fa-2x fa-times-circle' modal-warningV2' aria-hidden='true' style='color:white'></span>",
            warning: "<span class='fa fa-2x fa-exclamation-circle' aria-hidden='true'></span>",
            success: "<span class='fa fa-2x fa-check-circle' aria-hidden='true' style='color:white'></span>",
            confirm: "<span class='fa fa-2x fa-exclamation-circle' aria-hidden='true'></span>"
        },
        texto: {
            //Pantalla de cotización
            errorValidacionInventario: "No existe inventario suficiente en el detalle de la cotización, por favor revise que la cantidad de los productos no sea mayor a su existencia.",
            errorArticuloCantidadReq: "El campo Codigo de Articulo es requerido y Cantidad debe ser mayor a 0",
            errorValidacionSinDetalle: "Para poder continuar debe tener al menos un artículo agregado a la cotización",
            confirmCerrarSesion: "¿Desea cerrar sesión?",
            confirmAutorizarCotizacion: "¿Desea autorizar la cotización?",
            confirmTramitarCotizacion: "¿Desea tramitar la cotización?",
            successAutorizacion: "Se ha autorizado exitosamente",
            errorElimineExtragarantia: "Elimine la extra garantía actual para agregar una nueva",
            errorSeleccionarFila: "Debe seleccionar al menos una fila",
            confirmConsultarArtSustitutoSelected: "¿Desea consultar los articulos sustitutos seleccionado?",
            confirmConsultarArtRelacionadoSelected: "¿Desea consultar los articulos relacionados seleccionado?",
            confirmInventarioRemoto: "¿Desea consultar el inventario remoto del artículo seleccionado?",
            errorFiltroBusqueda: "Debe ingresar al menos un filtro de busqueda",
            errorSeleccioneVendedor: "Seleccione un Vendedor",
            errorMontoPagarMenor: "Monto recibido es menor al importe. Favor de verificar.",
            confirmGuardarFactura: "¿Desea guardar la factura?",
            errorSeleccionarMasOperaciones: "No puede seleccionar más de una operación.",
            errorSeleccionarNingunaOperacion: "Debe seleccionar una operación para poder continuar",

            // Devolución Busqueda
            errorDebolucionBusquedaCriterios: "Para iniciar la búsqueda debe indicar identificación o nombres y apellidos del cliente. Verifique e intente nuevamente",
            confirmPreautorizarComision: "¿Desea pre-autorizar las comisiones configuradas?",
            confirmPreautorizarEliminacion: "¿Desea eliminar la comisión seleccionada?",
            confirmPreautorizarEliminacionCorreo: "Esta acción enviará una notificación a las áreas responsables de aprobación",
            confirmPreautorizarEliminarDescuento: "¿Desea eliminar la jerarquía seleccionada?",
            confirmPreautorizarCancelar: "¿Desea cancelar todas las configuraciones de comisiones agregadas al listado?",
            confirmSendPreautorizar: "Esta acción enviará una notificación a las áreas responsables de aprobación",
            errorSeleccioneTipoCarga: "Seleccione un Tipo de Carga",
            errorSeleccioneEtiqueta: "Seleccione un Tipo de etiqueta",
            errorSeleccioneUnTipoComision: "Seleccione una Tipo de Comisión",
            errorSeleccioneUnaCadena: "Seleccione una Cadena",
            errorSeleccioneUnaTienda: "Seleccione una Tienda",
            errorSeleccioneUnEstatus: "Seleccione un Estatus",
            errorSeleccionePlazoInicial: "Indique un Plazo Inicial",
            errorSeleccionePlazoFinal: "Indique un Plazo Final",
            errorSeleccioneObservaciones: "Ingrese una observación",
            errorSeleccioneImpresion: "Ingrese un nombre en la Impresión",
            errorSeleccioneDescripcion: "Debe indicar un valor para Descripción, verifique e intente nuevamente",
            errorSeleccionePosicion: "Posición ya establecida para otro motivo de anulación",
            errorVerifiquePosicionValorNoValido: "Valor no válido, verifique e intente nuevamente",
            errorSeleccionePorAModificar: "Ingrese un porcentaje",
            errorSeleccioneTienda: "Seleccione una Tienda",
            errorSeleccioneNuevaJerarquia: "Digite una nueva Jerarquía",
            errorSeleccioneTipoVenta: "Seleccione un tipo de venta",
            errorSeleccioneCanalVenta: "Seleccione un canal de venta",
            errorSeleccioneCategoria: "Seleccione una categoria",
            errorSeleccioneComision: "Indique el porcentaje de comisión",
            errorSeleccionePremioVenta: "Indique el premio de venta",
            errorDiferenciaPorcentajes: "El porcentaje mínimo no puede ser mayor al Máximo, favor validarlo nuevamente",
            errorSeleccionePorcentajeMinimo: "Indique el porcentaje Mínimo",
            errorSeleccionePorcentajeMaximo: "Indique el porcentaje Máximo",
            errorSeleccionePorcentajeBono: "Indique el porcentaje de bono",
            errorDuplicados: "Hay registros duplicados, favor validar de nuevo los registros",
            errorDescuentoTipoIdentificacionInvalido: "Tipo Identificación inválido. Verificar archivo",

            confirmSendPreautorizar: "Esta acción enviará una notificación a las áreas responsables de aprobación",
            confirmRechazarComision: "¿Desea rechazar la aprobación de la comisión seleccionada?",
            confirmSendRechazarComision: "Esta Acción enviará una notificación a los interesados",
            confirmAprobarComision: "¿Desea aprobar la configuración de la comisión seleccionada?",
            confirmSendAprobarComision: "Esta Acción enviará una notificación a los interesados",
            //Parametrización de Reportes
            successGuardarReporte: "Se ha guardado el reporte con éxito.",
            confirmGuardarCambio: "¿Desea aplicar los cambios?",
            confirmCancelarCambio: "¿Esta seguro que desea salir sin guardar los cambios?",
            warningResultados: "La búsqueda que realizó no produjo resultados",
            warningSeleccionarFiltros: "Debe seleccionar al menos un criterio de busqueda.",

            successGuardarComisionesPremios: "Se ha guardado correctamente las configuraciones creadas",
            successGuardarComisiones: "Se ha guardado correctamente las configuraciones creadas",
            //Parametrización de Tabla
            confirmGuardarParametrizacion: "¿Desea aplicar los cambios?",
            errorSeleccioneModulo: "Seleccione un Módulo",
            errorSeleccioneFormaPago: "Seleccione una Forma de Pago",
            errorSeleccionPantalla: "Seleccione una Pantalla",
            warningSeleccionParametrizacionTabla: "No se encontraron datos",
            //Aviso
            confirmAviso: "¿Desea crear el nuevo aviso?",
            confirmEditAviso: "¿Desea aplicar los cambios?",
            confirmCancelAviso: "¿Desea cancelar los cambios?",
            errorCadena: "Seleccione una cadena",
            errorTienda: "Seleccione una tienda",
            errorAvisosRol: "Seleccione un perfil",
            errorEstatus: "Seleccione un estatus",
            errorPrioridad: "Seleccione una prioridad",
            errorFechaInicio: "Ingrese fecha inicial",
            errorFechaFin: "Ingrese fecha final",
            errorAvisoFormatoFecha: "Fecha inválida, favor de verificar",
            errorFechaFinInicio: "La fecha de inicio no puede ser mayor a la fecha final",
            errorAviso: "Ingrese un aviso",
            errorDescripcion: "Ingrese una descripción de aviso",
            errorPerfil: "Ingrese perfil",
            confirmEliminarAviso: "¿Desea eliminar el aviso?",
            // Tarjeta de regalo
            errorTarjetaFormatoFecha: "Fecha inválida, favor de verificar",
            errorTarjetaFechaFinInicio: "La fecha de inicio no puede ser mayor a la fecha final",
            //Parametros
            errorSeleccioneObservaciones: "Ingrese una observación",
            errorSeleccioneObservacion: "Debe indicar un motivo de la descripción a través del campo 'Observaciones'",
            errorSeleccionPosicion: "Valor no válido, verifique e intente nuevamente",
            errorSeleccioneValor: "Ingrese un Valor",
            errorSeleccioneCategoria: "Seleccione una categoria",
            confirmSaveParametro: "¿Desea aplicar los cambios?",
            confirmContinuarCargaCliente: "Ya existe un cliente con el número de cédula ingresado. \n ¿Desea seleccionarlo?",
            successGuardarCliente: "El cliente ha sido guardado correctamente.",
            //AgrupacionTienda
            errorSeleccioneAgrupacionTienda: "Seleccione una agrupación",
            successGuardarCliente: "El cliente ha sido guardado correctamente.",

            //Presupuesto Mensual
            confirmGuardarPresupuesto: "¿Desea guardar la configuración de los presupuestos?",
            resultCantidadPresupuestos: "Cantidad de registros almacenados: ",
            //Validación Motivo de Anulación
            confirmHabilitaCheck: "Ésta acción habilita éste motivo de anulación en las pantallas de anulación de recibos. ¿Está seguro?",
            //Descuentos
            errorDatosObligatoriosDesc: "Faltan datos obligatorios",
            etiquetaObligatoria: "La etiqueta no se puede desactivar ya que corresponde a un campo obligatorio en la pantalla",
            errorNoExpoprtado: "No existen datos para ser exportados.",
            errorNoNumero: "El dato introducido debe ser un número.",
            confirmLimpiar: "¿Desea limpiar la información del formulario?",
            confirmEliminar: "¿Desea eliminar el registro?",
            errorSeleccioneDescuento: "Seleccione una promoción",
            errorSeleccioneDetalleDesc: "Seleccione un detalle de descuento",
            errorNombreDetalleDuplicado: "El nombre del detalle de descuento ya existe",
            successCargaMasivaArticulos: "Carga finalizó exitosamente",
            errorCargaMasivaArticulos: "Carga finalizó erróneamente",
            //Historial de Cambios
            errorHistorialFormatoFecha: "Fecha inválida, favor de verificar",
            //Combos
            errorArticulo: "El campo Código de Artículo es requerido",
            confirmCombo: "¿Desea guardar combo {0}?",
            confirmEliminarCombo: "¿Desea eliminar combo {0}?",
            confirmEmpleado: "¿Desea guardar empleado {0}?",
            confirmEliminarEmpleado: "¿Desea eliminar empleado {0}?",
            confirmEliminarArticulo: "¿Desea eliminar el artículo {0}?",
            errorCombosFormatoFecha: "Fecha inválida, favor de verificar",
            errorCombosFechaFinInicio: "La fecha de inicio no puede ser mayor a la fecha final",
            errorEmpleadosFormatoFecha: "Fecha inválida, favor de verificar",
            //Categoria Tienda
            confirmGuardarCategoria: "¿Desea aplicar los cambios?",
            confirmCancelarCategoria: "¿Desea salir sin guardar los cambios?",

            //Reportes-Definir Categoria
            successGuardarDefinirCategoria: 'Proceso efectuado con exito',
            errorSeleccionCodigoSAP: "Ingrese un Codigo SAP",
            warningResultadosBusqueda: "La consulta no produjo resultados, revise los filtros y vuelva a realizar la búsqueda",
            //Convenios
            errorNoModificacion: "No se a modificados registros.",
            warningCompletarCampos: "Verifique que los campos esten completos.",
            successGuardarConvenio: "Se ha guardado el convenio con éxito.",
            successPromocion: "Promoción creada satisfactoriamente",
            successPromocionGuardar: "Promoción modificada satisfactoriamente",

            //ventana detalle de pago
            warningNoQuedanFormasDePagoParaAgregar: "No quedan formas de pago para agregar",

            //Articulos Relacionados y Sustitutos
            ConfirmEliminarArticuloBaseArticuloRelacionado: "Esta seguro que desea eliminar la relación, esta acción eliminaría todos los artículos relacionados",
            ConfirmEliminarArticuloBaseArticuloSustitutos: "Esta seguro que desea eliminar la relación, esta acción eliminaría todos los artículos relacionados",
        }
    }

    //variable de opciones para el modal de confirmación
    var optionsConfirm = {
        closeByBackdrop: false,
        title: mensaje.titulo.confirm,
        message: '',
        type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
        closable: true, // <-- Default value is false
        draggable: true, // <-- Default value is false
        btnCancelLabel: 'NO', // <-- Default value is 'Cancel',
        btnOKLabel: 'SI', // <-- Default value is 'OK',
        btnOKClass: 'btn-warning', // <-- If you didn't specify it, dialog type will be used,
        callback: null,
        draggable: true
    };

    var optionsMsj = {
        closeByBackdrop: false,
        draggable: true,
        type: null,
        title: '',
        message: '',
        buttons: [{
            label: 'Aceptar',
            action: function (dialogItself) {
                dialogItself.close();
            }
        }]
    };
    //FIN PROPIEDADES**************************************

    /// <summary>
    /// Function: Constructor
    /// Fecha de creación: 02/05/2016
    /// Autor: ErnestoMolinares 
    /// </summary>
    $(function () {
        init();
    });

    function init() {
        //TODO:cargar mensaje.texto desde de la base de datos
    }

    /// <summary>
    /// Function: showConfirm
    /// Descripcion: Función encargada de mostrar un modal de confirmación.
    /// Fecha de creación: 02/05/2016
    /// Autor: ErnestoMolinares 
    /// </summary>
    function showConfirm(text, fnConfirmTrue, fnConfirmFalse, okLabel, cancelLabel) {
        fnConfirmFalse || (fnConfirmFalse = null);//Se le asigna un valor por defecto en caso de que no se envíe en los parámetros

        optionsConfirm.message = text;

        if (typeof (okLabel) != 'undefined')
            optionsConfirm.btnOKLabel = okLabel;

        if (typeof (cancelLabel) != 'undefined')
            optionsConfirm.btnCancelLabel = cancelLabel;

        optionsConfirm.callback = function (result) {
            if (result) {
                fnConfirmTrue();
            } else {
                if (fnConfirmFalse != null)
                    fnConfirmFalse();//Función que se ejecuta cuado NO se confirma
            }
        }

        BootstrapDialog.confirm(optionsConfirm);

    }

    /// <summary>
    /// Function: showSuccessMessage
    /// Descripcion: Función encargada de mostrar un modal tipo Success.
    /// Fecha de creación: 02/05/2016
    /// Autor: ErnestoMolinares 
    /// </summary>
    function showSuccessMessage(texto) {
        optionsMsj.message = texto;
        optionsMsj.title = mensaje.titulo.success;
        optionsMsj.type = mensaje.tipo.success;
        BootstrapDialog.show(optionsMsj);
    }

    /// <summary>
    /// Function: showWarningMessage
    /// Descripcion: Función encargada de mostrar un modal tipo warning.
    /// Fecha de creación: 02/05/2016
    /// Autor: ErnestoMolinares 
    /// </summary>
    //function showWarningMessage(texto) {
    //    optionsMsj.message = texto;
    //    optionsMsj.title = mensaje.titulo.warning;
    //    optionsMsj.type = mensaje.tipo.warning;
    //    BootstrapDialog.show(optionsMsj);
    //}

    function showWarningMessage(texto, callback) {
        optionsMsj.message = texto;
        optionsMsj.title = mensaje.titulo.warning;
        optionsMsj.type = mensaje.tipo.warning;

        if (typeof callback === 'function')
            optionsMsj.buttons.forEach(function (val, index, arr) {
                if (val.label === 'Aceptar') {
                    let defaultAction = val.action;

                    val.action = function (dialog) {
                        defaultAction(dialog);
                        callback();
                    };
                }
            });

        BootstrapDialog.show(optionsMsj);
    }

    /// <summary>
    /// Function: showErrorMessage
    /// Descripcion: Función encargada de mostrar un modal tipo error.
    /// Fecha de creación: 02/05/2016
    /// Autor: ErnestoMolinares 
    /// </summary>
    function showErrorMessage(texto, titulo, oUrl) {
        titulo || (titulo = "");//Se le asigna un valor por defecto en caso de que no se envíe en los parámetros
        oUrl || (oUrl = "");//Se le asigna un valor por defecto en caso de que no se envíe en los parámetros
        optionsMsj.message = "<div id='errorContentTxt'><h1>" + oUrl + "</h1>" + texto + "</div>";
        optionsMsj.title = mensaje.titulo.error + "&nbsp;&nbsp;" + titulo;
        optionsMsj.type = mensaje.tipo.error;
        BootstrapDialog.show(optionsMsj);
    }
    /// <summary>
    /// Function: return
    /// Descripcion: Retorno de las funciones que pueden ser invocadas por los diferentes forms.
    /// Fecha de creación: 02/05/2016
    /// Autor: ErnestoMolinares 
    /// </summary>
    return {
        fnShowConfirm: showConfirm,
        fnShowSuccessMessage: showSuccessMessage,
        fnShowWarningMessage: showWarningMessage,
        fnShowErrorMessage: showErrorMessage,
        txt: mensaje.texto
    };
}();

