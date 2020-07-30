using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Viwolf.BusinessLogic;
using Viwolf.BusinessLogic.Interface;
using ViwolfRental.Common.Filters;

namespace FrontEnd.Controllers.Viwolf
{
    public class FacturacionController:Controller
    {
        IFacturacionBL BlFacturacion = new FacturacionBL();
        IGastosBL BlGastos = new GastosBL();

        [AuthorizeUser(IdPantalla: 10)]
        public ActionResult Index(string usuario, string idUsuario)
        {
            ViewBag.Usuario = usuario;
            ViewBag.IdUsuario = idUsuario;
           
            return View();
        }

        public ActionResult Gastos(string usuario, string idUsuario)
        {
            ViewBag.Usuario = usuario;
            ViewBag.IdUsuario = idUsuario;

            return View();
        }

        [AuthorizeUser(IdPantalla: 15)]
        public ActionResult ReporteFacturas(string usuario, string idUsuario)
        {
            ViewBag.Usuario = usuario;
            ViewBag.IdUsuario = idUsuario;
            return View();
        }

        [HttpPost]
        public JsonResult CrearFactura(ViwolfRental.Common.Model.t_Facturas Factura)
        {
            try
            {

                var result = BlFacturacion.GuardarFactura(Factura);
                return Json(new
                {
                    Data = result,
                    MessageType = "Success",
                    InfoMessage = result != null ?
                            "Proceso efectuado satisfactoriamente." :
                            "No existen facturas que coincidan con los criterios de búsqueda.",
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
        public ActionResult VerReporteFacturas(DateTime FechaInicial, DateTime FechaFinal)
        {
            return RedirectToAction("VerReporteFacturas", "Reportes", new { @FechaInicial = FechaInicial, @FechaFinal = FechaFinal});
        }


        [HttpPost]
        public JsonResult CrearGasto(ViwolfRental.Common.Model.t_Gastos gastos)
        {
            try
            {

                var result = BlGastos.GuardarGastos(gastos);
                return Json(new
                {
                    Data = result,
                    MessageType = "Success",
                    InfoMessage = result != null ?
                            "Proceso efectuado satisfactoriamente." :
                            "No existen facturas que coincidan con los criterios de búsqueda.",
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
