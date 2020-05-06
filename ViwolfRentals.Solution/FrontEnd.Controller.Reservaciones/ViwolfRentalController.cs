using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web;

namespace FrontEnd.Controllers.Reservaciones
{
    public class ViwolfRentalController : Controller
    {
        //[HttpPost]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult NuevaReservacion()
        {
            return View();
        }
    }
}
