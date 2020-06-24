using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace FrontEnd.Controllers.Viwolf
{
    public class FacturacionController:Controller
    {
        public ActionResult Index(string usuario, string idUsuario)
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
                //var result = BlComision.PagarComisiones(EnumPagosComisiones, pagosComisiones);
                //return Json(new
                //{
                //    Data = result,
                //    MessageType = "Success",
                //    InfoMessage = result != null ?
                //            "Proceso efectuado satisfactoriamente." :
                //            "No existen comisiones por pagar que coincidan con los criterios de búsqueda.",
                //    ErrorMessage = string.Empty
                //}, JsonRequestBehavior.AllowGet);
                return null;
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
