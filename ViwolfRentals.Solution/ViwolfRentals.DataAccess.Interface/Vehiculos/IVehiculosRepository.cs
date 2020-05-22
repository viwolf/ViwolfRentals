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

       t_Vehiculos Guardar(t_Vehiculos model);
    }
}
