using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Viwolf.BusinessLogic.Interface;
using ViwolfRental.Common.Model;

namespace Viwolf.BusinessLogic
{
    public class VehiculosBL : IVehiculosBL
    {
        ViwolfRentals.DataAccess.Interface.IVehiculosRepository repository = new ViwolfRentals.DataAccess.VehiculosRepository();

        public t_Vehiculos GuardarVehiculo(t_Vehiculos vehiculo)
        {
            return repository.Guardar(vehiculo);
        }

        public IEnumerable<t_Kilometrajes> ListarKilometrajes(t_Kilometrajes entidad)
        {
            return repository.ListarKilometraje(entidad);
        }

        public IEnumerable<t_Vehiculos> ListarVehiculos(t_Vehiculos vehiculo)
        {
        
            return repository.ListarVehiculos(vehiculo);
        }

        public IEnumerable<t_Vehiculos> ListarVehiculosReservaciones(t_Vehiculos entidad)
        {
            return repository.ListarVehiculosReservaciones(entidad);
        }
    }
}
