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
    public class VehiculosController : Controller
    {

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult ListarVehiculos(t_Vehiculos vehiculos)
        {

            IVehiculosBL BlVehiculo = new VehiculosBL();
            var result = BlVehiculo.ListarVehiculos(vehiculos);

            var jsonObjet = (from ta in result
                             select new
                             {
                                 ta.IDVehiculo,
                                 ta.Marca,
                                 ta.Modelo,
                                 ta.Anno,
                                 ta.FechaCompra,
                                 ta.NumeroChasis,
                                 ta.NumeroMotor,
                                 ta.RtvVencimientoAnno,
                                 ta.RtvVencimientoMes,
                                 ta.MarchamoProximo,
                                 RtvSticker = ta.RtvSticker == true ? "Sì" : "No",
                                 RtvPapel = ta.RtvPapel == true ? "Sì" : "No",
                                 MarchamoPapel = ta.MarchamoPapel == true ? "Sì" : "No",
                                 StickerPlaca = ta.StickerPlaca == true ? "Sì" : "No",
                                 TituloPropiedad = ta.TituloPropiedad == true ? "Sì" : "No",
                                 ta.Multas,
                                 ta.t_CategoriasVehiculos,
                                 ta.t_Departamentos,
                                 Ver = "<button id= '" + ta.IDVehiculo + "' name='btnV_" + ta.IDVehiculo + "'><i class='fa fa-eye'></i></button>"
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
