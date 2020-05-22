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
    class CategoriasVehiculosController : Controller
    {
        [HttpPost]
        public JsonResult ListarCategoriasVehiculos(t_CategoriasVehiculos categoriaVehiculo)
        {

            ICategoriasVehiculosBL BlCategorias = new CategoriasVehiculosBL();
            var result = BlCategorias.ListarCategoriasVehiculos(categoriaVehiculo);

            var jsonObjet = (from ta in result
                             select new
                             {
                                 ta.IDCategoriaVehiculo,
                                 ta.NombreCategoriaVehiculo
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
