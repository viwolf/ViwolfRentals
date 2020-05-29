using Seguridad.BusinessLogic.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ViwolfRental.Common.Model;

namespace Seguridad.BusinessLogic
{
    public class LoginBL : ILoginBL
    {
        DataAccess.Interface.ILoginRepository repository = new DataAccess.LoginRepository();

        public IEnumerable<t_RolesSistemaModuloPantalla> ListarPantallaRoles(t_RolesSistemaModuloPantalla entidad)
        {
            return repository.ListarPantallaRoles(entidad);
        }

        public IEnumerable<t_Usuarios> ListarUsuarioLogin(t_Usuarios entidad)
        {
           

            return repository.ListarUsuarioLogin(entidad);
        }
    }
}
