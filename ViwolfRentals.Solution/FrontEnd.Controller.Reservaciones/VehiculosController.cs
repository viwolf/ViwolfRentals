using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Metadata.W3cXsd2001;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Viwolf.BusinessLogic;
using Viwolf.BusinessLogic.Interface;
using ViwolfRental.Common.Model;

namespace FrontEnd.Controllers.Viwolf
{
    public class VehiculosController : Controller
    {
        IVehiculosBL BlVehiculo = new VehiculosBL();
        ICategoriasVehiculosBL BlCategorias = new CategoriasVehiculosBL();

        public ActionResult Index(string usuario, string idUsuario)
        {
            ViewBag.Usuario = usuario;
            ViewBag.IdUsuario = idUsuario;
            return View();
        }

        public ActionResult CreacionVehiculos(string usuario, string idUsuario)
        {
            ViewBag.Usuario = usuario;
            ViewBag.IdUsuario = idUsuario;
            return View();
        }

        [HttpPost]
        public JsonResult ListarVehiculos(t_Vehiculos vehiculos)
        {

            try
            {
                var result = BlVehiculo.ListarVehiculos(vehiculos);

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

        [HttpPost]

        public JsonResult ListarKilometrajes(t_Kilometrajes kilometraje)
        {
            try
            {
                var result = BlVehiculo.ListarKilometrajes(kilometraje);

                var jsonObjet = (from ta in result
                                 select new
                                 {
                                     ta.IDReservacion,
                                     ta.IDVehiculo,
                                     FechaInicial = string.Format("{0:d/M/yyyy}", ta.FechaInicial),
                                     ta.KilometrajeInicial,
                                     FechaFinal = string.Format("{0:d/M/yyyy}", ta.FechaFinal),
                                     ta.KilometrajeFinal,
                                     ta.KilometrajeReccorrido
                                 }).AsEnumerable();
                return Json(new
                {
                    Data = jsonObjet,
                    MessageType = "Success",
                    InfoMessage = jsonObjet.Count() > 0 ?
                            "Proceso efectuado satisfactoriamente." :
                            "No existen kilometros que coincidan con los criterios de búsqueda.",
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

        [HttpPost]
        public JsonResult GuardarVehiculo(ViwolfRental.Common.Model.t_Vehiculos vehiculo)
        {
            try
            {
                var result = BlVehiculo.GuardarVehiculo(vehiculo);
                return Json(new
                {
                    Data = result,
                    MessageType = "Success",
                    InfoMessage = result != null ?
                            "Proceso efectuado satisfactoriamente." :
                            "No existen vehiculos que coincidan con los criterios de búsqueda.",
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

        [HttpPost]
        public JsonResult ListarCategoriasVehiculos(t_CategoriasVehiculos categoriaVehiculo)
        {

            try
            {
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
                            "No existen categorias que coincidan con los criterios de búsqueda.",
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
