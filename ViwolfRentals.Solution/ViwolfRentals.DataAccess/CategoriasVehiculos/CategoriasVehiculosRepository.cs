using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ViwolfRental.Common.Model;
using ViwolfRentals.DataAccess.Interface;

namespace ViwolfRentals.DataAccess
{
    public class CategoriasVehiculosRepository : ICategoriasVehiculosRepository
    {
        IConnectionManager ConnectionManagerInstance = new ConnectionManager();

        public IEnumerable<t_CategoriasVehiculos> ListarCategorias(t_CategoriasVehiculos entity)
        {
            using (IDbConnection connection = ConnectionManagerInstance.GetConnection(ConnectionManager.ViwolfRentalsdatabase))
            {
                return connection.Query("usp_CategoriaVehiculos_Listar",
                   new[]
                   {
                        typeof(ViwolfRental.Common.Model.t_CategoriasVehiculos)
                   },
                   (object[] objetos) =>
                   {
                       t_CategoriasVehiculos a = objetos[0] as t_CategoriasVehiculos;
                       t_CategoriasVehiculos resultado = new t_CategoriasVehiculos();

                       resultado = a;
                       return resultado;


                   },
                           param: new
                           {
                               entity.IDCategoriaVehiculo,
                               entity.NombreCategoriaVehiculo,
                               entity.Activo

                           },
                            splitOn: "",
                            commandType: CommandType.StoredProcedure);
            }
        }
    }
}
