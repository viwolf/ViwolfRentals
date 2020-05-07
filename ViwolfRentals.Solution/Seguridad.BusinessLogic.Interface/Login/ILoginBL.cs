using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seguridad.BusinessLogic.Interface
{
    public interface ILoginBL
    {
        IEnumerable<ViwolfRental.Common.Model.IUsuarios> ListarUsuarioLogin(ViwolfRental.Common.Model.IUsuarios entidad);
    }
}
