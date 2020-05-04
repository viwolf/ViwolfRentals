using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace ViwolfRentals.FrontEnd.Controllers.Login
{
    public class LoginController: Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        //[HttpPost]
        public ActionResult AutenticarUsuario()
        {

            return DoAutenticarUsuario();
        }


        private ActionResult DoAutenticarUsuario()
        {

           return View("~/Areas/Reservaciones/Views/Index.cshtml");
        }
    }
}

