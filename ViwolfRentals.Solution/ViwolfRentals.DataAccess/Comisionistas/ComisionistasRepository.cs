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
    public class ComisionistasRepository : IComisionistasRepository
    {
        IConnectionManager ConnectionManagerInstance = new ConnectionManager();

        public IEnumerable<t_ClientesComisionistas> ListarComisionistas(t_ClientesComisionistas entity)
        {
            using (IDbConnection connection = ConnectionManagerInstance.GetConnection(ConnectionManager.ViwolfRentalsdatabase))
            {
                return connection.Query("usp_ClientesComisionistas_Listar",
                   new[]
                   {
                        typeof(ViwolfRental.Common.Model.t_ClientesComisionistas)
                   },
                   (object[] objetos) =>
                   {
                       t_ClientesComisionistas a = objetos[0] as t_ClientesComisionistas;
                       t_ClientesComisionistas resultado = new t_ClientesComisionistas();

                       resultado = a;
                       return resultado;


                   },
                           param: new
                           {
                               entity.IDClienteComisionista,
                               entity.NombreClienteComisionista,
                               entity.Activo

                           },
                            splitOn: "",
                            commandType: CommandType.StoredProcedure);
            }
        }
    }
}
