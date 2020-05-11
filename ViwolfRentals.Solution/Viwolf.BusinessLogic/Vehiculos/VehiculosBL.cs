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
        public IEnumerable<t_Vehiculos> ListarVehiculos(t_Vehiculos vehiculo)
        {
            ViwolfRentals.DataAccess.Interface.IVehiculosRepository repository = new ViwolfRentals.DataAccess.VehiculosRepository();

            return repository.ListarVehiculos(vehiculo);
        }
    }
}
