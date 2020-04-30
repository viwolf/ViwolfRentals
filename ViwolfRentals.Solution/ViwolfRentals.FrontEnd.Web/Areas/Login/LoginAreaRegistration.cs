using System.Web.Mvc;

namespace ViwolfRentals.FrontEnd.Web.Areas.Login
{
    public class LoginAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "Login";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            var route = context.MapRoute(
                name: "Login_default",
                url: "Login/{controller}/{action}/{id}",
                namespaces: new[] { "ViwolfRentals.FrontEnd.Controllers.Login" },
                defaults: new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}