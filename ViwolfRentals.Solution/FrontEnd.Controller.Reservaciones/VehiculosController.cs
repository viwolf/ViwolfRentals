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
                                 ta.RtvSticker,
                                 ta.RtvPapel,
                                 ta.MarchamoPapel,
                                 ta.StickerPlaca,
                                 ta.TituloPropiedad,
                                 ta.Multas,
                                 ta.t_CategoriasVehiculos,
                                 ta.t_Departamentos
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
