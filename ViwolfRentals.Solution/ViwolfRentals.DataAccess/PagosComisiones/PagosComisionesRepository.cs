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
    public class PagosComisionesRepository : IPagosComisionesRepository
    {

        
        public PagosComisionesRepository(IConnectionManager connectionManagerInstance)
        {
            ConnectionManagerInstance = connectionManagerInstance == null ? new ConnectionManager() : connectionManagerInstance;

        }

        public t_PagosComisiones Guardar(t_PagosComisiones model)
        {
            if (Conexion != null)
            {
                var resultado = DoGuardarPagoComision(Conexion, model);
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
                            var resultado = DoGuardarPagoComision(connection,  model);

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

        private t_PagosComisiones DoGuardarPagoComision(IDbConnection connection, t_PagosComisiones entity)
        {
            StringBuilder tracerBuilder = new StringBuilder();

            try
            {
                tracerBuilder.AppendLine($"Se procede a guardar la reservacion. {Environment.NewLine}");
                var IdContrato = (int)connection.ExecuteScalar(
                                              sql: "usp_PagosComision_Guardar",
                                              param: new
                                              {
                                                  entity.IDPagoComision,
                                                  entity.UsuarioCreacion,
                                                  entity.UsuarioModificacion,
                                                  entity.IDClienteComisionista,
                                                  entity.IDContrato,
                                                  entity.PrecioTotal,
                                                  entity.PorcentajeComision,
                                                  entity.TotalPagar,
                                                  entity.ComisionPaga
                                              },
                                              transaction: Transaccion,
                                              commandTimeout: 500,
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

        public IEnumerable<t_PagosComisiones> ListarComisiones(t_PagosComisiones entity)
        {
            try
            {
                if (Conexion != null)
                {
                    //Se manda a guardar el encabezado
                    return DoListarComisiones(Conexion, entity);
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
                                var resultado = DoListarComisiones(connection, entity);

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

        private IEnumerable<t_PagosComisiones> DoListarComisiones(IDbConnection connection, t_PagosComisiones entity)
        {

            return connection.Query<
               t_PagosComisiones,
               t_ClientesComisionistas,
               t_Contratos,
               t_Reservaciones,
               t_PagosComisiones>
               ("usp_PagoComisiones_Listar",
               (a, b, c, d) =>
               {
                   a.t_ClientesComisionistas = (t_ClientesComisionistas)b;
                   a.t_Contratos = (t_Contratos)c;
                   a.t_Contratos.t_Reservaciones = (t_Reservaciones)d;
                   return a;
               },
               splitOn: "IDClienteComisionista , IDContrato, IdReservacion",
               param: new
               {
                   entity.IDClienteComisionista,
                   NombreClienteComisionista = entity.t_ClientesComisionistas.NombreClienteComisionista,
                   entity.ComisionPaga,
                   IDEstadoContrato = entity.t_Contratos.IDEstadoContrato
               }, transaction: Transaccion, commandTimeout: 500, commandType: CommandType.StoredProcedure);


        }

        public IEnumerable<t_PagosComisiones> PagarComisiones(IEnumerable<t_PagosComisiones> EnumPagosComisiones, t_PagosComisiones pagosComisiones)
        {
            if (Conexion != null)
            {
                var resultado = DoPagarComision(Conexion, EnumPagosComisiones, pagosComisiones);
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
                            var resultado = DoPagarComision(connection, EnumPagosComisiones, pagosComisiones);

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

        private IEnumerable<t_PagosComisiones> DoPagarComision(IDbConnection connection, IEnumerable<t_PagosComisiones> EnumPagosComisiones, t_PagosComisiones pagosComisiones)
        {

            System.Data.DataTable TblComisiones = new System.Data.DataTable();
            TblComisiones.Columns.Add(new System.Data.DataColumn("IDPagoComision", typeof(int)));
            TblComisiones.Columns.Add(new System.Data.DataColumn("PrecioTotal", typeof(decimal)));
            TblComisiones.Columns.Add(new System.Data.DataColumn("TotalPagar", typeof(decimal)));

            System.Data.DataTable TblComisionesModificar = new System.Data.DataTable();
            TblComisionesModificar.Columns.Add(new System.Data.DataColumn("id", typeof(string)));
            TblComisionesModificar.Columns.Add(new System.Data.DataColumn("porcentaje", typeof(int)));

         

            foreach (var item in EnumPagosComisiones)
            {
                TblComisiones.Rows.Add(item.IDPagoComision, item.PrecioTotal, item.TotalPagar);
            }

            if (pagosComisiones.ExtendedProperties != null)
            {

                foreach (var item in pagosComisiones.ExtendedProperties)
                {
                    TblComisionesModificar.Rows.Add(item.Key, item.Value);
                }
            }


            StringBuilder tracerBuilder = new StringBuilder();

            try
            {
                tracerBuilder.AppendLine($"Se procede a guardar la reservacion. {Environment.NewLine}");
                var Ejecucion = (int)connection.ExecuteScalar(
                                              sql: "usp_PagosComision_Pagar",
                                              param: new
                                              {
                                                  Comisiones = TblComisiones,
                                                  tblComisionesPagar = TblComisionesModificar
                                              },
                                              transaction: Transaccion,
                                              commandTimeout: 500,
                                              commandType: CommandType.StoredProcedure);

                if (Ejecucion == 1)
                    return EnumPagosComisiones;
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
