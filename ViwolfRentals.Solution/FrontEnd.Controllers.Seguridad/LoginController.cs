using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace FrontEnd.Controllers.Seguridad
{
    public class LoginController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult AutenticarUsuario()
        {
            return Json(new { success = true, message = "Order updated successfully" }, JsonRequestBehavior.AllowGet);
        }
    }
}
