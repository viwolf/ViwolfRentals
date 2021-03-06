﻿using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.Remoting.Metadata.W3cXsd2001;
using System.Text;
using System.Threading.Tasks;
using ViwolfRental.Common.Model;
using ViwolfRentals.DataAccess.Interface;


namespace ViwolfRentals.DataAccess
{
    public class ReservacionesRepository : IReservacionesRepository
    {

     

        public ReservacionesRepository(IConnectionManager connectionManagerInstance)
        {
            ConnectionManagerInstance = connectionManagerInstance == null ? new ConnectionManager() : connectionManagerInstance;

        }


        public t_Reservaciones Guardar(t_Reservaciones model)
        {
            //Se valida si la propiedad Conexion es utilizada o no (Se utiliza solo cuando se maneja transaccionalidad)
            if (Conexion != null)
            {
                //Se manda a guardar el encabezado
                var resultado = DoGuardar(Conexion, model);
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
                            var resultado = DoGuardar(connection, model);

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

        public IEnumerable<t_Reservaciones> ListarCalendarioReservaciones(t_Reservaciones reservaciones)
        {
            using (IDbConnection connection = ConnectionManagerInstance.GetConnection(ConnectionManager.ViwolfRentalsdatabase))
            {
                return connection.Query("usp_CalendarioReservaciones_Listar",
                   new[]
                   {
                        typeof(ViwolfRental.Common.Model.t_Reservaciones)
                   },
                   (object[] objetos) =>
                   {
                       t_Reservaciones a = objetos[0] as t_Reservaciones;
                       t_Reservaciones resultado = new t_Reservaciones();

                       resultado = a;
                       return resultado;


                   },
                            splitOn: "",
                            param: new
                            {
                                reservaciones.FechaInicio
                            },
                            commandType: CommandType.StoredProcedure);
            }
        }

        public IEnumerable<t_Reservaciones> ListarReservaciones(t_Reservaciones reservaciones)
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
            catch(Exception ex)
            {
                throw;
            }
            
        }

        

        private t_Reservaciones DoGuardar(IDbConnection connection, t_Reservaciones entity)
        {
            StringBuilder tracerBuilder = new StringBuilder();

            try
            {
                tracerBuilder.AppendLine($"Se procede a guardar la reservacion. {Environment.NewLine}");
                var IdReservacion = (int)connection.ExecuteScalar(
                                              sql: "usp_Reservaciones_Guardar",
                                              param: new
                                              {
                                                  entity.IdReservacion,
                                                 entity.UsuarioCreacion,
                                                 entity.NombreCliente,
                                                 entity.LugarEntrega,
                                                 entity.AplicaComision,
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
                                                 entity.SaldoActual,
                                                 entity.ModoPago,
                                                 entity.IDClienteComisionista,
                                                 entity.IdProveedor,
                                                 entity.IDUsuario,
                                                 entity.IDVehiculo,
                                                 entity.IdentificacionCliente,
                                                 entity.NacionalidadCliente,
                                                 entity.ProfesionCliente
                                                
                                              },
                                              transaction: Transaccion,
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
        private IEnumerable<t_Reservaciones> DoListarReservacion(IDbConnection connection, t_Reservaciones reservaciones)
        {

            return connection.Query<
               t_Reservaciones,
               t_ClientesComisionistas,
               t_Proveedores,
               t_Reservaciones>
               ("usp_Reservaciones_Listar",
               (a, b, c) =>
               {
                   a.t_ClientesComisionistas = (t_ClientesComisionistas)b;
                   a.t_Proveedores = (t_Proveedores)c;
                   return a;
               },
               splitOn: "IdClienteComisionista , IdProveedor",
               param: new
               {
                   reservaciones.IdReservacion,
                   reservaciones.NombreCliente,
                   reservaciones.LugarEntrega,
                   reservaciones.AplicaComision,
                   reservaciones.FechaInicio,
                       //reservaciones.HoraInicio,
                       reservaciones.FechaEntrega,
                       //reservaciones.HoraEntrega,
                       reservaciones.SurfRacks,
                   reservaciones.MontoSurfRacks,
                   reservaciones.Cajon,
                   reservaciones.MontoDia,
                   reservaciones.MontoTotal,
                   reservaciones.NumeroDeposito,
                   reservaciones.MontoDeposito,
                   reservaciones.ModoPago,
                   reservaciones.IDClienteComisionista,
                   reservaciones.IdProveedor,
                   reservaciones.IDUsuario,
                   reservaciones.IDVehiculo,
                   reservaciones.Activo,
                   reservaciones.GeneraContrato
               }, transaction:Transaccion, commandTimeout: 500, commandType: CommandType.StoredProcedure);


        }

        public IConnectionManager ConnectionManagerInstance { get; private set; }
        public System.Data.IDbConnection Conexion { get; set; }
        public System.Data.IDbTransaction Transaccion { get; set; }
    }
}
