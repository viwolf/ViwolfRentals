using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web;

namespace ViwolfRentals.FrontEnd.Controllers.Seguridad
{
    public class SeguridadController: Controller
    {
        public ActionResult Index()
        {
            //return RedirectToAction("Index", "Reservacion", new { @area = "Reservacion" });
            return View(); // "~/Areas/Seguridad/Views/Login/Index.cshtml");
        }


        //[Route("AutenticarUsuario")]
        [HttpPost]
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

