var autorizacionLogin = function () {
    var modalLogin = $('#GetOfferModal'); //$('#GetOfferModal'); 
    var form = $("#formGetOffer");
    var btnAutorizar = $("#formGetOffer");
    var fnCallbak = null;
    

    var fnInit = function () {
        btnAutorizar.unbind().click(fnAutorizar);
    };

    var fnLogin = function () {
        var oUrl = 'Login/AutenticarUsuario';

        var oData =
        {
            "CodigoUsuario": txtUsuario.val(),
            "Password": txtPassword.val()
        };

        var oProcessMessage = 'Verificando acceso, espere por favor...';
        var success = function (result) {
            if (result.Data.length > 0) {
                fnCallbak(result.Data);
            }
            else
                //alert(result.InfoMessage == "" ? result.ErrorMessage : result.InfoMessage);
                $.dialog.alert('Login', result.InfoMessage == "" ? result.ErrorMessage : result.InfoMessage, function () {
                })

        };
        app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
    }
    
    var fnAutorizar = function () {
        if (form[0].checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        if (form[0].checkValidity() === true) {
           
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