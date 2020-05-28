var autorizacionLogin = function () {
    var modalLogin = $('#GetOfferModal'); //$('#GetOfferModal'); 
    var form = $("#formGetOffer");
    var btnAutorizar = $("#formGetOffer");

    var fnInit = function () {
        btnAutorizar.unbind().click(fnAutorizar);
    };

    var fnAutorizar = function () {
        if (form[0].checkValidity() === false) {
            debugger;
            event.preventDefault()
            event.stopPropagation()

        }

        form.addClass('was-validated');
    }

    var fnAbrirModal = function () {
        //fnCallbak = callback;
        fnInit();
        modalLogin.modal('show');
        //fnBuscarVehiculo();
    };

    return {
        AbrirModal: fnAbrirModal
    }
}();