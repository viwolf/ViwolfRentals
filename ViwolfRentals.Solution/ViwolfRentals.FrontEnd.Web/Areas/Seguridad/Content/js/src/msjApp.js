//DOCUMENTACION: https://nakupanda.github.io/bootstrap3-dialog/#available-options
var msjApp = function () {
    //PROPIEDADES**************************************
    //Objeto Mensajes para manejar los tipos de mensaje y los textos
    var mensaje = {
        tipo: {
            error: BootstrapDialog.TYPE_DANGER,
            warning: BootstrapDialog.TYPE_WARNING,
            confirm: BootstrapDialog.TYPE_WARNING,
            success: BootstrapDialog.TYPE_SUCCESS,
            danger: BootstrapDialog.TYPE_DANGER,
        },
        titulo: {
            error: "<span class='fa fa-2x fa-times-circle' modal-warningV2' aria-hidden='true'></span>",
            warning: "<span class='fa fa-2x fa-exclamation-circle' aria-hidden='true'></span>",
            success: "<span class='fa fa-2x fa-check-circle' aria-hidden='true'></span>",
            confirm: "<span class='fa fa-2x fa-exclamation-circle' aria-hidden='true'></span>",
            danger: "<span class='fa fa-2x fa-exclamation-circle faa-flash animated' style='color:red' aria-hidden='true'></span>",
        },
        texto: {
            //Pantalla de cotización
            errorValidacionInventario: "No existe inventario suficiente en el detalle de la cotización, por favor revise que la cantidad de los productos no sea mayor a su existencia.",
            errorArticuloCantidadReq: "El campo Codigo de Articulo es requerido y Cantidad debe ser mayor a 0",
            errorValidacionSinDetalle: "Para poder continuar debe tener al menos un artículo agregado a la cotización",
            confirmCerrarSesion: "¿Desea cerrar sesión?",
            confirmAutorizarCotizacion: "¿Desea autorizar la cotización?",
            confirmTramitarCotizacion: "¿Desea tramitar la cotización?",
            confirmEliminarFila: "¿Desea Eliminar la Fila?",
            successAutorizacion: "Se ha autorizado exitosamente",
            errorElimineExtragarantia: "Elimine la extra garantía actual para agregar una nueva",
            errorSeleccionarFila: "Debe seleccionar al menos una fila",
            confirmConsultarArtSustitutoSelected: "¿Desea consultar los articulos sustitutos seleccionado?",
            confirmConsultarArtRelacionadoSelected: "¿Desea consultar los articulos relacionados seleccionado?",
            confirmInventarioRemoto: "¿Desea consultar el inventario remoto del artículo seleccionado?",
            errorFiltroBusqueda: "Debe ingresar al menos un filtro de busqueda",
            errorSeleccioneVendedor: "Seleccione un Vendedor",
            errorSeleccionarCotizacion: "Debe seleccionar la cotización a facturar. Favor verfique",
            facturaSatisfactoria: "Se registró la factura de manera satisfactoria.",
            cotizacionNoEncontrada: "No se encontró la cotización.",
            errorSeleccioneVendedor: "Seleccione un Vendedor",
            errorCedulaPostGarantia: "Debe digitar una cédula antes de hacer la búsqueda",
            errorMontoPagarMenor: "Monto recibido es menor al importe. Favor de verificar.",
            confirmGuardarFactura: "¿Desea guardar la factura?",
            confirmAnularVoucher: "Recuerde que este proceso es irreversible. \n ¿Desea anular el voucher Núm. {0}?",
            errorSeleccionarMasOperaciones: "No puede seleccionar más de una operación.",
            errorSeleccionarNingunaOperacion: "Debe seleccionar una operación para poder continuar",
            //Devolución
            confirmIniciarNewSearch: "¿Desea iniciar una nueva búsqueda?",
            successAnulacionApartado: "Anulación Adelanto Apr. Núm {0} procesada con éxito!",
            confirmAnularApartado: "Usted va a aplicar una \n{0}\n A la operación núm. {1}\n Cliente: {2}\n ¿Desea grabar los cambios?",
            successMsjAbandono: "La nota de crédito tipo “Nota de Artículo en abandono” no realizará ningún crédito al cliente, ni  tampoco anulará algún tipo de crédito ligado a la factura",
            confirmArticulosAbandono: "¿Desea guardar el documento?",
            warningNoSeEncontraronAprVenc: "No se encontraron apartados vencidos.",
            confirmAnularApartadoVencido: "¿Desea anular los apartados seleccionados?",
            warningIngresoServicios: "Ingreso por Servicios Núm {0} no retornó ningún resultado",
            warningIngreso: "Este anticipo no está permitido anularlo",
            warningEliminarArticulo: "Acción no permitida. Se debe eliminar previamente al Servicio.",
            warningServicioNoDisponible: "Los Servicios asociados a la factura no estan disponibles para Nota de Crédito por Devolución.Puede continuar con la Devolución.",
            warningFacturaInvalida: "Factura Núm. {0} no retornó ningún resultado",
            warningTiendaDiferente: "El código de la tienda de compra es diferente al código de la tienda donde se está realizando la devolución. Este movimiento no está permitido",
            warningDevFlexiMismoDiaAdelanto: "No están permitidas devoluciones parciales del mismo día para Flexipagos con Adelanto.",
            warningSerieVacia: "Debe indicar la serie del artículo para poder facturar.",
            warningSerieRepetida: "Serie repetida, verifique e intente nuevamente.",
            successCambioArticulo: "Cambio de Artículo Núm. {0} procesado con éxito",
            warningParcialMismoDia: "No están permitidas Notas de Cambio parciales para facturas del mismo día.",
            warningParcialMismoDiaContado: "Factura emitida el mismo día, no se permiten devoluciones parciales.",
            warningEntreTiendasMismoDiaContado: "Factura emitida el mismo día, no se permiten para devoluciones Entre Tiendas.",
            warningVendedor: "Debe seleccionar un Vendedor para la Factura de cambio.",
            warningFormaPago: "Debe seleccionar una Forma de Pago para la Factura de cambio.",
            warningMismoDiaDev: "Operación no válida para el mismo día, realice una Devolución de Factura de Contado.",
            warningNotaCambioNoValida: "Solo puede realizar una nota de cambio con los mismos artículos",
            warningCantExist: "Cambio de artículo no válido, la existencia es menor a la cantidad de artículos a cambiar.",
            warningProcesarRecibo: "Usted va a procesar un recibo.<br /> \
                                    <font color='red'><strong>Para evitar duplicidad y descuadre en su hoja de caja, usted debe de esperar hasta que el recibo termine de ser procesado</strong></font>.<br />\
                                    Por favor, espere hasta que <u><strong>el ticket se imprima o reciba una respuesta</strong></u>.",
            successArticuloDiferente: "Devolución núm. {0} y Factura núm. {1}\n Procesadas con éxito.",
            confirmCambioArticulo: "Usted va a aplicar una \n{0}\n A la factura {1}\n Cliente: {2}\n ¿Desea grabar los cambios?",
            confirmEliminarArtCam: "Desea eliminar este artículo del detalle del cambio a realizar?",
            confirmEliminarNotaDev: "Desea eliminar este detalle de la nota de devolución?",
            confirmEliminarCombo: "El artículo seleccionado pertenece a un combo por lo que se procede con la anulación de la totalidad del combo. ¿Está de acuerdo?",
            confirmCambioAplicara: "Esta acción modificará el detalle de la nota de devolución. Desea continuar?",
            successDevolucionProceso: "Operación registrada, el cliente debe dirigirse al área de caja para completar el cambio de artículo.",
            confirmAnularDevolucion: "Desea anular la operación de Cambio de Artículo?\n Esta acción elimina la Nota de Crédito por Devolución que se encuentra 'En Proceso' ",
            successDevolucionContado: "Devolución núm. {0} procesada con éxito.",

            // Etiquetas Rapiweb
            warningEtiquetasBusqueda: "No se encontraron resultados.",
            warningEtiquetasMaximoImprimir: "Esta opción le permite seleccionar un máximo de 50 etiquetas a imprimir.",
            warningEtiquetasNoSeHaSeleccionado: "No se ha seleccionado ningún artículo.",

            // Devolución Busqueda
            errorDebolucionBusquedaCriterios: "Para iniciar la búsqueda debe indicar identificación o nombres y apellidos del cliente. Verifique e intente nuevamente",
            clienteNoTieneApartados: "No se encontraron registros para los valores ingresados.",
            errorClientesSinOperaciones: "No se encontraron registros para los valores ingresados",
            confirmDeseaGuardarElDocumento: "¿Desea guardar el documento?",

            //Anulación de Recibos de Apartados
            errorObservacionesRequerido: "Debe ingresar el motivo de la devolución en el campo Observaciones.",
            errorNumeroBoletasRequerido: "Debe ingresar el Numero de Boleta en el campo Numero Boleta.",
            errorMotivoRequerido: "Debe escoger un motivo de anulación para proceder a Anular.",
            confirmNuevaBusqueda: "¿Desea iniciar una nueva búsqueda?",
            confirmAnularRecibo: "¿Desea anular el recibo?",
            errorSeleccionarAbono: "Favor seleccionar solo el abono a Anular.",
            errorTiendaAnular: "No puede anular recibos de apartado de otras tiendas.",
            errorTiendaCancelar: "No puede cancelar un apartado que se llevo a cabo en otra tienda.",
            errorTiendaReciboAnular: "No puede anular recibos de otras tiendas.",
            confirmExitoAnularNuevo: "Anulación procesada satisfactoriamente. ¿Desea anular otro recibo a este cliente?",
            waringBusquedaApartado: "No se encontraron clientes con cuentas activas para los valores ingresados",

            //Anulación de Recibos Contado FlexiPagos
            confirmNuevaBusquedaAnularReciboFlexipagos: "¿Desea iniciar una nueva búsqueda?",
            successAnularReciboFlexipagos: "Anulación procesada satisfactoriamente.",
            confirmAnularNuevoReciboFlexipagos: "¿Desea anular otro recibo a este cliente?",
            errorBusquedaEnRecibosAnularReciboFlexipagos: "No se encontraron registros para los valores ingresados",
            errorBusquedaIdNumeroIdentAnularReciboFlexipagos: "Para iniciar la búsqueda debe indicar Tipo de identificación y No. Identificación Verifique e intente nuevamente.",
            errorBusquedaApellidosNombreAnularReciboFlexipagos: "Para iniciar la búsqueda por “Nombre y Apellidos” debe indicar Primer nombre y Primer apellido del cliente. Verifique e intente nuevamente.",
            errorReciboVencidoAnularReciboFlexipagos: "El Recibo seleccionado tiene más de 30 días de emitido. Verifique e intente nuevamente",
            successAbonoApartado: "El registro se ha guardado satisfactoriamente.",
            errorAbonoApartado: "Proceso no ejecutado.",
            errorObservacionesRequeridoAnularReciboFlexipagos: "Debe ingresar un motivo en la observación para anular.",
            //Parametros
            errorSeleccioneObservaciones: "Ingrese una observación",
            errorSeleccioneValor: "Ingrese un Valor",
            errorSeleccioneCategoria: "Seleccione una categoria",
            confirmSaveParametro: "¿Desea aplicar los cambios?",

            //detallePago
            confirmSaveDocumentoDetallePago: "¿Desea guardar el documento?",
            errorCotizacionFacturada: "La cotización ya fue facturada.",

            //Movimientos Inventario
            articuloNoEncontrado: "Articulo no encontrado.",
            sucessRegistroCompleto: "Entrada de mercadería ha sido completada satisfactoriamente",
            sucessRegistroCompletoTraslado: "El traslado ha sido creado satisfactoriamente",
            sucessSalidaMercaderia: "La salida de mercaderia ha sido completada satifastoriamente",
            confirmSaveMovimientoInventario: "Realmente desea completar la entrada de inventario ",
            confirmSaveEntradaMercaderia: "Realmente desea completar la entrada: ",
            confirmSaveSalidaMercaderia: "Realmente desea completar la salida: ",
            confirmSaveTransaccion: "Realmente desea completar la transacción ",
            errorObservacion: "Debe de ingresar una observación.",
            warningCantidadArt: "No se puede completar la entrada, Verificar los artículos en tienda",
            warningCantidadArtSalida: "No se puede completar la salida, Verificar los artículos en tienda",

            warningCantidadArtEntradaMercaderia: "No se puede completar la entrada, Verificar los artículos en tienda",
            warningCantidadArtSalidaMercaderia: "No se puede completar la salida, Verificar los artículos en tienda",
            warningCantidadArtSalidaTraslado: "No se puede completar la salida, Verificar los artículos en tienda",
            warningCantidadArtTrasladoBodega: "No se puede completar la salida, Verificar los artículos en tienda",
            confirmGuardarEntradaDeMercaderia: "¿Realmente desea completar la entrada: ",
            confirmGuardarSalidaDeMercaderia: "¿Realmente desea completar la salida: ",
            confirmGuardarEntradaPorTraslado: "¿Realmente desea completar el traslado: ",
            confirmMomivientoMensajeEstandar: "¿Realmente desea completar la transacción?",

            sucessRegistroEntradaDeMercaderia: "Entrada de mercadería ha sido completada satisfactoriamente",
            sucessRegistroSalidaDeMercaderia: "La salida de mercadería ha sido completada satisfactoriamente",
            sucessRegistroEntradaPorTraslado: "El traslado ha sido completado satisfactoriamente",
            sucessRegistroSalidaPorTraslado: "El traslado ha sido creado satisfactoriamente",
            sucessRegistroTrasladoEntreBodega: "El traslado ha sido creado satisfactoriamente",
            sucessRegistroMovimientoEstandar: "El traslado ha sido creado satisfactoriamente",

            warningObservacionObligatorio: "No se puede completar, El campo Observación es obligatorio",
            warningProveedorObligatorio: "El Proveedor debe ser seleccionado",
            warningTipoMovimientoObligatorio: "El Tipo Movimiento debe ser seleccionado",
            warningValidaMovimientoInventario: "No se puede realizar el movimiento, verificar el inventario",


            //Remesas
            errorTipoRemesa: "Debe seleccionar una opcion de Mi Remesa o Todas las remesas",

            //CierreTiendaDiario
            cierreDiarioMenu: "El Cierre Diario ya se realizó en el sistema, algunas funcionalidades pueden encontrarse deshabilitadas",
            cierreDiarioPantalla: "El Cierre Diario ya se realizó en el sistema, esta funcionalidad esta deshabilitada",

            //Depositos
            sucessDepositos: "El depósito se ha creado satisfactoriamente",
            errorDepositos: "Ocurrió un error al registrar el depósito.",
            fechasDepositos: "El rango de las fechas no puede exceder los dos meses.",
            fechaDistintaDepositos: "Solo se pueden desactivar depósitos del mismo día.",

            //Articulos no encontrados -- Devoluciones
            errorArticulosNoEncontradosDevoluciones: "No existen artículos con existencia para la búsqueda realizada.",
            errorAnticipos: "No existen Anticipos que coincidan con los criterios de búsqueda.",
            errorAnticipo: "El número de anticipo es un valor requerido",
            // ControlGatos - Index.cshtml
            warningDateConstraint: 'La Fecha de Inicio no puede ser mayor que la Fecha Final',
            warningDateConstraintDiffrence: 'Rango de Fechas para la consulta no puede ser mayor a 2 meses',
            warningDateMissingFechaIni: 'Debe seleccionar una Fecha Inicial',
            warningDateMissingFechaFin: 'Debe seleccionar una Fecha Final',
            warningAplicaAMissing: 'Debe se seleccionar un tipo de Aplicación',
            sucessCancelGasto: 'Egreso anulado correctamente.',
            egresoAnulado: 'El egreso ya se encuentra Inactivo.',
            warningCancelaGastoOtraFecha: 'Solo puede anular egresos que se hicieron el día de hoy.',
            warningCancelaGastoOtroAplica: 'No está permitido anular Egresos de Consumo de Anticipos',
            warningMissingCancelaGasto: 'Debe seleccionar el egreso que desea desactivar',

            // ControlGatos - ConsultaAdelanto.cshtml
            warningSelectMissing: 'Debe seleccionar un adelanto',

            // ControlGastos - NuevoGasto.cshtml
            warningMonto: 'Debe de ingresar un monto para el nuevo egreso',
            warningMontoCero: 'Monto del egreso debe ser mayor a cero',
            warningDetalle: 'Debe digitar un detalle para el nuevo egreso',
            warningTipoMovimiento: 'Debe seleccionar un tipo de movimiento',
            confirmEliminarTarjeta: "¿Está seguro que desea eliminar el voucher {0} ?",
            confirmEliminarNotaCredito: "¿Está seguro que desea eliminar esta Nota de Crédito por Dev.?",
            //successNuevoGast: 'Consumo de Anticipo núm. {0} procesado con éxito',
            successNuevoGast: 'Consumo de Anticipo procesado con éxito',
            //successNuevoSalidaEfectivo: 'Salida de Efectivo núm. {0} procesado con éxito.',
            successNuevoSalidaEfectivo: 'Salida de Efectivo procesado con éxito.',
            //successNuevoGastServicio: 'Salida de Efectivo núm. {0} procesado con éxito',
            successNuevoGastServicio: 'Salida de Efectivo procesado con éxito',
            warningDatosIdentificacion: 'Debe llenar todos los datos de identificación',

            // ControlIngresos - Index.cshtml
            sucessCancelIngreso: 'Ingreso anulado exitosamente.',
            warningCancelaIngresoOtraFecha: 'Solo puede anular ingresos que se hicieron el día de hoy.',
            warningCancelaIngresoNotaCredito: 'El ingreso seleccionado corresponde a un adelanto, el cual se debe anular con un egreso desde el módulo de Control de Egresos',
            warningCancelaIngresoPagoServicios: 'Este tipo de ingreso fue generado automáticamente y no se permite anularlo',
            warningCancelaIngresoPrestamo: 'No se puede anular este tipo de ingreso. Para poder anular un ingreso proveniente de la sociedad financiera debe anular el egreso',
            warningMissingCancelaIngreso: 'Debe seleccionar el ingreso que desea anular',
            //successNuevoIngreso: 'Recibo de dinero núm. {0} procesado con éxito',
            successNuevoIngreso: 'Recibo de dinero procesado con éxito',
            warningCancelaIngresoInactivo: 'El Ingreso ya se encuentra Inactivo.',

            confirmCierreDiario: '¿Desea generar el Cierre del día {0}?',
            successCierreDiarioCancelado: 'Proceso de cierre cancelado',
            successCierreDiarioRealizado: 'Cierre finalizado exitosamente',
            confirmCierreDiarioProceso: 'No se han rea,izado todos los Cierres. El cierre no podra continuar ¿Deseas ir a la pantalla faltante?',

            //AnulacionApartadoVencido
            successAnulacionApartadoVencido: 'Anulación procesada satisfactoriamente',
            confirmAnulacionApartadoVencido: '¿Desea anular los apartados seleccionados?',

            // Articulos de Abandono
            confirmCrearOtroArticuloAbandono: '¿Está seguro que desea crear otro artículo en abandono?',
            errorSeleccionProducto: 'Debe seleccionar un artículo',
            warningNoSeleccionArticulo: "No se seleccionó un artículo",
            warningObservacionesObligatorio: "Debe ingresar una observación para continuar",
            successGuardadoArticuloAbandono: "Se ha guardado correctamente el artículo",

            warningIngreseNumeroOperacion: "Por favor ingrese un numero de Operación",
            warningIngreseNumeroConsecutivo: "Debe ingresar un número de consecutivo",

            warningOperacionNoExiste: "El número de operación no existe, favor intente nuevamente",
            warningConsecutivoNoExiste: "El número de operación no existe, favor intente nuevamente",

            confirmReversion: "¿Está seguro que desea hacer la reversión del artículo en abandono?",
            confirmSinFactura: "¿Está seguro que desea hacer el ingreso del artículo en abandono?",
            confirmConFactura: "¿Está seguro que desea hacer el ingreso del artículo en abandono?",
            successGuardadoReversion: "Reversión procesada satisfactoriamente",
            warningIdentificacionObligatorio: "No se ha ingresado un número de identificación",
            warningNombreObligatorio: "",
            warningPrimerApellidoObligatorio: "",
            warningSegundoApellidoObligatorio: "",
            warningFechaOperacionObligatorio: "La fecha de operación es obligatoria",
            warningNoResultados: "No se obtuvo resultados con la información ingresada, favor validar e intentar nuevamente",
            warningOperacionSinArticulosDisponibles: "La operacion no cuenta con articulos disponibles.",
            warningOperacionNoExisteReversion: "El número de consecutivo para reversar no es válido",
            warningOperacionNoExisteConFactura: "El número de operación no existe, favor intente nuevamente",

            warningMissingSerialNumber: 'Debe de digitar el número de serie para el artículo: {0}',

            //ventana detalle de pago
            warningNoQuedanFormasDePagoParaAgregar: "No quedan formas de pago para agregar",
            //Seccion para los mensajes de la huella 
            errorSistemaHuella: "El cliente no se encuentra registrado o se presentó un error de conexión con el sistema Captura de Huella Digital, desea comunicarse con el Administrador para realizar el forzamiento correspondiente",
            errorSistemaHuellaDigital: "El cliente de huella no esta instalado, favor verificar con el Administrador",
            confirmacionHuella: "¿Desea hacer la verificación de la Huella?",
            intentoHuella: "Huella no corresponde con la verificación del cliente, ¿Desea hacer la verificación de la Huella nuevamente?",
            verificacionExitosa: "La verificación ha sido exitosa",
            finIntentos: "Ha llegado a la cantidad máxima de intentos posibles, para verificar exitosamente la huella digital, desea asistencia para proceder con la verificación",
            claveVerificada: "Clave verificada presione Aceptar para continuar con el proceso",

            //Facturacion 
            confirmContinuarSinSeguros: "No se puedo conectar con el servicio de Seguros, desea continuar de todas formas.",
            warningCantidadArtDevolucionIncorrecta: "Cantidad ingresada no es válida. Verifique e intente nuevamente.",
            errorValidacionSerieRepetida: 'Serie repetida, verifique e intente de nuevo.',
            errorNumeroMotorChasis: "Debe digitar el número de chasis y número de motor para todos los artículos requeridos.",


            //Extragarantias
            confirmContinuarSinExtragarantias: "El documento se va a procesar sin Extragarantia debido a que no hay conexión con el módulo de extragarantia, Desea Continuar",
            warningExtragarantiasAsociadas: "Esta cotización cuenta con extragarantias asociadas por favor verificar",
            warningNoExtragarantiasAsociadas: "No cuenta con extragarantías asociadas",


            //Consulta Articulos por Bodega
            confirmArticulosRelacionado: "¿Desea consultar los articulos relacionados seleccionado?",
            confirmArticuloSustituto: "¿Desea consultar los articulos sustitutos seleccionado?",
            confirmAbrirInventarioRemoto: "¿Desea consultar el inventario remoto del artículo seleccionado?",

            //Recibos 
            validacionMontoAbonarSuperaMontoContado: "El monto a Abonar no puede ser superior al monto de contado.",
            validacionMontoAbonarCero: "El monto a Abonar no puede ser cero.",
            confirmPrecargaRecibo: "¿Desea realizar un nuevo pago a este cliente.?",
            confirmPrecargaReciboApartado: "¿Desea realizar un nuevo pago a este cliente.?",
            errorRecibosBusquedaTipoIdentificacion: "Para iniciar la búsqueda debe seleccionar el Tipo de Identificación",
            errorRecibosBusquedaIdentificacion: "Para iniciar la búsqueda debe ingresar el No. de Identificación",
            warningSeleccionarMultiplesOperacion: "Solamente se puede realizar una operacion a la vez.",

            //reportManager
            errorReporteNoValido: "No se pudo obtener la información del reporte",
            errorPagareNoValido: "No se encontraron datos para mostrar el pagaré",
            DocumentoElecronicoNoDisponible: "El documento de hacienda aún no se encuentra disponible, por favor desmarcar la opción 'Doc.Elecrónico' e imprimir los documentos internos",

            //Aprobacion Cheques
            AsuntoCorreoActivacion: "Activación de Cheque",
            AsuntoCorreoDesactivacion: "Anulación de Cheque",
            CuerpoCorreoActivacion: "El día de hoy se realizó la activación del cheque con las siguientes características:",
            CuerpoCorreoDesactivacion: "El día de hoy se realizó la anulación del cheque con las siguientes características:",
            ErrorChequeAproRechObservacionRequerido: "El campo observación es obligatorio",
            WarningAnulacionCheque: "¿Desea continuar con la anulación del cheque?",
            WarningActivacionCheque: "¿Desea continuar con la Activación del cheque?",
            ErrorAproCheqFechaInicioMayor: "La fecha inicio no puede exceder la fecha final",
            MensajeAproCheqBusquedaNoResultados: "La búsqueda realizada no produjo resultados, favor varíe la selección e intente nuevamente",
            CuerpoCorreoAnulacinChequeObeservacion: "Observación:",

            WarningVoucherDevolucion: "Esta factura tiene un Voucher asociado, si requiere anularlo diríjase al Módulo de Voucher.",
            WarningValeUtilizado: "Núm. de Vale Corporativo ha sido utilizado previamente. Favor verifique.",
            WarningNoExistenFacturas: "No existen facturas asociadas al cliente",

            //<INI 22-06-2017> Edward llamoca
            //variables de anulacion de desembolso
            errorObservacionesRequeridoAnularDesembolso: "Para continuar se debe ingresar el motivo de la anulación en el campo llamado Observaciones.",
            confirmAnularDesembolso: "¿Seguro que desea realizar la anulación del registro?",
            errorRecibosBusquedaAnulaNumConsecutivo: "Para iniciar la búsqueda debe ingresar el número consecutivo de desembolso.",
            errorRecibosBusquedaAnulaAplicaA: "Para iniciar la búsqueda debe seleccionar a donde aplica.",
            errorDesembolsoNoBuscado: "Debe buscar desembolso de efectivo a anular.",
            errorAnulacionDesembolsoMismaTienda: "No es posible anular desembolsos de efectivo hechos en otras tiendas.",
            errorDisponibleDeLineaInsuficiente: "El cliente no cuenta con disponible para realizar el desembolso",
            errorVariacionesMontoDesembolsoEfectivo: "El monto de desembolso presenta variaciones, debe seleccionar nuevamente el escenario.",
            //variables de autorizacion
            successAutorizacion: "Autorización procesada satisfactoriamente.",
            confirmAutorizacionDesembolso: "¿Desea autorizar el desembolso?",
            //<FIN 22-06-2017> Edward llamoca

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
        btnCancelClass: 'btn-dan',
        callback: null,
        draggable: true
    };

    var optionsMsj = null;
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
        optionsMsj = GetDefaultOptionsMsj();
        //TODO:cargar mensaje.texto desde de la base de datos
    }

    function GetDefaultOptionsMsj(){
        return {
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
        else
            optionsConfirm.btnOKLabel = 'SI';

        if (typeof (cancelLabel) != 'undefined')
            optionsConfirm.btnCancelLabel = cancelLabel;
        else
            optionsConfirm.btnCancelLabel = 'NO';

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
    function showSuccessMessage(texto, callback, optsEvts) {
        optionsMsj.message = texto;
        optionsMsj.title = mensaje.titulo.success;
        optionsMsj.type = mensaje.tipo.success;

        if (typeof callback === 'function')
            optionsMsj.buttons.forEach(function (val, index, arr) {
                if (val.label === 'Aceptar') {
                    let defaultAction = val.action;

                    val.action = function (dialog) {
                        defaultAction(dialog);
                        callback();
                        optionsMsj = GetDefaultOptionsMsj();
                    };
                }
            });

        if (typeof optsEvts !== 'undefined' && optsEvts !== null) {
            let keys = Object.keys(optsEvts);

            if (typeof keys !== 'undefined')
                for (let i = 0; i < keys.length; i++)
                    optionsMsj[keys[i]] = optsEvts[keys[i]];

        }

        BootstrapDialog.show(optionsMsj);
    }

    /// <summary>
    /// Function: showWarningMessage
    /// Descripcion: Función encargada de mostrar un modal tipo warning.
    /// Fecha de creación: 02/05/2016
    /// Autor: ErnestoMolinares 
    /// </summary>
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
                        optionsMsj = GetDefaultOptionsMsj();
                    };
                }
            });

        BootstrapDialog.show(optionsMsj);
    }


    //showExclamationMessage
    function showDangerMessage(texto, callback) {
        optionsMsj.message = texto;
        optionsMsj.title = mensaje.titulo.danger;
        optionsMsj.type = mensaje.tipo.danger;
        optionsMsj.closable = false;
        if (typeof callback === 'function')
            optionsMsj.buttons.forEach(function (val, index, arr) {
                if (val.label === 'Aceptar') {
                    let defaultAction = val.action;

                    val.action = function (dialog) {
                        defaultAction(dialog);
                        callback();
                        optionsMsj = GetDefaultOptionsMsj();
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
        optionsMsj.title = mensaje.titulo.error;
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
        fnShowDangerMessage: showDangerMessage,
        fnShowErrorMessage: showErrorMessage,
        txt: mensaje.texto

    };
}();

