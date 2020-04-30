using System.Web.Mvc;

namespace Viwolf.Rentals.FrontEnd.Web.Areas.Reservacion
{
    public class ReservacionAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "Reservacion";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            var route = context.MapRoute(
                  name: "Reservaciones_default",
                url: "Reservaciones/{controller}/{action}/{id}",
                namespaces: new[] { "Viwolf.Rentals.Controller.Reservaciones" },
                defaults: new { Controller = "Home", action = "Index", id = UrlParameter.Optional }
                );

            route.DataTokens["UserNamespaceFallBack"] = false;
        }
    }
}