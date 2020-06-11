
using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ViwolfRentals.FrontEnd.Configuration;

namespace Gmg.Sapv.FrontEnd.Web.Report
{
    public partial class ViewerPreview : System.Web.UI.Page
    {

        private static string ObtenerUrlReportingService()
        {
            string url = ReportingServiceSection.CurrentConfiguration.Reportings.OfType<ReportingServiceElement>().Where(m => m.Name == "CRI").Select(m => m.RSUrl.ToString()).FirstOrDefault();
            return url;
        }

        private static string ObtenerPathReportingService()
        {
            string path = ReportingServiceSection.CurrentConfiguration.Reportings.OfType<ReportingServiceElement>().Where(m => m.Name == "CRI").Select(m => m.RSPath).FirstOrDefault();
            return path;
        }

        private static  string ObtenerUsuarioReportingService()
        {
            string path = ReportingServiceSection.CurrentConfiguration.Reportings.OfType<ReportingServiceElement>().Where(m => m.Name == "CRI").Select(m => m.RSUsuario).FirstOrDefault();
            return path;
        }

        private static string ObtenerPasswordReportingService()
        {
            string path = ReportingServiceSection.CurrentConfiguration.Reportings.OfType<ReportingServiceElement>().Where(m => m.Name == "CRI").Select(m => m.RSPassword).FirstOrDefault();
            return path;
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
        private static string ObtenerPathViewerReportingService()
        {
            string path = ReportingServiceSection.CurrentConfiguration.Reportings.OfType<ReportingServiceElement>().Where(m => m.Name == "CRI").Select(m => m.PathViewer).FirstOrDefault();
            return path;
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
        private static string ObtenerPathViewerPdfReportingService()
        {
            string path = ReportingServiceSection.CurrentConfiguration.Reportings.OfType<ReportingServiceElement>().Where(m => m.Name == "CRI").Select(m => m.PathViewerPdf).FirstOrDefault();
            return path;
        }

        private static string ObtenerDominioReportingService()
        {
            string path = ReportingServiceSection.CurrentConfiguration.Reportings.OfType<ReportingServiceElement>().Where(m => m.Name == "CRI").Select(m => m.RSDominio).FirstOrDefault();
            return path;
        }


        /// <summary>
        /// Nombre:             Page_Load
        /// Descripcion:        Evento de la pagina.
        /// Fecha de creación:  10-08-2015
        /// Autor:              Joshua Garcia
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
                MostrarReporte();
        }

        /// <summary>
        /// Nombre:             MostrarReporte
        /// Descripcion:        Metodo encargado de configurar la llamada a un reporte
        /// Fecha de creación:  10-08-2015
        /// Autor:              Joshua Garcia
        /// </summary>
        private void MostrarReporte()
        {
            //Se obtienen los parametros
            var nombreReporte = Request.QueryString["rpt"];
            var parametros = Request.QueryString["param"];

            //Modo de Procesamiento                
            rptViewerPreview.ProcessingMode = ProcessingMode.Remote;

            //Url del Servidor de Reporteria  
            rptViewerPreview.ServerReport.ReportServerUrl
                = new Uri(ObtenerUrlReportingService());

            //Path del Reporte a consultar                  
            rptViewerPreview.ServerReport.ReportPath = string.Format("{0}{1}",
                ObtenerPathReportingService(),
                nombreReporte);

            //Credenciales de Red   
            IReportServerCredentials credencial =
                new CustomReportCredentials(
                    ObtenerUsuarioReportingService(),
                    ObtenerPasswordReportingService(),
                    ObtenerDominioReportingService());
            rptViewerPreview.ServerReport.ReportServerCredentials = credencial;

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

                rptViewerPreview.ServerReport.SetParameters(parametrosFinal);
            }

            rptViewerPreview.ShowExportControls = false;
            rptViewerPreview.ShowPrintButton = false;

            //Configuracion General
            rptViewerPreview.ShowParameterPrompts = false;
            rptViewerPreview.ShowZoomControl = false;
            rptViewerPreview.ServerReport.Refresh();
        }
    }

    public class CustomReportCredentialsPdf : Microsoft.Reporting.WebForms.IReportServerCredentials
    {

        // local variable for network credential.
        private string _UserName;
        private string _PassWord;
        private string _DomainName;
        public CustomReportCredentialsPdf(string userName, string password, string domainName)
        {
            _UserName = userName;
            _PassWord = password;
            _DomainName = domainName;
        }
        public System.Security.Principal.WindowsIdentity ImpersonationUser
        {
            get
            {
                return null;  // not use ImpersonationUser
            }
        }
        public System.Net.ICredentials NetworkCredentials
        {
            get
            {

                // use NetworkCredentials
                return new System.Net.NetworkCredential(_UserName, _PassWord, _DomainName);
            }
        }
        public bool GetFormsCredentials(out System.Net.Cookie authCookie, out string user, out string password, out string authority)
        {

            // not use FormsCredentials unless you have implements a custom autentication.
            authCookie = null;
            user = password = authority = null;
            return false;
        }

    }
}