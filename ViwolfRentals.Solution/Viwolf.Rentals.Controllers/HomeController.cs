using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Viwolf.Rentals.Controllers
{
    public class HomeController: Controller
    {
        public ActionResult Index()
        {
            return RedirectToAction("Index", "ViwolfRental", new { area = "Viwolf" });  //View("~/Areas/Login/Views/Login.cshtml");
        }
    }
}
