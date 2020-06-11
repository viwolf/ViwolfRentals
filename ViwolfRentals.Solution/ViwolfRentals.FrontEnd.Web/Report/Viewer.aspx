<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Viewer.aspx.cs" Inherits="Gmg.Sapv.FrontEnd.Web.Report.Viewer" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>


<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
       <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" language="javascript" type="text/javascript"></script>
<script type="text/javascript">
  
    function GetBrowser() {
        //JQuery Script;
        if ($.browser.msie)
        {
            //$("#BtnImprimir").hide();
        }
         
     
    }

    $(document).ready(function () {
        GetBrowser();
        //$("#BtnImprimir").click(imprimirDiv);    //Asociando la función "imprimirDiv" al clic del botón para Imprimir Reporte

        //$("#rptViewer_ctl05").children().append($("#BtnImprimir")); 

    });

    function imprimirDiv() {
        var divImprimir = $("div[id$='ReportDiv']").parent();        //Obteniendo el padre del DIV que contiene al reporte
        var estilos = $("head style[id$='ReportControl_styles']");    //Obteniendo los estilos del reporte
        newWin = window.open("");        //Abriendo una nueva ventana

        //Construyendo el HTML de la nueva ventana, con los estilos del reporte y el div que contiene el reporte
        newWin.document.write('<html xmlns="http://www.w3.org/1999/xhtml"><head><style type="text/css">' + estilos.html() + '</style></head><body>' + divImprimir.html() + '</body>');
        newWin.document.close();        //Finalizando la escritura
        newWin.print();        //Imprimir contenido de nueva ventana
        newWin.close();        //Cerrar nueva ventana
    }

   
  </script>

</head>
<body>
  

    <form id="form1" runat="server">
        <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
        <div>
             
            <%--<asp:ImageButton ImageUrl="/Gmg.Sapv.FrontEnd.Web/Reserved.ReportViewerWebControl.axd?OpType=Resource&Version=11.0.3442.2&Name=Microsoft.Reporting.WebForms.Icons.Print.gif" ID="BtnImprimir" runat="server"  Text="Imprimir" CausesValidation="False" OnClientClick="return false;" UseSubmitBehavior="False" />--%>
            <br />
            <rsweb:ReportViewer ID="rptViewer" runat="server"  Width="100%">
            </rsweb:ReportViewer>

        </div>
    </form>
</body>
</html>
