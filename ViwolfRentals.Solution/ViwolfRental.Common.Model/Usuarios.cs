using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViwolfRental.Common.Model
{
    public class Usuarios : IUsuarios
    {
        public string Password { get; set; }
        string IUsuarios.Usuario { get; set; }
    }
}
