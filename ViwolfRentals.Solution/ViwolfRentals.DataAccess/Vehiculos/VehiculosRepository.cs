using Dapper;
using System.Collections.Generic;
using System.Data;
using ViwolfRental.Common.Model;
using ViwolfRentals.DataAccess.Interface;

namespace ViwolfRentals.DataAccess
{
    public class VehiculosRepository : IVehiculosRepository
    {
        IConnectionManager ConnectionManagerInstance = new ConnectionManager();

        public IEnumerable<t_Vehiculos> ListarVehiculos(t_Vehiculos vehiculos)
        {
            using (IDbConnection connection = ConnectionManagerInstance.GetConnection(ConnectionManager.ViwolfRentalsdatabase))
            {
                return connection.Query<
                   t_Vehiculos,
                   t_CategoriasVehiculos,
                   t_Departamentos,
                   t_Vehiculos>
                   ("usp_Vehiculos_Listar",
                   (a, b, c) =>
                   {
                       a.t_CategoriasVehiculos = (t_CategoriasVehiculos)b;
                       a.t_Departamentos = (t_Departamentos)c;
                       return a;
                   },
                   splitOn: "IDCategoriaVehiculo , IDDepartamento",
                   param: new
                   {
                       vehiculos.IDVehiculo,
                       vehiculos.Marca,
                       vehiculos.Modelo,
                       vehiculos.Anno,
                       vehiculos.FechaCompra,
                       vehiculos.NumeroChasis,
                       vehiculos.NumeroMotor,
                       vehiculos.RtvVencimientoAnno,
                       vehiculos.RtvVencimientoMes,
                       vehiculos.MarchamoProximo,
                       vehiculos.RtvSticker,
                       vehiculos.RtvPapel,
                       vehiculos.MarchamoPapel,
                       vehiculos.StickerPlaca,
                       vehiculos.TituloPropiedad,
                       vehiculos.Multas,
                       vehiculos.IDCategoriaVehiculo,
                       vehiculos.IDDepartamento

                   },
                  commandType: CommandType.StoredProcedure);
            }
        }
    }
}
