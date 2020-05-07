using Dapper;
using Seguridad.DataAccess.Interface;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ViwolfRental.Common.Model;

namespace Seguridad.DataAccess
{
    public class LoginRepository : ILoginRepository
    {
      //  public IConnectionManager ConnectionManagerInstance { get; private set; }


      //  string conn = ConfigurationManager.ConnectionStrings["ViwolfRentalsDB"].ConnectionString;
      


        IDbConnection ILoginRepository.Conexion { get; set; }
        IDbTransaction ILoginRepository.Transaccion { get; set; }


        IConnectionManager ConnectionManagerInstance = new ConnectionManager();

        IEnumerable<IUsuarios> ILoginRepository.ListarUsuarioLogin(IUsuarios entity)
        {
            using (IDbConnection connection =  ConnectionManagerInstance.GetConnection(ConnectionManager.ViwolfRentalsdatabase))
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
                       UserName = entity.CodigoUsuario,
                       Password = entity.Password
                   },
                    splitOn: "",
                    commandType: CommandType.StoredProcedure);
            }
        }
    }
}
