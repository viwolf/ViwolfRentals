using System.Web.Mvc;

namespace Viwolf.FrontEnd.Web.Areas.Viwolf
{
    public class ViwolfAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "Viwolf";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            var route = context.MapRoute(
                 name: "Viwolf_default",
                 url: "Viwolf/{controller}/{action}/{id}",
                 namespaces: new[] { "FrontEnd.Controllers.Viwolf" },
                 defaults: new { controller = "ViwolfRental", action = "Index", id = UrlParameter.Optional }
              );
        }
    }
}