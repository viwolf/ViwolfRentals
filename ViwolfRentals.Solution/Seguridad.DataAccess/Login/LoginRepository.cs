using Dapper;
using Seguridad.DataAccess.Interface;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ViwolfRental.Common.Model;

namespace Seguridad.DataAccess
{
    public class LoginRepository : ILoginRepository<ViwolfRental.Common.Model.IUsuarios>
    {
        public IConnectionManager ConnectionManagerInstance { get; private set; }

        IDbConnection ILoginRepository<IUsuarios>.Conexion { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        IDbTransaction ILoginRepository<IUsuarios>.Transaccion { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        IEnumerable<IUsuarios> ILoginRepository<IUsuarios>.ListarUsuarioLogin(IUsuarios entity)
        {
            using (IDbConnection connection = ConnectionManagerInstance.GetConnection(ConnectionManager.ViwolfRentalsdatabase))
            {
                return connection.Query("usp_Usuario_Listar",
                   new[]
                   {
                        typeof(ViwolfRental.Common.Model.Usuarios)
                   },
                   (object[] objetos) =>
                   {
                       Usuarios a = objetos[0] as Usuarios;
                       Usuarios resultado = new Usuarios();

                       resultado = a;
                       return resultado;


                   },
                   param: new
                   {
                       NombreUsuario = entity.Usuario,
                       Password = entity.Password
                   },
                    splitOn: "IdUsuario,",
                    commandType: CommandType.StoredProcedure);
            }
        }
    }
}
