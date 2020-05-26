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
        }
    }
}
