using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace ViwolfRentals.FrontEnd.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            var route = routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                namespaces: new[] { "Viwolf.Rentals.Controllers" },
                 defaults: new { controller = "Seguridad", action = "Index", id = UrlParameter.Optional }
                 //defaults: new { controller = "Reservacion", action = "Index", id = UrlParameter.Optional }
            );


          //  route.DataTokens["UseNamespaceFallback"] = false;

           
        }

       
    }
}
