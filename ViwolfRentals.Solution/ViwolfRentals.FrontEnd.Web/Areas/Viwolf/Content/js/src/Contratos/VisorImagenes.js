var visorImagenes = function () {
    var popupVisorImagenes = $('#popupVisorImagenes');

    function MostrarImagen(url) { //cambiar la imagen
        f = url; //ruta de la nueva imagen
        document.images["fotoVisor"].src = f; //cambiar imagen
    }

    var abrirModal = function (src) {
       
        MostrarImagen(src);
        popupVisorImagenes.modal('show');
    };

    return {
        AbrirModal: abrirModal
    }

}();