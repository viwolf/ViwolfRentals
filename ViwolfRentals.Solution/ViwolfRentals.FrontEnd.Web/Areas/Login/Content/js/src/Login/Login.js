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
        //var serviceURL = '/Login/AutenticarUsuario';

        //$.ajax({
        //    type: "POST",
        //    url: serviceURL,
        //    data: param = "",
        //    contentType: "application/json; charset=utf-8",
        //    dataType: "json",
        //    success: successFunc
        //    //error: errorFunc
        //});

        //function successFunc(data, status) { alert(data); }


        
        try {
            var oUrl = 'Login/AutenticarUsuario'

                var oData =
                {
                    "Usuario": txtUsuario.val(),
                    "Password": txtPassword.val(),
                };

            var oProcessMessage = 'Autenticando, espere por favor...';

            var success = function (result) {
                debugger;
                alert("Bienvenido");
              
            };

            console.log(oData);
            app.fnExecuteWithResult(e, oUrl, oData, oProcessMessage, success);

        }

        catch (e) {
          //  app.fnShowErrorMessage(e.message);
        }
    }
}();