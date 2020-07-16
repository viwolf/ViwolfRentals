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
    public class DashboardRepository : IDashboardRepository
    {

        public DashboardRepository(IConnectionManager connectionManagerInstance)
        {
            ConnectionManagerInstance = connectionManagerInstance == null ? new ConnectionManager() : connectionManagerInstance;

        }


        public IEnumerable<t_Reservaciones> ListarReservacionesDashboard(t_Reservaciones reservaciones)
        {
            try
            {

                if (Conexion != null)
                {
                    //Se manda a guardar el encabezado
                    return DoListarReservacion(Conexion, reservaciones);
                }
                else
                {
                    using (IDbConnection connection = ConnectionManagerInstance.GetConnection(ConnectionManager.ViwolfRentalsdatabase))
                    {
                        //se abre la conexion ya que se va a trabajar con transaccionabilidad
                        connection.Open();

                        //se crea el objeto transaccion
                        using (IDbTransaction transaction = connection.BeginTransaction())
                        {
                            try
                            {
                                Transaccion = transaction;
                                //Se manda a guardar el encabezado
                                var resultado = DoListarReservacion(connection, reservaciones);

                                transaction.Commit();

                                return resultado;
                            }
                            catch (Exception x)
                            {
                                transaction.Rollback();
                                throw;
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        private IEnumerable<t_Reservaciones> DoListarReservacion(IDbConnection connection, t_Reservaciones reservaciones)
        {

            return connection.Query<
               t_Reservaciones,
               t_Vehiculos,
               t_Reservaciones>
               ("usp_Dashboard_Listar",
               (a, b) =>
               {
                   a.t_Vehiculos = (t_Vehiculos)b;
                   return a;
               },
               splitOn: "IDVehiculo",
               param: new
               {
                   reservaciones.GeneraContrato
               }, transaction: Transaccion, commandTimeout: 500, commandType: CommandType.StoredProcedure);


        }

        public IConnectionManager ConnectionManagerInstance { get; private set; }
        public System.Data.IDbConnection Conexion { get; set; }
        public System.Data.IDbTransaction Transaccion { get; set; }

    }
}
