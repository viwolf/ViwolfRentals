using Dapper;
using System.Collections.Generic;
using System.Data;
using ViwolfRental.Common.Model;
using ViwolfRentals.DataAccess.Interface;

namespace ViwolfRentals.DataAccess
{
    public class ProveedoresRepository : IProveedoresRepository
    {

        IConnectionManager ConnectionManagerInstance = new ConnectionManager();

        public IEnumerable<t_Proveedores> ListarProveedores(t_Proveedores entity)
        {
            using (IDbConnection connection = ConnectionManagerInstance.GetConnection(ConnectionManager.ViwolfRentalsdatabase))
            {
                return connection.Query("usp_Proveedores_Listar",
                   new[]
                   {
                        typeof(ViwolfRental.Common.Model.t_Proveedores)
                   },
                   (object[] objetos) =>
                   {
                       t_Proveedores a = objetos[0] as t_Proveedores;
                       t_Proveedores resultado = new t_Proveedores();

                       resultado = a;
                       return resultado;


                   },
                           param: new
                           {
                              entity.IdProveedor,
                              entity.NombreProveedor,
                              entity.Activo

                           },
                            splitOn: "",
                            commandType: CommandType.StoredProcedure);
            }
        }
    }
}
