using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Viwolf.BusinessLogic;
using Viwolf.BusinessLogic.Interface;

namespace FrontEnd.Controllers.Viwolf
{
    public class ContratosController :  Controller
    {
        IContratosBL BlContrato = new ContratosBL();
        IVehiculosBL BlVehiculo = new VehiculosBL();
       

        public ActionResult Index(string usuario, string idUsuario)
        {
            ViewBag.Usuario = usuario;
            ViewBag.IdUsuario = idUsuario;
            return View();
        }

        public ActionResult Control(string usuario, string idUsuario)
        {
            ViewBag.Usuario = usuario;
            ViewBag.IdUsuario = idUsuario;
            return View();
        }

        [HttpPost]
        public JsonResult GuardarContrato(ViwolfRental.Common.Model.t_Contratos contrato)
        {
            try
            {
                //var plainText = System.Convert.ToString(contrato.ExtendedProporeties["Path"]);


                //    var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
                //    var ENCODE =  System.Convert.ToBase64String(plainTextBytes);

                //contrato.ExtendedProporeties.Add("Encode", ENCODE);



                var result = BlContrato.GuardarContrato(contrato);
                return Json(new
                {
                    Data = result,
                    MessageType = "Success",
                    InfoMessage = result != null ?
                            "Proceso efectuado satisfactoriamente." :
                            "No existen contratos que coincidan con los criterios de búsqueda.",
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
        public JsonResult ListarEstadosContratos(ViwolfRental.Common.Model.t_EstadosContratos estados)
        {
            try
            {
                var result = BlContrato.ListarEstados(estados);
                var jsonObjet = (from ta in result
                                 select new
                                 {
                                     ta.IDEstadoContrato,
                                     ta.Descripcion
                                 }).AsEnumerable();
                return Json(new
                {
                    Data = jsonObjet,
                    MessageType = "Success",
                    InfoMessage = jsonObjet.Count() > 0 ?
                            "Proceso efectuado satisfactoriamente." :
                            "No existen Estados que coincidan con los criterios de búsqueda.",
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
        public JsonResult ListarContratos(ViwolfRental.Common.Model.t_Contratos contratos)
        {
            try
            {

              

                var result = BlContrato.ListarContratos(contratos);

                var jsonObjet = (from ta in result
                                 select new
                                 {
                                     ta.IDContrato,
                                     ta.IDReservacion,
                                     objReservacion = ta.t_Reservaciones,
                                     ta.t_EstadosContratos.IDEstadoContrato,
                                     ta.NumeroContrato,
                                     ta.t_Reservaciones.NombreCliente,
                                     ta.t_Reservaciones.LugarEntrega,
                                     FechaInicio = string.Format("{0:d/M/yyyy}", ta.t_Reservaciones.FechaInicio),
                                     FechaEntrega = string.Format("{0:d/M/yyyy}", ta.t_Reservaciones.FechaEntrega),
                                     ta.t_EstadosContratos.Descripcion,
                                     ta.TotalContrato,
                                     chkPago = "<input id='chk_" + ta.IDContrato + "' type='checkbox'>",
                                     Extender = ta.t_EstadosContratos.IDEstadoContrato == 2 ? "<button id= 'btnE_" + ta.IDContrato + "' name='btnE_" + ta.IDContrato + "'><i class='fa fa-external-link-alt'></i></button>" : "<button disabled id= 'btnE_" + ta.IDContrato + "' name='btnE_" + ta.IDContrato + "'><i class='fa fa-external-link-alt'></i></button>"
                                  
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
        public JsonResult ListarVehiculosReservaciones(ViwolfRental.Common.Model.t_Vehiculos vehiculos)
        {

            try
            {
                var result = BlVehiculo.ListarVehiculosReservaciones(vehiculos);

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
                                     ta.Color,
                                     ta.Transmision,
                                     ta.NumeroCilindros,
                                     ta.PesoKg,
                                     ta.Carroceria,
                                     ta.Traccion,
                                     ta.Capacidad,
                                     RtvSticker = ta.RtvSticker == true ? "Sí" : "No",
                                     RtvPapel = ta.RtvPapel == true ? "Sí" : "No",
                                     MarchamoPapel = ta.MarchamoPapel == true ? "Sí" : "No",
                                     StickerPlaca = ta.StickerPlaca == true ? "Sí" : "No",
                                     TituloPropiedad = ta.TituloPropiedad == true ? "Sí" : "No",
                                     ta.Multas,
                                     ta.t_CategoriasVehiculos,
                                     ta.t_Departamentos,
                                     GPS = ta.GPS == true ? "Sí" : "No",
                                     Ver = "<button id= '" + ta.IDVehiculo + "' name='btnV_" + ta.IDVehiculo + "'><i class='fa fa-eye'></i></button>"
                                 }).AsEnumerable();
                return Json(new
                {
                    Data = jsonObjet,
                    MessageType = "Success",
                    InfoMessage = jsonObjet.Count() > 0 ?
                            "Proceso efectuado satisfactoriamente." :
                            "No existen vehiculos que coincidan con los criterios de búsqueda.",
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
        public JsonResult ExtenderContrato(ViwolfRental.Common.Model.t_Contratos contrato)
        {
            try
            {
                var result = BlContrato.GuardarContrato(contrato);
                return Json(new
                {
                    Data = result,
                    MessageType = "Success",
                    InfoMessage = result != null ?
                            "Proceso efectuado satisfactoriamente." :
                            "No existen reservaciones que coincidan con los criterios de búsqueda.",
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
    }
}
