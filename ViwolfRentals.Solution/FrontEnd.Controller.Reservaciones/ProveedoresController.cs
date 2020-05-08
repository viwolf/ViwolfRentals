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
     public class ProveedoresController : Controller
    {
        [HttpPost]
        public JsonResult ListarProveedores (t_Proveedores proveedores)
        {

            IProveedoresBL BlProveedor = new ProveedoresBL();
            var result = BlProveedor.ListarProveedores(proveedores);

            var jsonObjet = (from ta in result
                             select new
                             {
                                 ta.IdProveedor,
                                 ta.NombreProveedor
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
