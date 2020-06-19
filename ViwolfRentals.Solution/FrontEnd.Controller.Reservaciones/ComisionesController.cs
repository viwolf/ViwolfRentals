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
    public class ComisionesController : Controller
    {
        IPagosComisionesBL BlComision = new PagosComisionesBL();
        private static string rolUsuario;

        public ActionResult Index(string usuario, string idUsuario, string RolUsuario)
        {
            ViewBag.Usuario = usuario;
            ViewBag.IdUsuario = idUsuario;
            rolUsuario = RolUsuario;
            return View();
        }

        [HttpPost]
        public JsonResult ListarPagosComision(ViwolfRental.Common.Model.t_PagosComisiones pagosComisiones)
        {
            try
            {
                var result = BlComision.ListarComisiones(pagosComisiones);

                var jsonObjet = (from ta in result
                                 select new
                                 {
                                     ta.IDPagoComision,
                                     ta.IDContrato,
                                     ta.t_Contratos.NumeroContrato,
                                     ta.t_Contratos.t_Reservaciones.NombreCliente,
                                     ta.PrecioTotal,
                                     PorcentajeComision = rolUsuario == "Administrador" ? "<input id= 'txt_" + ta.IDPagoComision + "' name= 'txt_" + ta.IDPagoComision + "' value= '" + ta.PorcentajeComision + "'>" : "<input id= 'txt_" + ta.IDPagoComision + "' disabled name= 'txt_" + ta.IDPagoComision + "' value= '" + ta.PorcentajeComision + "'>",
                                     ta.TotalPagar,
                                     ta.ComisionPaga
                                 }).AsEnumerable();
                return Json(new
                {
                    Data = jsonObjet,
                    MessageType = "Success",
                    InfoMessage = jsonObjet.Count() > 0 ?
                            "Proceso efectuado satisfactoriamente." :
                            "No existen comisiones por pagar que coincidan con los criterios de búsqueda.",
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
        public JsonResult GuardarPagosComision(IEnumerable<ViwolfRental.Common.Model.t_PagosComisiones> EnumPagosComisiones, ViwolfRental.Common.Model.t_PagosComisiones pagosComisiones)
        {
            try
            {
                var result = BlComision.PagarComisiones(EnumPagosComisiones,pagosComisiones);
                return Json(new
                {
                    Data = result,
                    MessageType = "Success",
                    InfoMessage = result != null ?
                            "Proceso efectuado satisfactoriamente." :
                            "No existen comisiones por pagar que coincidan con los criterios de búsqueda.",
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