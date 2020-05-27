using FrontEnd.Controllers.Seguridad;
using FrontEnd.Controllers.Viwolf;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ViwolfRental.Common.Model;

namespace ViwolfRentals.FrontEnd.Web.Filters
{
    public class VerificaSesion : ActionFilterAttribute
    {
        private t_Usuarios usuario;
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            try
            {
                base.OnActionExecuting(filterContext);

                usuario = (t_Usuarios)HttpContext.Current.Session["User"];

                if (usuario == null)
                {
                    if (filterContext.Controller is LoginController == false)
                    {
                        filterContext.HttpContext.Response.Redirect("~/Seguridad");
                    }
                }
            }
            catch(Exception ex)
            {
                filterContext.Result = new RedirectResult("~/Seguridad");
            }
            
        }


    }
}