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
                                 ta.Color,
                                 ta.Direccion,
                                 ta.Transmision,
                                 ta.NumeroCilindros,
                                 ta.PesoKg,
                                 ta.Carroceria,
                                 ta.Traccion,
                                 ta.Capacidad,
                                 RtvSticker = ta.RtvSticker == true ? "Sí" : "No",
                                 RtvPapel = ta.RtvPapel == true ? "Sí" : "No",
                                 MarchamoPapel = ta.MarchamoPapel == true ? "Sí" : "No",
                                 StickerPlaca = ta.StickerPlaca == true ? "Sí" : "No",
                                 TituloPropiedad = ta.TituloPropiedad == true ? "Sí" : "No",
                                 ta.Multas,
                                 ta.t_CategoriasVehiculos,
                                 ta.t_Departamentos,
                                 GPS = ta.GPS == true ? "Sí" : "No",
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
