using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web;

namespace FrontEnd.Controllers.Viwolf
{
  
    public class ViwolfRentalController : Controller
    {
       
        public ActionResult Index()
        {
            ViewBag.Usuario = TempData["Usuario"];
            ViewBag.IdUsuario = TempData["IdUsiario"];
            return View();
        }

        
    }
}
