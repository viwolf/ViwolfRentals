using Seguridad.BusinessLogic;
using Seguridad.BusinessLogic.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using ViwolfRental.Common.Model;

namespace ViwolfRental.Common.Filters
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false)]
    public class AuthorizeUser : AuthorizeAttribute
    {
        private t_Usuarios usuario;
        private ViwolfRentalsDBEntities db = new ViwolfRentalsDBEntities();
        private int idPantalla;

        public AuthorizeUser(int IdPantalla)
        {
            this.idPantalla = IdPantalla;
        }

        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            string nombreOperacion = "";
           // string nombreModulo = "";

            try
            {
                usuario = (t_Usuarios)HttpContext.Current.Session["User"];
                ILoginBL blLogin = new LoginBL();
                t_RolesSistemaModuloPantalla rolesSistemaModuloPantalla = new t_RolesSistemaModuloPantalla();
                rolesSistemaModuloPantalla.IDRol = usuario.t_Roles.IdRol;
                rolesSistemaModuloPantalla.IDPantalla = idPantalla;
                var result = blLogin.ListarPantallaRoles(rolesSistemaModuloPantalla);

                var jsonObjet = (from ta in result
                                 select new
                                 {
                                     ta.IDRolPantalla,
                                     ta.t_Roles.IdRol,
                                     ta.t_Roles.NombreRol,
                                     ta.t_Pantallas.IDPantalla,
                                     ta.t_Pantallas.NombrePantalla,
                                     ta.t_Pantallas.t_Sistemas.IdSistema,
                                     ta.t_Pantallas.t_Sistemas.NombreSistema,
                                     ta.t_Pantallas.t_Modulos.IDModulo,
                                     ta.t_Pantallas.t_Modulos.NombreModulo,
                                 }).AsEnumerable();




                if (jsonObjet.Count() < 1)
                {
                    //var oOperacion = db.t_Pantallas.Find(idOperacion);
                    //int? idModulo = oOperacion.IDModulo;
                    //nombreOperacion = getNombreOperacion(idOperacion);
                    //nombreModulo = getNombreModulo(idModulo);
                    //nombreModulo = nombreModulo.Replace(' ', '+');
                    filterContext.Result = new RedirectResult("~/Error/UnauthorizedOperation");

                }
            }
            catch (Exception ex)
            {
                filterContext.Result = new RedirectResult("~/Error/UnauthorizedOperation");
            }
        }

        //public string getNombreOperacion(int IdOperacion)
        //{
        //    var ope = from op in db.t_Pantallas
        //              where op.IDPantalla == IdOperacion
        //              select op.NombrePantalla;

        //    String nombrePantalla;

        //    try
        //    {
        //        nombrePantalla = ope.First();
        //    }
        //    catch (Exception)
        //    {
        //        nombrePantalla = "";
        //    }
        //    return nombrePantalla;
        //}

        //public string getNombreModulo(int? IdModulo)
        //{
        //    var modulo = from m in db.t_Modulos
        //                 where m.IDModulo == IdModulo
        //                 select m.NombreModulo;

        //    String nombreModulo;

        //    try
        //    {
        //        nombreModulo = modulo.First();
        //    }
        //    catch (Exception)
        //    {
        //        nombreModulo = "";
        //    }
        //    return nombreModulo;
        //}

    }
}
