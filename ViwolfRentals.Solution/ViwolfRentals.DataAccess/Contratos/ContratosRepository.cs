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
    public class ContratosRepository : IContratosRepository
    {
        IConnectionManager ConnectionManagerInstance = new ConnectionManager();

        public t_Contratos Guardar(t_Contratos model)
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

        private t_Contratos DoGuardar(IDbConnection connection, IDbTransaction transaction, t_Contratos entity)
        {
            StringBuilder tracerBuilder = new StringBuilder();

            try
            {
                tracerBuilder.AppendLine($"Se procede a guardar la reservacion. {Environment.NewLine}");
                var IdContrato = (int)connection.ExecuteScalar(
                                              sql: "usp_Reservaciones_Guardar",
                                              param: new
                                              {
                                                  entity.IDContrato,
                                                  entity.UsuarioCreacion,
                                                  entity.UsuarioModificacion,
                                                  entity.VoucherDeposito,
                                                  entity.VoucherPago,
                                                  entity.Licencia,
                                                  entity.PrimeraVehiculos,
                                                  entity.SegundaVehiculos,
                                                  entity.TerceraVehiculos,
                                                  entity.CuartaVehiculos,
                                                  entity.QuintaVehiculos,
                                                  entity.SextaVehiculos,
                                                  entity.IDEstadoContrato,
                                                  entity.IDReservacion
                                              },
                                              transaction: transaction,
                                              commandType: CommandType.StoredProcedure);


                entity.IDContrato = IdContrato;
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
