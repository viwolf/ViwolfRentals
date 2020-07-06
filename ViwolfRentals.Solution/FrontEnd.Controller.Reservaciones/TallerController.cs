using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using ViwolfRental.Common.Filters;

namespace FrontEnd.Controllers.Viwolf
{
    public class TallerController:Controller
    {
        [AuthorizeUser(IdPantalla: 8)]
        public ActionResult Index(string usuario, string idUsuario)
        {
            ViewBag.Usuario = usuario;
            ViewBag.IdUsuario = idUsuario;
            return View();
        }
    }
}
