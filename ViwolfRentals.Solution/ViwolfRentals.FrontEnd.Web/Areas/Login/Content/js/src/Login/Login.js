var Login = function () {
    var btnEntrar = $("#btnEntrar");
    var txtUsuario = $("#txtUsuario");
    var txtPassword = $("#txtPassword");

    $(function () {
        fnInit();
    });

    var fnInit = function () {
        btnEntrar.click(fnEntrar);
    }

    var fnEntrar = function (e) {
        debugger;
        reservaciones.fnMostrar();
       //try {
       //     var oUrl = 'Login/AutenticarUsuario'

       //         var oData =
       //         {
       //             "Usuario": txtUsuario.val(),
       //             "Password": txtPassword.val(),
       //         };

       //     var oProcessMessage = 'Autenticando, espere por favor...';

       //     var success = function (result) {
       //         debugger;
       //         alert("Bienvenido");
              
       //     };

       //     console.log(oData);
       //     app.fnExecuteWithResult(e, oUrl, oData, oProcessMessage, success);

       // }

       // catch (e) {
       //   //  app.fnShowErrorMessage(e.message);
       // }
    }
}();