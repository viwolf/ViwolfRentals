﻿using System;
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
    public class DepartamentosController : Controller
    {
        IDepartamentosVehiculosBL BlDepartamentos = new DepartamentosVehiculosBL();

        [HttpPost]
        public JsonResult ListarDepartamentosVehiculos(t_Departamentos departamentosVehiculo)
        {

            try
            {
                var result = BlDepartamentos.ListarDepartamentos(departamentosVehiculo);

                var jsonObjet = (from ta in result
                                 select new
                                 {
                                     ta.IDDepartamento,
                                     ta.NombreDepartamento
                                 }).AsEnumerable();
                return Json(new
                {
                    Data = jsonObjet,
                    MessageType = "Success",
                    InfoMessage = jsonObjet.Count() > 0 ?
                            "Proceso efectuado satisfactoriamente." :
                            "No existen departamentos que coincidan con los criterios de búsqueda.",
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
