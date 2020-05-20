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
        IReservacionesBL BlReservacion = new ReservacionesBL();

        public ActionResult Index(string usuario, string idUsuario)
        {
            ViewBag.Usuario = usuario;
            ViewBag.IdUsuario = idUsuario;
            return View();
        }
        public ActionResult Mantenimiento(string usuario, string idUsuario)
        {
            ViewBag.Usuario = usuario;
            ViewBag.IdUsuario = idUsuario;
            return View();
        }

        [HttpPost]
        public JsonResult GuardarReservacion(ViwolfRental.Common.Model.t_Reservaciones reservacion)
        {
           

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

        [HttpPost]
        public JsonResult ListarReservacion(ViwolfRental.Common.Model.t_Reservaciones reservacion)
        {


            var result = BlReservacion.ListarReservaciones(reservacion);

            var jsonObjet = (from ta in result
                             select new
                             {
                                 ta.IdReservacion,
                                 ta.NombreCliente,
                                 ta.LugarEntrega,
                                 FechaInicio = string.Format("{0:d/M/yyyy}", ta.FechaInicio),
                                 FechaEntrega = string.Format("{0:d/M/yyyy}", ta.FechaEntrega),
                                 ta.IDVehiculo,
                                 ta.t_Vehiculos,
                                 InfoVehiculo = "<button id= '" + ta.IDVehiculo + "' name='btnV_" + ta.IDVehiculo + "'><i class='fa fa-eye'></i></button>",
                             }).AsEnumerable();
            return Json(new
            {
                Data = jsonObjet,
                MessageType = "Success",
                InfoMessage = jsonObjet.Count() > 0 ?
                        "Proceso efectuado satisfactoriamente." :
                        "No existen usuarios que coincidan con los criterios de búsqueda.",
                ErrorMessage = string.Empty
            }, JsonRequestBehavior.AllowGet);
        }
    }
}
