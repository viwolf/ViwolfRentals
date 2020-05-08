using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seguridad.DataAccess.Interface
{
    public interface ILoginRepository
    {

        System.Data.IDbConnection Conexion { get; set; }
        System.Data.IDbTransaction Transaccion { get; set; }

        //IEnumerable<ViwolfRental.Common.Model.IUsuariosold> ListarUsuarioLogin(ViwolfRental.Common.Model.IUsuariosold usuarios);
        IEnumerable<ViwolfRental.Common.Model.t_Usuarios> ListarUsuarioLogin(ViwolfRental.Common.Model.t_Usuarios usuarios);
    }
}
