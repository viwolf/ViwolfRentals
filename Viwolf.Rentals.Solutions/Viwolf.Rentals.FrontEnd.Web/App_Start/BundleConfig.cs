using System.Web;
using System.Web.Optimization;

namespace Viwolf.Rentals.FrontEnd.Web
{
    public class BundleConfig
    {
        // Para obtener más información sobre las uniones, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Utilice la versión de desarrollo de Modernizr para desarrollar y obtener información. De este modo, estará
            // para la producción, use la herramienta de compilación disponible en https://modernizr.com para seleccionar solo las pruebas que necesite.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            //bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
            //          "~/Scripts/bootstrap.js"));

            //bundles.Add(new StyleBundle("~/Content/css").Include(
            //          "~/Content/bootstrap.css",
            //          "~/Content/site.css"));



           bundles.Add(new ScriptBundle("~/bundles/css").Include(
                     "~/Areas/Reservacion/Content/Bootstrap/assets/css/lib/weather-icons.css",
                     "~/Areas/Reservacion/Content/~/Areas/Reservacion/Content/Bootstrap/assets/css/lib/owl.carousel.min.css",
                     "~/Areas/Reservacion/Content/~/Areas/Reservacion/Content/Bootstrap/assets/css/lib/owl.theme.default.min.css",
                     "~/Areas/Reservacion/Content/~/Areas/Reservacion/Content/Bootstrap/assets/css/lib/font-awesome.min.css",
                     "~/Areas/Reservacion/Content/~/Areas/Reservacion/Content/Bootstrap/assets/css/lib/themify-icons.css",
                     "~/Areas/Reservacion/Content/~/Areas/Reservacion/Content/Bootstrap/assets/css/lib/menubar/sidebar.css",
                     "~/Areas/Reservacion/Content/~/Areas/Reservacion/Content/Bootstrap/assets/css/lib/bootstrap.min.css",
                     "~/Areas/Reservacion/Content/~/Areas/Reservacion/Content/Bootstrap/assets/css/lib/helper.css",
                     "~/Areas/Reservacion/Content/~/Areas/Reservacion/Content/Bootstrap/assets/css/style.css"));



          
                                                bundles.Add(new StyleBundle("~/bundles/js").Include(
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/lib/jquery.min.js",
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/lib/jquery.nanoscroller.min.js",
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/lib/menubar/sidebar.js",
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/lib/preloader/pace.min.js",
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/lib/bootstrap.min.js",
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/lib/circle-progress/circle-progress.min.js",
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/lib/circle-progress/circle-progress-init.js",
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/lib/morris-chart/raphael-min.js",
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/lib/morris-chart/morris.js",
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/lib/morris-chart/morris-init.js",
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/lib/flot-chart/jquery.flot.js",
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/lib/flot-chart/jquery.flot.resize.js",
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/lib/flot-chart/flot-chart-init.js",
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/lib/vector-map/jquery.vmap.js",
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/lib/vector-map/jquery.vmap.min.js",
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/lib/vector-map/jquery.vmap.sampledata.js",
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/lib/vector-map/country/jquery.vmap.world.js",
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/lib/vector-map/country/jquery.vmap.algeria.js",
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/lib/vector-map/country/jquery.vmap.argentina.js",
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/lib/vector-map/country/jquery.vmap.brazil.js",
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/lib/vector-map/country/jquery.vmap.france.js",
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/lib/vector-map/country/jquery.vmap.germany.js",
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/lib/vector-map/country/jquery.vmap.greece.js",
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/lib/vector-map/country/jquery.vmap.iran.js",
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/lib/vector-map/country/jquery.vmap.iraq.js",
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/lib/vector-map/country/jquery.vmap.russia.js",
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/lib/vector-map/country/jquery.vmap.tunisia.js",
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/lib/vector-map/country/jquery.vmap.europe.js",
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/lib/vector-map/country/jquery.vmap.usa.js",
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/lib/vector-map/vector.init.js",
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/lib/weather/jquery.simpleWeather.min.js",
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/lib/weather/weather-init.js",
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/lib/owl-carousel/owl.carousel.min.js",
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/lib/owl-carousel/owl.carousel-init.js",
                      "~/Areas/Reservacion/Content/Bootstrap/assets/js/scripts.js"));
        }
    }
}
