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
        ILoginBL BlLogin = new LoginBL();

        public ActionResult Index()
        {
            Session["User"] = null;
            return View();
        }

        [HttpPost]
        public JsonResult AutenticarUsuario(t_Usuarios user)
        {
            try
            {
                var result = BlLogin.ListarUsuarioLogin(user);

                if (result.Count() > 0)
                {
                    if (TempData.Count <= 0)
                    {
                        Session["User"] = result.FirstOrDefault();

                        TempData.Add("Usuario", result.First().CodigoUsuario);
                        TempData.Add("IdUsuario", result.First().IdUsuario);
                        TempData.Add("RolUsuario", result.First().t_Roles.NombreRol);
                        TempData.Add("Departamento", result.FirstOrDefault().t_Departamentos.IDDepartamento);
                    }
                }

                var jsonObjet = (from ta in result
                                 select new
                                 {
                                     ta.IdUsuario,
                                     ta.CodigoUsuario,
                                     ta.t_Roles.IdRol,
                                     ta.t_Roles.NombreRol
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
            catch(Exception e)
            {
                return Json(new
                {
                    Data = "",
                    MessageType = "Error",
                    InfoMessage = string.Empty,
                    ErrorMessage = e.Message
                }, JsonRequestBehavior.AllowGet); ;
            }
        }
    }
}
