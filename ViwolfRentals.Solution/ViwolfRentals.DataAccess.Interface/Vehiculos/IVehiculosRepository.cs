using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViwolfRentals.DataAccess.Interface
{
    public interface IVehiculosRepository
    {
        IEnumerable<ViwolfRental.Common.Model.t_Vehiculos> ListarVehiculos(ViwolfRental.Common.Model.t_Vehiculos vehiculos);
    }
}
