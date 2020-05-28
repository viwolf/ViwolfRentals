var autorizacionLogin = function () {
    var modalLogin = $('#GetOfferModal'); //$('#GetOfferModal');    
    var form = $("#formGetOffer");
    var btnAutorizar = $("#formGetOffer");
    var uname1 = $("#uname1");
    var pwd1 = $("#pwd1");
    var fnCallbak = null;
    var objeto = null;
    

    var fnInit = function () {
        btnAutorizar.unbind().click(fnAutorizar);
    };

    var fnLogin = function () {
        var oData =
        {
            "CodigoUsuario": uname1.val(),
            "Password": pwd1.val()
        };

        $.ajax({
            url: 'Reservaciones/AutorizarOperacion',
            type: 'POST',
            dataType: 'json',
            cache: false,
            data: oData,
            success: function (result) {
                debugger;
                fnCallbak(result);
            }
        });
    }
    
    var fnAutorizar = function () {
        if (form[0].checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        if (form[0].checkValidity() === true) {
            debugger;
            fnLogin();
          
        }

        form.addClass('was-validated');

       
       
    }

    var fnAbrirModal = function (callback) {
        fnCallbak = callback;
        fnInit();
        modalLogin.modal('show');
        //fnBuscarVehiculo();
    };

    return {
        AbrirModal: fnAbrirModal
    }
}();