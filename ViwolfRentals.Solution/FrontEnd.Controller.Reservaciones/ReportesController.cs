using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using ViwolfRental.Common.Model;
using ViwolfRentals.FrontEnd.Configuration;

namespace FrontEnd.Controllers.Viwolf
{
    public class ReportesController:Controller
    {
        public FileContentResult ExportarReporte(string Tipo)
        {
            //Se obtienen los parametros
            var nombreReporte = Session["rpt"].ToString();
            var parametros = Session["param"].ToString();
            byte[] bytes = null;
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

                ////Credenciales de Red   
                //IReportServerCredentials credencial =
                //    new CustomReportCredentials(
                //                                ObtenerUsuarioReportingService(),
                //                                ObtenerPasswordReportingService(),
                //                                ObtenerDominioReportingService());
                //rptViewer.ServerReport.ReportServerCredentials = credencial;

                //Parametros
                if (parametros != null)
                {
                    var listaParametros = parametros.Split(';');

                    ReportParameter[] parametrosFinal = new ReportParameter[listaParametros.Count()];

                    for (int i = 0; i < listaParametros.Count(); i++)
                    {
                        ReportParameter parametro = new ReportParameter(
                            listaParametros[i].Split('-')[0],
                            listaParametros[i].Split('-')[1]);

                        parametrosFinal[i] = parametro;
                    }

                    rptViewer.ServerReport.SetParameters(parametrosFinal);
                }

                if (nombreReporte == "rptHojaCaja" || nombreReporte == "rptVentaCredito")
                {
                    rptViewer.ShowExportControls = false;
                }

                string mimeType, encoding, extension, deviceInfo;
                string[] streamids; Microsoft.Reporting.WebForms.Warning[] warnings;
                deviceInfo = "<DeviceInfo>" + "<SimplePageHeaders>True</SimplePageHeaders>" + "</DeviceInfo>";
                bytes = rptViewer.ServerReport.Render(Tipo, deviceInfo, out mimeType, out encoding, out extension, out streamids, out warnings);
                Response.Clear();

                if (Tipo == "PDF")
                {
                    Response.ContentType = "application/pdf";
                    Response.AddHeader("Content-disposition", "attachment; filename=" + nombreReporte + ".pdf");
                }
                else if (Tipo == "Excel")
                {
                    Response.ContentType = "application/excel";
                    Response.AddHeader("Content-disposition", "attachment; filename=" + nombreReporte + ".xls");
                }
                else if (Tipo == "Word")
                {
                    Response.AddHeader("content-disposition", "attachment; filename=" + nombreReporte + ".doc");
                    Response.ContentType = "application/vnd.ms-word ";
                }

            }

            return File(bytes, Response.ContentType);
        }

        public JsonResult VerGeneracionContrato(t_Contratos model)
        {
            return DoVerGeneracionContrato(model);
        }

        public JsonResult VerTicketResponsabilidad(t_Contratos entity)
        {
            return DoTicketResponsabilidad(entity);
        }

        private JsonResult DoVerGeneracionContrato(t_Contratos model)
        {
            string reportName = "rptContrato";
            string sParametroValor = "IDContrato-" + model.IDContrato;
            //string paramVal = string.Format("{0}-{1}", reportName, IdDeposito);
            var sb = GetStringBuilderReport(reportName,sParametroValor);

            return this.Json(sb.ToString(), JsonRequestBehavior.AllowGet);
          
        }

        private JsonResult DoTicketResponsabilidad(t_Contratos model)
        {

            string reportName = "rptContratoResponsabilidad";
            string sParametroValor = "IDContrato-" + model.IDContrato;

            var sb = GetStringBuilderReport(reportName,sParametroValor);

            return this.Json(sb.ToString(), JsonRequestBehavior.AllowGet);

        }

        public JsonResult VerPagoComisiones(string IDPagoComision)
        {
            return DoVerPagoComisiones(IDPagoComision);
        }

