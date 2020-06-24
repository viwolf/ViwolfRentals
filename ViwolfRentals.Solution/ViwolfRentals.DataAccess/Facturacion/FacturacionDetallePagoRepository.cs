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
    public class FacturacionDetallePagoRepository : IFacturacionDetallePagoRepository
    {
        public FacturacionDetallePagoRepository(IConnectionManager connectionManagerInstance)
        {
            ConnectionManagerInstance = connectionManagerInstance == null ? new ConnectionManager() : connectionManagerInstance;
        }

      
        public IEnumerable<t_FacturaDetallePago> GuardarDetallePagoFactura(IEnumerable<t_FacturaDetallePago> EnumDetallePago)
        {
            if (Conexion != null)
            {
                var resultado = DoGuardarDetalleFactura(Conexion, EnumDetallePago);
                return resultado;
            }
            else
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
                            var resultado = DoGuardarDetalleFactura(connection, EnumDetallePago);


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

        private IEnumerable<t_FacturaDetallePago> DoGuardarDetalleFactura(IDbConnection connection, IEnumerable<t_FacturaDetallePago> detalles)
        {

            System.Data.DataTable TblDetalles = new System.Data.DataTable();
            TblDetalles.Columns.Add(new System.Data.DataColumn("IDTipoPago", typeof(int)));
            TblDetalles.Columns.Add(new System.Data.DataColumn("Referencia", typeof(string)));
            TblDetalles.Columns.Add(new System.Data.DataColumn("Monto", typeof(decimal)));
            TblDetalles.Columns.Add(new System.Data.DataColumn("IDFactura", typeof(int)));
            TblDetalles.Columns.Add(new System.Data.DataColumn("UsuarioCreacion", typeof(String)));


            foreach (var item in detalles)
            {
                TblDetalles.Rows.Add(item.IDTipoPago, item.Referencia, item.Monto, item.IDFactura, item.UsuarioCreacion);
            }


            StringBuilder tracerBuilder = new StringBuilder();

            try
            {
                tracerBuilder.AppendLine($"Se procede a guardar la reservacion. {Environment.NewLine}");
                var Ejecucion = (int)connection.ExecuteScalar(
                                              sql: "usp_FacturaDetallePago_Guardar",
                                              param: new
                                              {
                                                  DetallesPago = TblDetalles,
                                              },
                                              transaction: Transaccion,
                                              commandTimeout: 500,
                                              commandType: CommandType.StoredProcedure);

                if (Ejecucion == 1)
                    return detalles;
                else
                    return null;
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
