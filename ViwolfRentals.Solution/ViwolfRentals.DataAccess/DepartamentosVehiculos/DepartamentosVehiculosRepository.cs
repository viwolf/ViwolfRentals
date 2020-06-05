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
    public class DepartamentosVehiculosRepository : IDepartamentosVehiculosRepository
    {
        IConnectionManager ConnectionManagerInstance = new ConnectionManager();


        IEnumerable<t_Departamentos> IDepartamentosVehiculosRepository.ListarDepartamentos(t_Departamentos departamentos)
        {
            using (IDbConnection connection = ConnectionManagerInstance.GetConnection(ConnectionManager.ViwolfRentalsdatabase))
            {
                return connection.Query("usp_DepartamentosVehiculos_Listar",
                   new[]
                   {
                        typeof(ViwolfRental.Common.Model.t_Departamentos)
                   },
                   (object[] objetos) =>
                   {
                       t_Departamentos a = objetos[0] as t_Departamentos;
                       t_Departamentos resultado = new t_Departamentos();

                       resultado = a;
                       return resultado;


                   },
                           param: new
                           {
                               departamentos.IDDepartamento,
                               departamentos.NombreDepartamento
                               //entity.Activo

                           },
                            splitOn: "",
                            commandType: CommandType.StoredProcedure);
            }
        }
    }
}
