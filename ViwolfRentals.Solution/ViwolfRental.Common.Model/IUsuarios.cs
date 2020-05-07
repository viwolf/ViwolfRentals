using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace ViwolfRental.Common.Model
{
    [ServiceContract]
    public interface IUsuarios
    {

        string IdUsuario { get; set; }
        string CodigoUsuario { get; set; }
        string Password { get; set; }
        bool Activo { get; set; }
    }
}
