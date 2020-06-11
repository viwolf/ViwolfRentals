using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Viwolf.BusinessLogic;
using Viwolf.BusinessLogic.Interface;

namespace FrontEnd.Controllers.Viwolf
{
    public class ContratosController :  Controller
    {
        IContratosBL BlContrato = new ContratosBL();

        public ActionResult Index(string usuario, string idUsuario)
        {
            ViewBag.Usuario = usuario;
            ViewBag.IdUsuario = idUsuario;
            return View();
        }




        [HttpPost]
        public JsonResult GuardarContrato(ViwolfRental.Common.Model.t_Contratos contrato)
        {
            try
            {
                var result = BlContrato.GuardarContrato(contrato);
                return Json(new
                {
                    Data = result,
                    MessageType = "Success",
                    InfoMessage = result != null ?
                            "Proceso efectuado satisfactoriamente." :
                            "No existen contratos que coincidan con los criterios de búsqueda.",
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
