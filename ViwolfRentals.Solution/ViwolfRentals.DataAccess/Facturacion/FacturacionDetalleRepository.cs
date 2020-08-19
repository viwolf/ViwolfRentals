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
    public class FacturacionDetalleRepository : IFacturacionDetalleRepository
    {

        public FacturacionDetalleRepository(IConnectionManager connectionManagerInstance)
        {
            ConnectionManagerInstance = connectionManagerInstance == null ? new ConnectionManager() : connectionManagerInstance;
        }

        public IEnumerable<t_FacturasDetalles> GuardarDetalleFactura(IEnumerable<t_FacturasDetalles> EnumDetalle)
        {
            if (Conexion != null)
            {
                var resultado = DoGuardarDetalleFactura(Conexion, EnumDetalle);
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
                            var resultado = DoGuardarDetalleFactura(connection, EnumDetalle);


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

        private IEnumerable<t_FacturasDetalles> DoGuardarDetalleFactura(IDbConnection connection, IEnumerable<t_FacturasDetalles> detalles)
        {

            System.Data.DataTable TblDetalles = new System.Data.DataTable();
            TblDetalles.Columns.Add(new System.Data.DataColumn("IDContrato", typeof(int)));
            TblDetalles.Columns.Add(new System.Data.DataColumn("TotalContrato", typeof(decimal)));
            TblDetalles.Columns.Add(new System.Data.DataColumn("IDFactura", typeof(int)));
            TblDetalles.Columns.Add(new System.Data.DataColumn("UsuarioCreacion", typeof(String)));
            TblDetalles.Columns.Add(new System.Data.DataColumn("TipoCambio", typeof(int)));
            TblDetalles.Columns.Add(new System.Data.DataColumn("IDTipoMoneda", typeof(int)));
            


            foreach (var item in detalles)
            {
                TblDetalles.Rows.Add(item.IDContrato, item.TotalContrato, item.IDFactura, item.UsuarioCreacion, item.TipoCambio, item.IDTipoMoneda);
            }


            StringBuilder tracerBuilder = new StringBuilder();

            try
            {
                tracerBuilder.AppendLine($"Se procede a guardar la reservacion. {Environment.NewLine}");
                var Ejecucion = (int)connection.ExecuteScalar(
                                              sql: "usp_FacturaDetalle_Guardar",
                                              param: new
                                              {
                                                  DetallesFactura = TblDetalles,
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
