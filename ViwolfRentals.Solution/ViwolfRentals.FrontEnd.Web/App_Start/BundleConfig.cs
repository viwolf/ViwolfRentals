using System.Web;
using System.Web.Optimization;

namespace ViwolfRentals.FrontEnd.Web
{
    public class BundleConfig
    {
        // Para obtener más información sobre las uniones, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.IgnoreList.Clear();
            bundles.UseCdn = true;
            bundles.Add(
                new ScriptBundle("~/bundles/Seguridad")
                    .Include("~/Areas/Seguridad/Content/Vendor/jquery/jquery-3.2.1.min.js")
                    .Include("~/Areas/Seguridad/Content/Vendor/bootstrap/js/popper.js")
                    .Include("~/Areas/Seguridad/Content/Vendor/bootstrap/js/bootstrap.min.js")
                    .Include("~/Areas/Seguridad/Content/Vendor/select2/select2.min.js")
                    .Include("~/Areas/Seguridad/Content/Vendor/tilt/tilt.jquery.min.js")
                    .Include("~/Content/Plugins/ajaxloader/ajaxloader.js")
                    .Include("~/Content/Plugins/bootstrap/js/bootstrap.min.js")
                    .Include("~/Areas/Seguridad/Content/Plugin/ModalMessage/popper.min.js")
                    .Include("~/Areas/Seguridad/Content/Plugin/ModalMessage/bootstrap.min.js")
                    .Include("~/Content/Plugins/bootstrap-dialog/js/bootstrap-dialog.js"));
            bundles.Add(
               new ScriptBundle("~/bundles/ViwolfRentals")
                    .Include("~/Areas/Viwolf/Content/dist/js/all.min.js")
                    .Include("~/Areas/Seguridad/Content/Vendor/jquery/jquery-3.2.1.min.js")
                    .Include("~/Areas/Viwolf/Content/dist/js/bootstrap.bundle.min.js")
                    .Include("~/Areas/Viwolf/Content/dist/js/scripts.js")
                    .Include("~/Areas/Viwolf/Content/dist/js/jquery.dataTables.min.js")
                    .Include("~/Areas/Viwolf/Content/dist/js/jquery/jquery-1.12.4.js")
                    .Include("~/Areas/Viwolf/Content/js/src/Reservaciones/Content/js/jquery-ui.js")
                    .Include("~/Areas/Viwolf/Content/js/src/Reservaciones/Content/vendor/select2/select2.min.js")
                    .Include("~/Areas/Viwolf/Content/js/src/Reservaciones/Content/vendor/datepicker/moment.min.js")
                    .Include("~/Areas/Viwolf/Content/js/src/Reservaciones/Content/vendor/datepicker/daterangepicker.js")
                    .Include("~/Content/Plugins/ajaxloader/ajaxloader.js")
                    .Include("~/Content/js/src/Dialog.js")
                    .Include("~/Areas/Seguridad/Content/Plugin/ModalMessage/popper.min.js")
                    .Include("~/Areas/Seguridad/Content/Plugin/ModalMessage/bootstrap.min.js")
                    .Include("~/Areas/Viwolf/Content/dist/js/jquery.timepicker.min.js")
                    );

            bundles.Add(new StyleBundle("~/bundles/Estilo/Seguridad")
              .Include("~/Areas/Seguridad/Content/images/icons/favicon.ico")
              .Include("~/Areas/Seguridad/Content/vendor/bootstrap/css/bootstrap.min.css")
              .Include("~/Areas/Seguridad/Content/fonts/font-awesome-4.7.0/css/font-awesome.min.css")
              .Include("~/Areas/Seguridad/Content/css/main.css")
              );

            bundles.Add(new StyleBundle("~/bundles/Estilo/ViwolfRentals")
              .Include("~/Areas/Viwolf/Content/dist/css/styles.css")
              );


           
        }
    }
}
