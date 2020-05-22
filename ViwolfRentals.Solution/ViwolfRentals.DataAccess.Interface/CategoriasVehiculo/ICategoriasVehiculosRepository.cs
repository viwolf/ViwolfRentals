using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViwolfRentals.DataAccess.Interface
{
     public interface ICategoriasVehiculosRepository
    {
        IEnumerable<ViwolfRental.Common.Model.t_CategoriasVehiculos> ListarCategorias(ViwolfRental.Common.Model.t_CategoriasVehiculos categoriasVehiculos);
    }
}
