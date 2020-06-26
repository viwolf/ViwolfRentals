var extenderContrato = function () {
    var popupExtenderContrato = $('#popupExtenderContrato');
    var TxtContrato = $("#TxtContrato");
    var txtNombreClienteContrato = $("#txtNombreClienteContrato");
    var TxtFechaInicio = $("#TxtFechaInicio");
    var TxtFechaEntrega = $("#TxtFechaEntrega");
    var txtMontoDia = $("#txtMontoDia");
    var txtMontoTotal = $("#txtMontoTotal");
    var objContrato = null;



    var llenarObjeto = function () {
        TxtContrato.val(objContrato.NumeroContrato);
        txtNombreClienteContrato.val(objContrato.NombreCliente);
        TxtFechaInicio.val(objContrato.FechaInicio)
        TxtFechaEntrega.val(objContrato.FechaEntrega);
        txtMontoDia.val(objContrato.objReservacion.MontoDia);
        txtMontoTotal.val(objContrato.objReservacion.MontoTotal);
        
        
       
    };

    var abrirModal = function (objetoContrato) {
       
        objContrato = objetoContrato;
        llenarObjeto();

        popupExtenderContrato.modal('show');

    };
    return {
        AbrirModal: abrirModal
    }
}();