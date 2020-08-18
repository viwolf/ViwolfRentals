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
    public class GastosRepository : IGastoRepository
    {

        public GastosRepository(IConnectionManager connectionManagerInstance)
        {
            ConnectionManagerInstance = connectionManagerInstance == null ? new ConnectionManager() : connectionManagerInstance;

        }

        public t_Gastos GuardarGasto(t_Gastos entidad)
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
                        var resultado = DoCrearGasto(connection, entidad);

                        /***************************** DETALLE GASTOS *******************************/

                        foreach (var item in entidad.t_GastosDetalle)
                        {
                            item.IDGasto = resultado.IDGasto;
                            item.UsuarioCreacion = resultado.UsuarioCreacion;
                        }
                        

                        var modelDetallePago = DoCrearGastosDetalle(connection, entidad);


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





        private t_Gastos DoCrearGasto(IDbConnection connection, t_Gastos gasto)
        {

            StringBuilder tracerBuilder = new StringBuilder();

            try
            {
                tracerBuilder.AppendLine($"Se procede a guardar el encabezado del gasto. {Environment.NewLine}");
                var idGasto = (int)connection.ExecuteScalar(
                                              sql: "usp_Gastos_Guardar",
                                              param: new
                                              {
                                                  gasto.IDGasto,
                                                  gasto.UsuarioCreacion,
                                                  gasto.TotalGastosDolares,
                                                  gasto.TotalGastosColones,
                                                  gasto.IDUsuario,
                                                  gasto.Activo
                                              },
                                              transaction: Transaccion,
                                              commandTimeout: 500,
                                              commandType: CommandType.StoredProcedure);

                gasto.IDGasto = idGasto;
                return gasto;
            }
            catch (Exception ex)
            {
                //tracerBuilder.AppendLine($"Falló guardar reservacion. Error: {ex.ToString()}\nEntity={entity.SerializeToJson()}");
                throw;
            }


        }

        private t_Gastos DoCrearGastosDetalle(IDbConnection connection, t_Gastos gasto)
        {

            StringBuilder tracerBuilder = new StringBuilder();

            System.Data.DataTable TblGastosDetalle = new System.Data.DataTable();
            TblGastosDetalle.Columns.Add(new System.Data.DataColumn("IDGasto", typeof(int)));
            TblGastosDetalle.Columns.Add(new System.Data.DataColumn("Descripcion", typeof(string)));
            TblGastosDetalle.Columns.Add(new System.Data.DataColumn("MontoDolares", typeof(decimal)));
            TblGastosDetalle.Columns.Add(new System.Data.DataColumn("MontoColones", typeof(decimal)));
            TblGastosDetalle.Columns.Add(new System.Data.DataColumn("NumeroFactura", typeof(string)));
            //TblGastosDetalle.Columns.Add(new System.Data.DataColumn("Factura", typeof(byte)));

            foreach (var item in gasto.t_GastosDetalle)
            {
                TblGastosDetalle.Rows.Add(item.IDGasto, item.DescripcionGasto, item.MontoGastoDolares, item.MontoGastoColones, item.NumeroFacturaGasto);
            }




            try
            {
                tracerBuilder.AppendLine($"Se procede a guardar el encabezado del gasto. {Environment.NewLine}");
                var idGasto = (int)connection.ExecuteScalar(
                                              sql: "usp_GastoDetalle_Guardar",
                                              param: new
                                              {
                                                  DetallesGastos = TblGastosDetalle,
                                                  gasto.UsuarioCreacion
                                              },
                                              transaction: Transaccion,
                                              commandTimeout: 500,
                                              commandType: CommandType.StoredProcedure);

                gasto.IDGasto = idGasto;
                return gasto;
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
