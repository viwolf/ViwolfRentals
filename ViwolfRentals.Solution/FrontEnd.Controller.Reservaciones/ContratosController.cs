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

        public ActionResult Index(string usuario, string idUsuario)
        {
            ViewBag.Usuario = usuario;
            ViewBag.IdUsuario = idUsuario;
            return View();
        }


        private byte[] ReadFile(string sPath)
        {
            //Initialize byte array with a null value initially.
            byte[] data = null;

            //Use FileInfo object to get file size.
            FileInfo fInfo = new FileInfo(sPath);
            long numBytes = fInfo.Length;

            //Open FileStream to read file
            FileStream fStream = new FileStream(sPath, FileMode.Open, FileAccess.Read);

            //Use BinaryReader to read file stream into byte array.
            BinaryReader br = new BinaryReader(fStream);

            //When you use BinaryReader, you need to supply number of bytes 
            //to read from file.
            //In this case we want to read entire file. 
            //So supplying total number of bytes.
            data = br.ReadBytes((int)numBytes);

            return data;
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
    }
}
