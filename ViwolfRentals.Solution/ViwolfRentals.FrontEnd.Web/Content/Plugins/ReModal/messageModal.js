var messageModal = function () {

    var showMessageModal = function (msg, oUrl) {
        var $modalDiv = $('<div class="modal fade" id="errorModal" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header" style="padding:35px 50px;"><div class="actions pull-right"><button type="button" class="btn pull-right" data-dismiss="modal">&times;</button></div><table><tr><td rowspan="2"><span class="glyphicon glyphicon-warning-sign modal-warning" aria-hidden="true"></span></td><td style="padding-left:20px"><h1> <label id="lblHeader"></label></h1></td></tr><tr><td style="padding-left:20px"><h4><label id="lblUrlAction"></label></h4></td></tr></table></div><div class="modal-body" style="padding:40px 50px;"><form role="form"><div class="row" style="heigth:400px;overflow:scroll;"><div class="col-md-6"><p><span id="lblError"></span></p></div></div><button id="btnCopiar" class="btn btn-success btn-sm pull-right" data-dismiss="modal"> Copiar</button></form></div></div></div></div>');
        $('body').append($modalDiv);

        fnCopy();

        var href = document.location.href;
        var lastPathSegment = href.substr(href.lastIndexOf('/') + 1);
        var controllerName = lastPathSegment.split('?')[0];

        $("#lblHeader").text(controllerName);
        $("#lblUrlAction").text(oUrl);
        $("#lblError").text(msg);
        $("#errorModal").modal('show');
    }

        return { fnShowMessageModal: showMessageModal };

    }();

    function copyToClipboard(elementId) {
        var aux = document.createElement("input");
        aux.setAttribute("value", document.getElementById(elementId).innerHTML);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");
        document.body.removeChild(aux);

    }

    function fnCopy() {
        $("#btnCopiar").click(function () {
            copyToClipboard('lblError');

        });
    }
