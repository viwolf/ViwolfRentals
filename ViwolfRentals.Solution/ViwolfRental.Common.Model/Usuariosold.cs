using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;



namespace ViwolfRental.Common.Model
{
    public class Usuariosold : IUsuariosold
    {
        [DataMember]
        public string IdUsuario { get; set; }
        [DataMember]
        public string CodigoUsuario { get; set; }
        [DataMember]
        public string Password { get; set; }
        [DataMember]
        public bool Activo { get; set; }

    }
}
