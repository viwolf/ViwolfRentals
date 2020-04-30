using System.Web.Mvc;

namespace ViwolfRentals.FrontEnd.Web.Areas.Reservaciones
{
    public class ReservacionesAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "Reservaciones";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            var route = context.MapRoute(
                 name: "Reservaciones_default",
                 url: "Reservaciones/{controller}/{action}/{id}",
                 namespaces: new[] { "FrontEnd.Controllers.Reservaciones" },
                 defaults: new { action = "Index", id = UrlParameter.Optional }
             );
        }
    }
}