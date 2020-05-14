using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Viwolf.FrontEnd.Web.Startup))]
namespace Viwolf.FrontEnd.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
