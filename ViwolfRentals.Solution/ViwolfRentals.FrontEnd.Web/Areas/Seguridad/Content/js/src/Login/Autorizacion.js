var autorizacionLogin = function () {
    var modalLogin = $('#GetOfferModal'); //$('#GetOfferModal');    
    var form = $("#formGetOffer");
    var btnAutorizar = $("#btnGetOffer");
    var uname1 = $("#uname1");
    var pwd1 = $("#pwd1");
    var fnCallbak = null;
    var btnClose = $("#btnClose");
  
    var check = false;


    var fnValidar = function () {
        if (form[0].checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        form.addClass('was-validated');
        check = form[0].checkValidity();

    };
    

    var fnInit = function () {
        btnAutorizar.unbind().click(fnAutorizar);
        btnClose.unbind().click(fnClose);
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
                uname1.val('');
                pwd1.val('');
                modalLogin.modal('hide');
                fnCallbak(result);   
            }
        });
    }

    var fnClose = function () {
        fnCallbak(null); 
    }
    
    var fnAutorizar = function () {
        fnValidar();
        if (check == true) {
            fnLogin();
        }
    };

    var fnAbrirModal = function (callback) {
        fnCallbak = callback;
        fnInit();
        modalLogin.modal('show');
    };

    return {
        AbrirModal: fnAbrirModal
    }
}();