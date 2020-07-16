using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Viwolf.BusinessLogic;
using Viwolf.BusinessLogic.Interface;

namespace FrontEnd.Controllers.Viwolf
{
    public class DashboardController : Controller
    {
        IDashboardBL BlDashboard = new DashboardBL();

        public ActionResult Index(string usuario, string idUsuario)
        {
            ViewBag.Usuario = usuario;
            ViewBag.IdUsuario = idUsuario;
            return View();
        }

        [HttpPost]
        public JsonResult ListarReservacion(ViwolfRental.Common.Model.t_Reservaciones reservacion)
        {
            try
            {


                var result = BlDashboard.ListarReservaciones(reservacion);

                var jsonObjet = (from ta in result
                                 select new
                                 {
                                     IDVehiculo = ta.t_Vehiculos.IDVehiculo,
                                     ta.NombreCliente,
                                     ta.LugarEntrega,
                                     FechaInicio = string.Format("{0:d/M/yyyy}", ta.FechaInicio),
                                     ta.HoraInicio,
                                     objVehiculo = ta.t_Vehiculos

                                 }).AsEnumerable();
                return Json(new
                {
                    Data = jsonObjet,
                    MessageType = "Success",
                    InfoMessage = jsonObjet.Count() > 0 ?
                            "Proceso efectuado satisfactoriamente." :
                            "No existen reservaciones que coincidan con los criterios de búsqueda.",
                    ErrorMessage = string.Empty
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    Data = "",
                    MessageType = "Error",
                    InfoMessage = string.Empty,
                    ErrorMessage = ex.Message
                }, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public JsonResult ListarEntregas(ViwolfRental.Common.Model.t_Reservaciones reservacion)
        {
            try
            {


                var result = BlDashboard.ListarReservaciones(reservacion);

                var jsonObjet = (from ta in result
                                 select new
                                 {
                                     IDVehiculo = ta.t_Vehiculos.IDVehiculo,
                                     ta.NombreCliente,
                                     ta.LugarEntrega,
                                     FechaEntrega = string.Format("{0:d/M/yyyy}", ta.FechaEntrega),
                                     ta.HoraEntrega,
                                     objVehiculo = ta.t_Vehiculos
                                 }).AsEnumerable();
                return Json(new
                {
                    Data = jsonObjet,
                    MessageType = "Success",
                    InfoMessage = jsonObjet.Count() > 0 ?
                            "Proceso efectuado satisfactoriamente." :
                            "No existen reservaciones que coincidan con los criterios de búsqueda.",
                    ErrorMessage = string.Empty
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    Data = "",
                    MessageType = "Error",
                    InfoMessage = string.Empty,
                    ErrorMessage = ex.Message
                }, JsonRequestBehavior.AllowGet);
            }

        }
    }
}
