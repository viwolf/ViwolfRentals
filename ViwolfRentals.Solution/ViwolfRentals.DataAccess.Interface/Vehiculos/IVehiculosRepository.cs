using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ViwolfRental.Common.Model;

namespace ViwolfRentals.DataAccess.Interface
{
    public interface IVehiculosRepository
    {
        IEnumerable<ViwolfRental.Common.Model.t_Vehiculos> ListarVehiculos(ViwolfRental.Common.Model.t_Vehiculos vehiculos);

        IEnumerable<ViwolfRental.Common.Model.t_Kilometrajes> ListarKilometraje(ViwolfRental.Common.Model.t_Kilometrajes kilometrajes);

        IEnumerable<ViwolfRental.Common.Model.t_Vehiculos> ListarVehiculosReservaciones(ViwolfRental.Common.Model.t_Vehiculos vehiculos);
        t_Vehiculos Guardar(t_Vehiculos model);

        //PROPIEDADES PARA EL MANEJO DE LA TRANSACCIONABILIDAD
        System.Data.IDbConnection Conexion { get; set; }
        System.Data.IDbTransaction Transaccion { get; set; }
    }
}
