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

        public IEnumerable<t_Usuarios> ListarUsuarioLogin(t_Usuarios entity)
        {
            using (IDbConnection connection = ConnectionManagerInstance.GetConnection(ConnectionManager.ViwolfRentalsdatabase))
            {
                return connection.Query("usp_Usuario_Listar",
                   new[]
                   {
                        typeof(ViwolfRental.Common.Model.t_Usuarios)
                   },
                   (object[] objetos) =>
                   {
                       t_Usuarios a = objetos[0] as t_Usuarios;
                       t_Usuarios resultado = new t_Usuarios();

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

        public IEnumerable<t_RolesSistemaModuloPantalla> ListarPantallaRoles(t_RolesSistemaModuloPantalla rolesSistemaModuloPantalla)
        {
            using (IDbConnection connection = ConnectionManagerInstance.GetConnection(ConnectionManager.ViwolfRentalsdatabase))
            {
                
                return connection.Query<
                   t_RolesSistemaModuloPantalla,
                   t_Roles,
                   t_Pantallas,
                   t_Sistemas,
                   t_Modulos,
                   t_RolesSistemaModuloPantalla>
                   ("usp_PantallasXRol_Listar",
                   (a, b, c, d, e) =>
                   {
                       a.t_Roles = (t_Roles)b;
                       a.t_Pantallas = (t_Pantallas)c;
                       c.t_Sistemas = (t_Sistemas)d;
                       c.t_Modulos = (t_Modulos)e;
                       return a;
                   },
                   splitOn: "IDRol, IDPantalla , IDSistema, IDModulo",
                   param: new
                   {
                       rolesSistemaModuloPantalla.IDRol,
                       rolesSistemaModuloPantalla.IDPantalla
                   },
                  commandType: CommandType.StoredProcedure);
            }
        }
    }
}
