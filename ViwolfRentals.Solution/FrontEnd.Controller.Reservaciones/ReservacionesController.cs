using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Viwolf.BusinessLogic;
using Viwolf.BusinessLogic.Interface;
using ViwolfRental.Common.Model;

namespace FrontEnd.Controllers.Viwolf
{
    public class ReservacionesController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult GuardarReservacion(ViwolfRental.Common.Model.t_Reservaciones reservacion)
        {
            IReservacionesBL BlReservacion = new ReservacionesBL();

            var result = BlReservacion.GuardarReservacion(reservacion);

            return Json(new
            {
                Data = result,
                MessageType = result != null ? "Success" : "Error",
                InfoMessage = result != null ?
                        "Proceso efectuado satisfactoriamente." :
                        "No existen usuarios que coincidan con los criterios de búsqueda.",
                ErrorMessage = string.Empty
            }, JsonRequestBehavior.AllowGet);
        }
    }
}
