using System.Web;
using System.Web.Optimization;

namespace ViwolfRentals.FrontEnd.Web
{
    public class BundleConfig
    {
        // Para obtener más información sobre las uniones, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {


            bundles.Add(new StyleBundle("~/Content/Plugins")
                .Include("~/Content/Plugins/datatables/jquery-3.5.1.js")
            .Include("~/Content/Plugins/datatables/jquery.dataTables.min.js")
            .Include("~/Content/Plugins/datatables/dataTables.bootstrap.min.js")
            .Include("~/Content/Plugins/datatables/dataTables.select.min.js")
            );
        }
    }
}
