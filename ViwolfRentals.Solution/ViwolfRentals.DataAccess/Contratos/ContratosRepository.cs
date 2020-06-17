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
                        //Se manda a guardar el contrato
                        var resultado = DoGuardar(connection, transaction, model);
                        
                        /***************************** RESERVACIONES *******************************/
                        //Se crea un objeto de reservaciones para ser llenado
                        t_Reservaciones objReservaciones = new t_Reservaciones();
                        
                        //Se le asignan valores al objeto Reservaciones
                        objReservaciones.IdReservacion = model.IDReservacion;
                        objReservaciones.GeneraContrato = true;

                        //Se crea una instancia del DataAccess de Reservaciones
                        IReservacionesRepository repositoryReservaciones = new ReservacionesRepository(ConnectionManagerInstance);
                        repositoryReservaciones.Conexion = connection;
                        repositoryReservaciones.Transaccion = transaction;
                      
                        //Se llena el objeto reservaciones de la BD, con el numero de contrato creado
                        var modelReservaciones = repositoryReservaciones.ListarReservaciones(objReservaciones);

                        //Valida que la reservacion aplique comision, para ser guardado en pagos de comision
                        if (modelReservaciones.FirstOrDefault().AplicaComision == true)
                        {
                            /***************************** VEHICULOS *******************************/
                            t_Vehiculos objVehiculos = new t_Vehiculos();
                            objVehiculos.IDVehiculo = modelReservaciones.FirstOrDefault().IDVehiculo;


                            IVehiculosRepository repositoryVehiculo = new VehiculosRepository(ConnectionManagerInstance);
                            repositoryVehiculo.Conexion = connection;
                            repositoryVehiculo.Transaccion = transaction;

                            var modelVehiculo = repositoryVehiculo.ListarVehiculos(objVehiculos);

                            /***************************** PAGO COMISION *******************************/
                            t_PagosComisiones objPagos = new t_PagosComisiones();
                            IPagosComisionesRepository pagos = new PagosComisionesRepository(ConnectionManagerInstance);


                            objPagos.UsuarioCreacion = resultado.UsuarioCreacion;
                            objPagos.IDClienteComisionista = modelReservaciones.FirstOrDefault().t_ClientesComisionistas.IDClienteComisionista;
                            objPagos.IDContrato = resultado.IDContrato;
                            objPagos.PrecioTotal = resultado.TotalContrato;
                            objPagos.PorcentajeComision = modelVehiculo.FirstOrDefault().t_CategoriasVehiculos.Comision;

                            objPagos.TotalPagar = (((decimal)objPagos.PorcentajeComision / (decimal)100) * (decimal)objPagos.PrecioTotal);
                            objPagos.ComisionPaga = false;

                            pagos.Conexion = connection;
                            pagos.Transaccion = transaction;

                            var resultadoPagoComision = pagos.Guardar(objPagos);
                        }

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
                                              sql: "usp_Contratos_Guardar",
                                              param: new
                                              {
                                                  entity.IDContrato,
                                                  entity.UsuarioCreacion,
                                                  entity.UsuarioModificacion,
                                                  entity.VoucherDeposito,
                                                  //VoucherPago = entity.ExtendedProporeties["Encode"], //VoucherPago,
                                                  entity.VoucherPago,
                                                  entity.Licencia,
                                                  entity.PrimeraVehiculos,
                                                  entity.SegundaVehiculos,
                                                  entity.TerceraVehiculos,
                                                  entity.CuartaVehiculos,
                                                  entity.QuintaVehiculos,
                                                  entity.SextaVehiculos,
                                                  entity.IDEstadoContrato,
                                                  entity.IDReservacion,
                                                  entity.IDCodigoContrato,
                                                  entity.TotalContrato
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
