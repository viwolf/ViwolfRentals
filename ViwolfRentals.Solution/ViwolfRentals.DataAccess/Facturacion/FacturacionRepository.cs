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
    public class FacturacionRepository : IFacturacionRepository
    {
        public FacturacionRepository(IConnectionManager connectionManagerInstance)
        {
            ConnectionManagerInstance = connectionManagerInstance == null ? new ConnectionManager() : connectionManagerInstance;

        }

        public t_Facturas GuardarFactura(t_Facturas Factura)
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
                        Transaccion = transaction;

                        //Se manda a guardar el encabezado
                        var resultado = DoCrearFactura(connection, Factura);

                        /***************************** DETALLE FACTURA *******************************/
                        //Se crea una instancia del DataAccess de Reservaciones
                        IFacturacionDetalleRepository detalleRepository = new FacturacionDetalleRepository(ConnectionManagerInstance);
                        foreach (var item in Factura.t_FacturasDetalles)
                        {
                            item.IDFactura = resultado.IDFactura;
                            item.UsuarioCreacion = Factura.UsuarioCreacion;
                        }
                        detalleRepository.Conexion = connection;
                        detalleRepository.Transaccion = transaction;

                        var modelDetalle = detalleRepository.GuardarDetalleFactura(Factura.t_FacturasDetalles);

                        /***************************** DETALLE FACTURA *******************************/
                        //Se crea una instancia del DataAccess de Reservaciones
                        IFacturacionDetallePagoRepository detallePagoRepository = new FacturacionDetallePagoRepository(ConnectionManagerInstance);
                        foreach (var item in Factura.t_FacturaDetallePago)
                        {
                            item.IDFactura = resultado.IDFactura;
                            item.UsuarioCreacion = Factura.UsuarioCreacion;
                        }
                        detallePagoRepository.Conexion = connection;
                        detallePagoRepository.Transaccion = transaction;

                        var modelDetallePago = detallePagoRepository.GuardarDetallePagoFactura(Factura.t_FacturaDetallePago);


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

        private t_Facturas DoCrearFactura(IDbConnection connection, t_Facturas facturas)
        {

            StringBuilder tracerBuilder = new StringBuilder();

            try
            {
                tracerBuilder.AppendLine($"Se procede a guardar la reservacion. {Environment.NewLine}");
                var idFactura = (int)connection.ExecuteScalar(
                                              sql: "usp_Factura_Guardar",
                                              param: new
                                              {
                                                  facturas.IDFactura,
                                                  facturas.UsuarioCreacion,
                                                  facturas.NombreCliente,
                                                  facturas.IDTipoFactura,
                                                  facturas.IDEstadoFactura,
                                                  facturas.TotalFacturado
                                              },
                                              transaction: Transaccion,
                                              commandTimeout: 500,
                                              commandType: CommandType.StoredProcedure);

                facturas.IDFactura = idFactura;
                return facturas;
            }
            catch (Exception ex)
            {
                //tracerBuilder.AppendLine($"Falló guardar reservacion. Error: {ex.ToString()}\nEntity={entity.SerializeToJson()}");
                throw;
            }


        }

        public IConnectionManager ConnectionManagerInstance { get; private set; }
        public System.Data.IDbConnection Conexion { get; set; }
        public System.Data.IDbTransaction Transaccion { get; set; }
    }
}
