using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Seguridad.BusinessLogic;
using Seguridad.BusinessLogic.Interface;
using ViwolfRental.Common.Model;

namespace FrontEnd.Controllers.Seguridad
{
    public class LoginController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult AutenticarUsuario(t_Usuarios user)
        {
            
            ILoginBL BlLogin = new LoginBL();
            var result = BlLogin.ListarUsuarioLogin(user);

            TempData.Add("Usuario", result.First().CodigoUsuario);

            var jsonObjet = (from ta in result
                             select new
                             {
                                 ta.IdUsuario,
                                 ta.CodigoUsuario,
                                 ta.Password,
                                 ta.Activo
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
