using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Viwolf.Rentals.Controllers
{
    public class HomeHomeController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Areas/Reservacion/Views/Home/Index.cshtml");
        }
    }
}
