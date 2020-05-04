using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web;

namespace ViwolfRentals.FrontEnd.Controllers.Login
{
    public class LoginController: Controller
    {
        public ActionResult Login()
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

            return RedirectToAction("Index", "Reservacion");
           //return View("~/Areas/Reservaciones/Views/Index.cshtml");
        }
    }
}

