var autorizar = function () {
    var modalAutorizar = $('#popupAutorizarOperacion');

    var fnInit = function () {
        modalAutorizar.modal('show');
    }

    var fnAbrirModal = function () {

        fnInit();
    };

    return {
        AbrirModal: fnAbrirModal
    }
}();

