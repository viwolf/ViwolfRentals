var Login = function () {
    /*==================================================================
   [ Validate ]*/
    var input = $('.validate-input .input100');
    var btnLogin = $("#btnEntrar");
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
        var check = true;

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

    var fnLogin = function (e) {
        debugger;
        if (check === false)
            alert("Bienvenido");
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