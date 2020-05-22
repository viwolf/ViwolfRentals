using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Viwolf.BusinessLogic.Interface;
using ViwolfRental.Common.Model;

namespace Viwolf.BusinessLogic
{
    public class CategoriasVehiculosBL : ICategoriasVehiculosBL
    {
        public IEnumerable<t_CategoriasVehiculos> ListarCategoriasVehiculos(t_CategoriasVehiculos entidad)
        {
            ViwolfRentals.DataAccess.Interface.ICategoriasVehiculosRepository repository = new ViwolfRentals.DataAccess.CategoriasVehiculosRepository();

            return repository.ListarCategorias(entidad);
        }
    }
}
