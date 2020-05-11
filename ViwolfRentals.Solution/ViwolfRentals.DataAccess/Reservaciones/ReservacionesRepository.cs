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
    public class ReservacionesRepository : IReservacionesRepository
    {

        IConnectionManager ConnectionManagerInstance = new ConnectionManager();

        public t_Reservaciones Guardar(t_Reservaciones model)
        {

            //Si no se maneja transaccionabilidad se hace la conexion normal
            using (IDbConnection connection = ConnectionManagerInstance.GetConnection(ConnectionManager.ViwolfRentalsdatabase))
            {
                    //se abre la conexion ya que se va a trabajar con transaccionabilidad
                    connection.Open();

                    //se crea el objeto transaccion
                    using (IDbTransaction transaction = connection.BeginTransaction())
                    {
                        try
                        {
                            //Se manda a guardar el encabezado
                            var resultado = DoGuardar(connection, transaction, model);

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

        private t_Reservaciones DoGuardar(IDbConnection connection, IDbTransaction transaction, t_Reservaciones entity)
        {
            StringBuilder tracerBuilder = new StringBuilder();

            try
            {
                tracerBuilder.AppendLine($"Se procede a guardar la reservacion. {Environment.NewLine}");
                var IdReservacion = (int)connection.ExecuteScalar(
                                              sql: "usp_Reservaciones_Guardar",
                                              param: new
                                              {
                                                 entity.UsuarioCreacion,
                                                 entity.NombreCliente,
                                                 entity.LugarEntrega,
                                                 entity.EntregaHotel,
                                                 entity.FechaInicio,
                                                 entity.HoraInicio,
                                                 entity.FechaEntrega,
                                                 entity.HoraEntrega,
                                                 entity.SurfRacks,
                                                 entity.MontoSurfRacks,
                                                 entity.Cajon,
                                                 entity.MontoDia,
                                                 entity.MontoTotal,
                                                 entity.NumeroDeposito,
                                                 entity.MontoDeposito,
                                                 entity.Efectivo,
                                                 entity.CuentaPorCobrar,
                                                 entity.IdProveedor,
                                                 entity.IDUsuario,
                                                 entity.IDVehiculo
                                                
                                              },
                                              transaction: transaction,
                                              commandType: CommandType.StoredProcedure);


                entity.IdReservacion = IdReservacion;
                return entity;
            }
            catch (Exception ex)
            {
                //tracerBuilder.AppendLine($"Falló guardar reservacion. Error: {ex.ToString()}\nEntity={entity.SerializeToJson()}");
                throw;
            }
            



        }
    }
}
