

var Login = function () {
    /*==================================================================
   [ Validate ]*/
    var input = $('.validate-input .input100');
    var btnLogin = $("#btnEntrar");
    var txtUsuario = $("#txtUsuario");
    var txtPassword = $("#txtPassword");
    var check = true;

    var fnInit = function () {
        
        btnLogin.click(fnLogin);

        $('.validate-form').on('submit', function () {
        

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
        });

        $('.validate-form').on('submit', function () {
        //var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }


    }

    var fnCargarParametros = function () {
        var usuario = {
            "Usuario": txtUsuario.val(),
            "Password": txtPassword.val()
        };

        return JSON.stringify(usuario);

    };

    var fnLogin = function (e) {
       
        if ((txtUsuario.val() != '') && (txtPassword.val() != '')) {
            check = false;
        }

        if (check === false) {

            if ((txtUsuario.val() != '') && (txtPassword.val() != '')) {
                var oUrl = 'Login/AutenticarUsuario';

                var oData =
                {
                    "CodigoUsuario": txtUsuario.val(),
                    "Password": txtPassword.val()
                };

                var oProcessMessage = 'Verificando acceso, espere por favor...';
                var success = function (result) {           
                    if (result.Data.length > 0) {
                        debugger;
                        //window.location.href = "http://localhost/ViwolfRentals.FrontEnd.Web/Viwolf";
                        window.location.href = window.location.pathname.replace("Seguridad","Viwolf");
                    }
                    else
                        alert(result.InfoMessage == "" ? result.ErrorMessage : result.InfoMessage);
                };
                app.fnExecuteWithResult(null, oUrl, oData, oProcessMessage, success);
            }
        }
           
    }

    $(function () {

        fnInit();


    });
          
}();



//(function ($) {
//    "use strict";

//    init();
    
//    /*==================================================================
//    [ Validate ]*/
//    var input = $('.validate-input .input100');



//    $('.validate-form').on('submit',function(){
//        var check = true;

//        for(var i=0; i<input.length; i++) {
//            if(validate(input[i]) == false){
//                showValidate(input[i]);
//                check=false;
//            }
//        }

//        return check;
//    });


//    $('.validate-form .input100').each(function(){
//        $(this).focus(function(){
//           hideValidate(this);
//        });
//    });

//    function validate (input) {
//        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
//            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
//                return false;
//            }
//        }
//        else {
//            if($(input).val().trim() == ''){
//                return false;
//            }
//        }
//    }

//    function showValidate(input) {
//        var thisAlert = $(input).parent();

//        $(thisAlert).addClass('alert-validate');
//    }

//    function hideValidate(input) {
//        var thisAlert = $(input).parent();

//        $(thisAlert).removeClass('alert-validate');
//    }
    
    

//})(jQuery);