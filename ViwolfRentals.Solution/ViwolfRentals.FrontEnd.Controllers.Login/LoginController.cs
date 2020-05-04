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

        [HttpPost]
        public JsonResult AutenticarUsuario(ViwolfRental.Common.Model.Usuarios usuario)
        {

            return DoAutenticarUsuario(usuario);
        }


        private JsonResult DoAutenticarUsuario(ViwolfRental.Common.Model.Usuarios usuario)
        {

            return Json("chamara", JsonRequestBehavior.AllowGet);
            // View("~/Areas/Reservaciones/Views/Index.cshtml");
        }
    }
}

