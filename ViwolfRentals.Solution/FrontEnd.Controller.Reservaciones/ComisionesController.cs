using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Viwolf.BusinessLogic;
using Viwolf.BusinessLogic.Interface;
using ViwolfRental.Common.Filters;

namespace FrontEnd.Controllers.Viwolf
{
    public class ComisionesController : Controller
    {
        IPagosComisionesBL BlComision = new PagosComisionesBL();
        private static string rolUsuario;


        #region Pago de Comisiones

        [AuthorizeUser(IdPantalla: 9)]
        public ActionResult Index(string usuario, string idUsuario, string RolUsuario)
        {
            ViewBag.Usuario = usuario;
            ViewBag.IdUsuario = idUsuario;
            rolUsuario = RolUsuario;
            return View();
        }


        [HttpPost]
        public JsonResult ListarPagosComision(ViwolfRental.Common.Model.t_PagosComisiones pagosComisiones)
        {
            try
            {
                var result = BlComision.ListarComisiones(pagosComisiones);

                var jsonObjet = (from ta in result
                                 select new
                                 {
                                     ta.IDPagoComision,
                                     ta.IDContrato,
                                     ta.t_Contratos.NumeroContrato,
                                     ta.t_Contratos.t_Reservaciones.NombreCliente,
                                     ta.PrecioTotal,
                                     PorcentajeComision = rolUsuario == "Administrador" ? "<input id= 'txt_" + ta.IDPagoComision + "' name= 'txt_" + ta.IDPagoComision + "' value= '" + ta.PorcentajeComision + "'>" : "<input id= 'txt_" + ta.IDPagoComision + "' disabled name= 'txt_" + ta.IDPagoComision + "' value= '" + ta.PorcentajeComision + "'>",
                                     ta.TotalPagar,
                                     ta.ComisionPaga,
                                     chkPago = "<input id='chk_" + ta.IDPagoComision + "' type='checkbox'>"
                                 }).AsEnumerable();
                return Json(new
                {
                    Data = jsonObjet,
                    MessageType = "Success",
                    InfoMessage = jsonObjet.Count() > 0 ?
                            "Proceso efectuado satisfactoriamente." :
                            "No existen comisiones por pagar que coincidan con los criterios de búsqueda.",
                    ErrorMessage = string.Empty
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
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

        [HttpPost]
        public JsonResult GuardarPagosComision(IEnumerable<ViwolfRental.Common.Model.t_PagosComisiones> EnumPagosComisiones, ViwolfRental.Common.Model.t_PagosComisiones pagosComisiones)
        {
            try
            {
                var result = BlComision.PagarComisiones(EnumPagosComisiones, pagosComisiones);
                return Json(new
                {
                    Data = result,
                    MessageType = "Success",
                    InfoMessage = result != null ?
                            "Proceso efectuado satisfactoriamente." :
                            "No existen comisiones por pagar que coincidan con los criterios de búsqueda.",
                    ErrorMessage = string.Empty
                }, JsonRequestBehavior.AllowGet);
            }

            catch (Exception ex)
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

        [AuthorizeUser(IdPantalla: 13)]
        public ActionResult ReporteComisiones(string usuario, string idUsuario, string RolUsuario)
        {
            ViewBag.Usuario = usuario;
            ViewBag.IdUsuario = idUsuario;
            rolUsuario = RolUsuario;
            return View();
        }

        [HttpPost]
        public JsonResult ListarComisionistas(ViwolfRental.Common.Model.t_ClientesComisionistas clientesComisionistas)
        {
            try
            {
                IComisionistasBL BlComisionista = new ComisionistasBL();
                var result = BlComisionista.ListarComisionistas(clientesComisionistas);
                var jsonObjet = (from ta in result
                                 select new
                                 {
                                     ta.IDClienteComisionista,
                                     ta.NombreClienteComisionista
                                 }).AsEnumerable();
                return Json(new
                {
                    Data = jsonObjet,
                    MessageType = "Success",
                    InfoMessage = jsonObjet.Count() > 0 ?
                            "Proceso efectuado satisfactoriamente." :
                            "No existen comisionistas que coincidan con los criterios de búsqueda.",
                    ErrorMessage = string.Empty
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
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

        [HttpPost]
        public ActionResult VerReporteComisiones(DateTime FechaInicial, DateTime FechaFinal, string IDClienteComisionista, string ComisionPaga)
        {
           return RedirectToAction("VerReporteComisiones", "Reportes", new { @FechaInicial = FechaInicial, @FechaFinal = FechaFinal, @IDClienteComisionista = IDClienteComisionista, @ComisionPaga = ComisionPaga });
        }
        #endregion

        #region Cuentas x Cobrar

        [AuthorizeUser(IdPantalla: 12)]
        public ActionResult CuentasCobrar(string usuario, string idUsuario, string RolUsuario)
        {
            ViewBag.Usuario = usuario;
            ViewBag.IdUsuario = idUsuario;
            rolUsuario = RolUsuario;
            return View();
        }

        [HttpPost]
        public JsonResult ListarCuentasxCobrar(ViwolfRental.Common.Model.t_CuentasxCobrar cuentasxCobrar)
        {
            try
            {
                var result = BlComision.ListarCuentasPorCobrar(cuentasxCobrar);

                var jsonObjet = (from ta in result
                                 select new
                                 {
                                     ta.IDCuentaxCobrar,
                                     ta.IDContrato,
                                     ta.t_Contratos.NumeroContrato,
                                     ta.t_Contratos.t_Reservaciones.NombreCliente,
                                     ta.Total,
                                     ta.CuentaCobrada,
                                     chkPago = "<input id='chk_" + ta.IDCuentaxCobrar + "' type='checkbox'>"
                                 }).AsEnumerable();
                return Json(new
                {
                    Data = jsonObjet,
                    MessageType = "Success",
                    InfoMessage = jsonObjet.Count() > 0 ?
                            "Proceso efectuado satisfactoriamente." :
                            "No existen comisiones por pagar que coincidan con los criterios de búsqueda.",
                    ErrorMessage = string.Empty
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
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

        [HttpPost]
        public JsonResult AplicarCuentaxCobrar(IEnumerable<ViwolfRental.Common.Model.t_CuentasxCobrar> EnumPagosComisiones, ViwolfRental.Common.Model.t_CuentasxCobrar pagosComisiones)
        {
            try
            {
                var result = BlComision.AplicarCxC(EnumPagosComisiones, pagosComisiones);
                return Json(new
                {
                    Data = result,
                    MessageType = "Success",
                    InfoMessage = result != null ?
                            "Proceso efectuado satisfactoriamente." :
                            "No existen comisiones por pagar que coincidan con los criterios de búsqueda.",
                    ErrorMessage = string.Empty
                }, JsonRequestBehavior.AllowGet);
            }

            catch (Exception ex)
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

        [HttpPost]
        public ActionResult VerPagoCxC(string IDCuentaxCobrar)
        {
            return RedirectToAction("VerPagoCxC", "Reportes", new { @IDCuentaxCobrar = IDCuentaxCobrar });
        }
        #endregion







    }
}