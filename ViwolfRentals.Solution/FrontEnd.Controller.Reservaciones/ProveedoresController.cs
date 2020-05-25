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
        IProveedoresBL BlProveedor = new ProveedoresBL();

        [HttpPost]
        public JsonResult ListarProveedores (t_Proveedores proveedores)
        {
            try
            {
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
                            "No existen Proveedores que coincidan con los criterios de búsqueda.",
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
