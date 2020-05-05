using System.Web.Mvc;

namespace ViwolfRentals.FrontEnd.Web.Areas.Seguridad
{
    public class SeguridadAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "Seguridad";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            var route = context.MapRoute(
               name: "Seguridad_default",
               url: "Seguridad/{controller}/{action}/{id}",
               namespaces: new[] { "ViwolfRentals.FrontEnd.Controllers.Seguridad" },
               //defaults: new { controller = "Seguridad",  action = "Index", id = UrlParameter.Optional }
               defaults: new { controller = "Home", id = UrlParameter.Optional }
           );
        }
    }
}