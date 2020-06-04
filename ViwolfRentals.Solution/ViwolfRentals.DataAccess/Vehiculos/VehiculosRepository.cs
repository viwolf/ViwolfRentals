using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using ViwolfRental.Common.Model;
using ViwolfRentals.DataAccess.Interface;

namespace ViwolfRentals.DataAccess
{
    public class VehiculosRepository : IVehiculosRepository
    {
        IConnectionManager ConnectionManagerInstance = new ConnectionManager();

        public t_Vehiculos Guardar(t_Vehiculos model)
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

        public IEnumerable<t_Kilometrajes> ListarKilometraje(t_Kilometrajes kilometrajes)
        {
            using (IDbConnection connection = ConnectionManagerInstance.GetConnection(ConnectionManager.ViwolfRentalsdatabase))
            {
                return connection.Query("usp_Kilometraje_Listar",
                   new[]
                   {
                        typeof(ViwolfRental.Common.Model.t_Kilometrajes)
                   },
                   (object[] objetos) =>
                   {
                       t_Kilometrajes a = objetos[0] as t_Kilometrajes;
                       t_Kilometrajes resultado = new t_Kilometrajes();

                       resultado = a;
                       return resultado;


                   },
                           param: new
                           {
                               kilometrajes.IDVehiculo

                           },
                            splitOn: "",
                            commandType: CommandType.StoredProcedure);
            }
        }

        public IEnumerable<t_Vehiculos> ListarVehiculos(t_Vehiculos vehiculos)
        {
            using (IDbConnection connection = ConnectionManagerInstance.GetConnection(ConnectionManager.ViwolfRentalsdatabase))
            {
                return connection.Query<
                   t_Vehiculos,
                   t_CategoriasVehiculos,
                   t_Departamentos,
                   t_Vehiculos>
                   ("usp_Vehiculos_Listar",
                   (a, b, c) =>
                   {
                       a.t_CategoriasVehiculos = (t_CategoriasVehiculos)b;
                       a.t_Departamentos = (t_Departamentos)c;
                       return a;
                   },
                   splitOn: "IDCategoriaVehiculo , IDDepartamento",
                   param: new
                   {
                       vehiculos.IDVehiculo,
                       vehiculos.Marca,
                       vehiculos.Modelo,
                       vehiculos.Anno,
                       vehiculos.FechaCompra,
                       vehiculos.NumeroChasis,
                       vehiculos.NumeroMotor,
                       vehiculos.RtvVencimientoAnno,
                       vehiculos.RtvVencimientoMes,
                       vehiculos.MarchamoProximo,
                       vehiculos.RtvSticker,
                       vehiculos.RtvPapel,
                       vehiculos.MarchamoPapel,
                       vehiculos.StickerPlaca,
                       vehiculos.TituloPropiedad,
                       vehiculos.Multas,
                       vehiculos.IDCategoriaVehiculo,
                       vehiculos.IDDepartamento

                   },
                  commandType: CommandType.StoredProcedure);
            }
        }

        public IEnumerable<t_Vehiculos> ListarVehiculosReservaciones(t_Vehiculos vehiculos)
        {
            using (IDbConnection connection = ConnectionManagerInstance.GetConnection(ConnectionManager.ViwolfRentalsdatabase))
            {
                return connection.Query<
                   t_Vehiculos,
                   t_CategoriasVehiculos,
                   t_Departamentos,
                   t_Vehiculos>
                   ("usp_VehiculosReservaciones_Listar",
                   (a, b, c) =>
                   {
                       a.t_CategoriasVehiculos = (t_CategoriasVehiculos)b;
                       a.t_Departamentos = (t_Departamentos)c;
                       return a;
                   },
                   splitOn: "IDCategoriaVehiculo , IDDepartamento",
                   param: new
                   {
                       FechaInicio = vehiculos.ExtendedProporeties["FechaInicio"],
                       FechaEntrega = vehiculos.ExtendedProporeties["FechaEntrega"],
                   },
                  commandType: CommandType.StoredProcedure) ;
            }
        }

        private t_Vehiculos DoGuardar(IDbConnection connection, IDbTransaction transaction, t_Vehiculos entity)
        {
            StringBuilder tracerBuilder = new StringBuilder();

            try
            {
                tracerBuilder.AppendLine($"Se procede a guardar el vehiculo. {Environment.NewLine}");
                var idVehiculo = (string)connection.ExecuteScalar(
                                              sql: "usp_Vehiculos_Guardar",
                                              param: new
                                              {
                                                  entity.IDVehiculo,
                                                  entity.UsuarioCreacion,
                                                  entity.UsuarioModificacion,
                                                  entity.Marca,
                                                  entity.Modelo,
                                                  entity.Anno,
                                                  entity.GPS,
                                                  entity.FechaCompra,
                                                  entity.NumeroChasis,
                                                  entity.NumeroMotor,
                                                  entity.Color,
                                                  entity.Transmision,
                                                  entity.NumeroCilindros,
                                                  entity.PesoKg,
                                                  entity.Carroceria,
                                                  entity.Traccion,
                                                  entity.Capacidad,
                                                  entity.RtvVencimientoAnno,
                                                  entity.RtvVencimientoMes,
                                                  entity.MarchamoProximo,
                                                  entity.RtvSticker,
                                                  entity.RtvPapel,
                                                  entity.MarchamoSticker,
                                                  entity.MarchamoPapel,
                                                  entity.StickerPlaca,
                                                  entity.TituloPropiedad,
                                                  entity.Multas,
                                                  entity.IDCategoriaVehiculo,
                                                  entity.IDDepartamento,
                                                  entity.Activo

                                              },
                                              transaction: transaction,
                                              commandType: CommandType.StoredProcedure);


                entity.IDVehiculo = idVehiculo;
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
