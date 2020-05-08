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
        //public IEnumerable<IUsuariosold> ListarUsuarioLogin(IUsuariosold entidad)
        //{
        //    DataAccess.Interface.ILoginRepository repository = new DataAccess.LoginRepository();

        //    return repository.ListarUsuarioLogin(entidad);
        //}

        public IEnumerable<t_Usuarios> ListarUsuarioLogin(t_Usuarios entidad)
        {
            DataAccess.Interface.ILoginRepository repository = new DataAccess.LoginRepository();

            return repository.ListarUsuarioLogin(entidad);
        }
    }
}
