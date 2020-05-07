using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViwolfRental.Common.Model
{
    public class Usuarios : IUsuarios
    {
        public string IdUsuario { get; set; }

        public string CodigoUsuario { get; set; }

        public string Password { get; set; }
        
        public bool Activo { get; set; }

    }
}
