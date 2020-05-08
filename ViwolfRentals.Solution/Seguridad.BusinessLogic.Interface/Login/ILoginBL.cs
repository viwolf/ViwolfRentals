using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seguridad.BusinessLogic.Interface
{
    public interface ILoginBL
    {
        //IEnumerable<ViwolfRental.Common.Model.IUsuariosold> ListarUsuarioLogin(ViwolfRental.Common.Model.IUsuariosold entidad);
        IEnumerable<ViwolfRental.Common.Model.t_Usuarios> ListarUsuarioLogin(ViwolfRental.Common.Model.t_Usuarios entidad);
    }
}
