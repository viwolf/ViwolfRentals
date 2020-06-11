using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using ViwolfRentals.FrontEnd.Configuration;

namespace Viwolf.Rentals.Controllers
{
    public class HomeController: Controller
    {

        private string ObtenerUrlReportingService()
        {
            string url = ReportingServiceSection.CurrentConfiguration.Reportings.OfType<ReportingServiceElement>().Where(m => m.Name == "CRI").Select(m => m.RSUrl.ToString()).FirstOrDefault();
            return url;
        }

        private string ObtenerPathReportingService()
        {
            string path = ReportingServiceSection.CurrentConfiguration.Reportings.OfType<ReportingServiceElement>().Where(m => m.Name == "CRI").Select(m => m.RSPath).FirstOrDefault();
            return path;
        }


        public ActionResult Index()
        {

            return RedirectToAction("Index", "Login", new { area = "Seguridad" });  //View("~/Areas/Login/Views/Login.cshtml");
           
        }

        public ActionResult VerReportes()
        {
            //Se obtienen los parametros
            var nombreReporte = Request.QueryString["rpt"];
            var parametros = Request.QueryString["param"];
            byte[] bytes = null;
            string mimeType;
            var builder = new StringBuilder();
            using (ReportViewer rptViewer = new ReportViewer())
            {
                //Modo de Procesamiento                
                rptViewer.ProcessingMode = ProcessingMode.Remote;


                //Url del Servidor de Reporteria  
                rptViewer.ServerReport.ReportServerUrl
                    = new Uri(ObtenerUrlReportingService());


                //Path del Reporte a consultar                  
                rptViewer.ServerReport.ReportPath = string.Format("{0}{1}",
                    ObtenerPathReportingService(),
                    nombreReporte);

                builder.AppendLine($"Generando Reporte {rptViewer.ServerReport.ReportPath}{Environment.NewLine}");
                //Credenciales de Red   
                //IReportServerCredentials credencial =
                //    new CustomReportCredentials(
                //        ObtenerUsuarioReportingService(),
                //        ObtenerPasswordReportingService(),
                //        ObtenerDominioReportingService());
                //rptViewer.ServerReport.ReportServerCredentials = credencial;

                ReportParameter[] parametrosFinal = null;
                //Parametros
                if (parametros != null)
                {
                    var listaParametros = parametros.Split(';');

                    parametrosFinal = new ReportParameter[listaParametros.Count()];

                    for (int i = 0; i < listaParametros.Count(); i++)
                    {
                        builder.AppendLine($"Parametro {listaParametros[i].Split('-')[0]} = {listaParametros[i].Split('-')[1]}.");
                        ReportParameter parametro = new ReportParameter(
                            listaParametros[i].Split('-')[0],
                            listaParametros[i].Split('-')[1].Trim());

                        parametrosFinal[i] = parametro;
                    }
                }
                else
                    builder.AppendLine($"No hay parametros{Environment.NewLine}");

                //logger.Notify(builder.ToString(), 0);

                if (parametrosFinal != null)
                    rptViewer.ServerReport.SetParameters(parametrosFinal);

                if (nombreReporte == "rptHojaCaja" || nombreReporte == "rptVentaCredito")
                {
                    rptViewer.ShowExportControls = false;
                }

                //Configuracion General
                rptViewer.ShowParameterPrompts = false;
                rptViewer.ShowZoomControl = false;
                rptViewer.ServerReport.Refresh();

                string encoding, extension, deviceInfo;
                string[] streamids; Microsoft.Reporting.WebForms.Warning[] warnings;
                string format = "PDF";
                deviceInfo = "<DeviceInfo>" + "<SimplePageHeaders>True</SimplePageHeaders>" + "</DeviceInfo>";
                bytes = rptViewer.ServerReport.Render(format, deviceInfo, out mimeType, out encoding, out extension, out streamids, out warnings);
                Response.Clear();

                if (format == "PDF")
                {
                    Response.ContentType = "application/pdf";
                    Response.AddHeader("Content-disposition", "filename=output.pdf");
                }
                else if (format == "Excel")
                {
                    Response.ContentType = "application/excel";
                    Response.AddHeader("Content-disposition", "filename=output.xls");
                }

            }

            //Response.OutputStream.Write(bytes, 0, bytes.Length);
            //Response.OutputStream.Flush();
            //Response.OutputStream.Close();
            //Response.Flush();
            //Response.Close();
            Session["rpt"] = Request.QueryString["rpt"]; ;
            Session["param"] = Request.QueryString["param"];
            return File(bytes, mimeType);

        }
    }
}
