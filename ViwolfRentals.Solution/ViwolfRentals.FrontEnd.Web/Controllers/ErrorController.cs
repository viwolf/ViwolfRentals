﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ViwolfRentals.FrontEnd.Web.Controllers
{
    public class ErrorController : Controller
    {
        // GET: Error
        [HttpGet]
        public ActionResult UnauthorizedOperation()
        {
            //ViewBag.operacion = Operacion;
            //ViewBag.modulo = Modulo;
            //ViewBag.msjeErrorExepcion = MsjeErrorExepcion;
            return View();
        }

    }
}