        public JsonResult VerPagoCxC(string IDPagoComision)
        {
            return DoVerPagoCxC(IDPagoComision);
        }

        public JsonResult TicketFactura(string IDFactura)
        {
            return DoTicketFactura(IDFactura);
        }

        private JsonResult DoTicketFactura(string IDFactura)
        {
            string reportName = "rptTicketContado";
            string sParametroValor = "IDFactura-" + IDFactura;
            //string paramVal = string.Format("{0}-{1}", reportName, IdDeposito);
            var sb = GetStringBuilderReport(reportName, sParametroValor);

            return this.Json(sb.ToString(), JsonRequestBehavior.AllowGet);

        }

        private JsonResult DoVerPagoComisiones(string IDPagoComision)
        {
            string reportName = "rptPagoComisiones";
            string sParametroValor = "IDPagoComision-" + IDPagoComision;
            //string paramVal = string.Format("{0}-{1}", reportName, IdDeposito);
            var sb = GetStringBuilderReport(reportName, sParametroValor);

            return this.Json(sb.ToString(), JsonRequestBehavior.AllowGet);

        }

        private JsonResult DoVerPagoCxC(string IDCuentasxCobrar)
        {
            string reportName = "rptCuentasxCobrar";
            string sParametroValor = "IDCuentaxCobrar-" + IDCuentasxCobrar;
            //string paramVal = string.Format("{0}-{1}", reportName, IdDeposito);
            var sb = GetStringBuilderReport(reportName, sParametroValor);

            return this.Json(sb.ToString(), JsonRequestBehavior.AllowGet);

        }


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

        private static StringBuilder GetStringBuilderReport(string name, string parametrosValor)
        {

            // string sComandosRS = "&rs:Command=Render&rs:Format=HTML4.0&rc:Parameters=false";
            // var parametros = string.Format("?rpt={0}&param={1}", listParamVal.First(), param);

            string Parametros =
               "?rpt=" + name +
               "&param=" +
                  parametrosValor;


            //StringBuilder para crear un iFrame
            var sb = new StringBuilder();
            sb.Append("<iframe id='ifReporte' width='100%' style='height: 480px' frameborder='0'");
            //sb.AppendFormat("src='{0}{1}'",
            //    ObtenerPathViewerReportingService(),
            //    parametros);
            //sb.AppendFormat("src='{0}/{1}?/{2}{3}{4}{5}'", ObtenerPathViewerReportingService(), ObtenerPathViewerPdfReportingService(), ObtenerCarpetaViewerReportingService(), name, parametrosValor, sComandosRS);
            sb.AppendFormat("src='{0}{1}'", ObtenerPathViewerReportingService(), Parametros);
            sb.Append("></iframe>");
            return sb;
        }

        private static string ObtenerPathViewerReportingService()
        {
            //string url = ReportingServiceSection.CurrentConfiguration.Reportings.OfType<ReportingServiceElement>().Where(m => m.Name == "CRI").Select(m => m.RSUrl.ToString()).FirstOrDefault();
            string url = ReportingServiceSection.CurrentConfiguration.Reportings.OfType<ReportingServiceElement>().Where(m => m.Name == "CRI").Select(m => m.PathViewer.ToString()).FirstOrDefault();
            return url;
        }

        private static string ObtenerCarpetaViewerReportingService()
        {
            string url = ReportingServiceSection.CurrentConfiguration.Reportings.OfType<ReportingServiceElement>().Where(m => m.Name == "CRI").Select(m => m.RSPath.ToString()).FirstOrDefault();
            return url;
        }

        private static string ObtenerPathViewerPdfReportingService()
        {
            string path = ReportingServiceSection.CurrentConfiguration.Reportings.OfType<ReportingServiceElement>().Where(m => m.Name == "CRI").Select(m => m.PathViewerPdf).FirstOrDefault();
            return path;
        }

    }
}
