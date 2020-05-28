﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Viwolf.BusinessLogic;
using Viwolf.BusinessLogic.Interface;
using ViwolfRental.Common.Filters;
using ViwolfRental.Common.Model;

namespace FrontEnd.Controllers.Viwolf
{
    public class ReservacionesController : Controller
    {
        IReservacionesBL BlReservacion = new ReservacionesBL();

        [AuthorizeUser(IdOperacion:1)]
        public ActionResult Index(string usuario, string idUsuario)
        {
            ViewBag.Usuario = usuario;
            ViewBag.IdUsuario = idUsuario;
            return View();
        }
        [AuthorizeUser(IdOperacion: 2)]
        public ActionResult Mantenimiento(string usuario, string idUsuario)
        {
            ViewBag.Usuario = usuario;
            ViewBag.IdUsuario = idUsuario;
            return View();
        }

        [HttpPost]
        public JsonResult GuardarReservacion(ViwolfRental.Common.Model.t_Reservaciones reservacion)
        {
           try
            {
                var result = BlReservacion.GuardarReservacion(reservacion);
                return Json(new
                {
                    Data = result,
                    MessageType ="Success",
                    InfoMessage = result != null ?
                            "Proceso efectuado satisfactoriamente." :
                            "No existen reservaciones que coincidan con los criterios de búsqueda.",
                    ErrorMessage = string.Empty
                }, JsonRequestBehavior.AllowGet);
            }

            catch(Exception ex)
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
        public JsonResult ListarReservacion(ViwolfRental.Common.Model.t_Reservaciones reservacion)
        {
            try
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
                            "No existen reservaciones que coincidan con los criterios de búsqueda.",
                    ErrorMessage = string.Empty
                }, JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
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
