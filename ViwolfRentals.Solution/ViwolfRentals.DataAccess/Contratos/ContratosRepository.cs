﻿using Dapper;
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
                        /***************************** RESERVACIONES *******************************/

                        //Se crea un objeto de reservaciones para ser llenado
                        t_Reservaciones objReservaciones = model.t_Reservaciones == null ? new t_Reservaciones() : model.t_Reservaciones;

                        //Se crea una instancia del DataAccess de Reservaciones
                        IReservacionesRepository repositoryReservaciones = new ReservacionesRepository(ConnectionManagerInstance);
                        repositoryReservaciones.Conexion = connection;
                        repositoryReservaciones.Transaccion = transaction;

                        if (model.Extendido == true)
                        {
                            objReservaciones.Extendido = true;
                            objReservaciones.Referencia = model.t_Reservaciones.IdReservacion;
                            objReservaciones.IdReservacion = 0;
                            objReservaciones.UsuarioCreacion = model.UsuarioCreacion;
                            // objReservaciones.IDUsuario = 1;

                            var resReservacion = repositoryReservaciones.Guardar(objReservaciones);
                            objReservaciones.IdReservacion = resReservacion.IdReservacion;
                            model.IDReservacion = resReservacion.IdReservacion;

                        }

                        else
                        {
                            //Se le asignan valores al objeto Reservaciones
                            objReservaciones.IdReservacion = model.IDReservacion;
                        }

                        //Se manda a guardar el contrato
                        var resultado = DoGuardar(connection, transaction, model);

                        objReservaciones.GeneraContrato = true;
                        objReservaciones.FechaEntrega = null;
                        objReservaciones.FechaInicio = null;

                        ////Se crea una instancia del DataAccess de Reservaciones
                        //IReservacionesRepository repositoryReservaciones = new ReservacionesRepository(ConnectionManagerInstance);
                        //repositoryReservaciones.Conexion = connection;
                        //repositoryReservaciones.Transaccion = transaction;
                      
                        //Se llena el objeto reservaciones de la BD, con el numero de contrato creado
                        var modelReservaciones = repositoryReservaciones.ListarReservaciones(objReservaciones);

                       
                            

                        //Valida que la reservacion aplique comision, para ser guardado en pagos de comision
                        if (modelReservaciones.FirstOrDefault().AplicaComision == true)
                        {
                            /***************************** VEHICULOS *******************************/
                            t_Vehiculos objVehiculos = new t_Vehiculos();
                            objVehiculos.IDVehiculo = model.t_Reservaciones == null ? modelReservaciones.FirstOrDefault().IDVehiculo : model.t_Reservaciones.IDVehiculo;


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

        public IEnumerable<t_Contratos> ListarContratos(t_Contratos entidad)
        {
            using (IDbConnection connection = ConnectionManagerInstance.GetConnection(ConnectionManager.ViwolfRentalsdatabase))
            {
                return connection.Query<
             t_Contratos,
             t_Reservaciones,
             t_EstadosContratos,
             t_Contratos>
             ("usp_Contratos_Listar",
             (a, b, c) =>
             {
                 a.t_Reservaciones = (t_Reservaciones)b;
                 a.t_EstadosContratos = (t_EstadosContratos)c;
                 return a;
             },
             splitOn: "IdReservacion, IDEstadoContrato",
             param: new
             {
                 entidad.NumeroContrato,
                 NombreCliente = entidad.t_Reservaciones == null ? null : entidad.t_Reservaciones.NombreCliente,
                 LugarEntrega = entidad.t_Reservaciones == null ? null : entidad.t_Reservaciones.LugarEntrega,
                 entidad.IDEstadoContrato
             }, commandTimeout: 500, commandType: CommandType.StoredProcedure);
            }


          

        }

        public IEnumerable<t_EstadosContratos> ListarEstados(t_EstadosContratos entidad)
        {
            using (IDbConnection connection = ConnectionManagerInstance.GetConnection(ConnectionManager.ViwolfRentalsdatabase))
            {
                return connection.Query("usp_EstadosContratos_Listar",
                   new[]
                   {
                        typeof(ViwolfRental.Common.Model.t_EstadosContratos)
                   },
                   (object[] objetos) =>
                   {
                       t_EstadosContratos a = objetos[0] as t_EstadosContratos;
                       t_EstadosContratos resultado = new t_EstadosContratos();

                       resultado = a;
                       return resultado;


                   },
                           param: new
                           {
                             

                           },
                            splitOn: "",
                            commandType: CommandType.StoredProcedure);
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
                                                  entity.TotalContrato,
                                                  entity.Extendido,
                                                  entity.Referencia,
                                                  entity.IDUsuario
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
