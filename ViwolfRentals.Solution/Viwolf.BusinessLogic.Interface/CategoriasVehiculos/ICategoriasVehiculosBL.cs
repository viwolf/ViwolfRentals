using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Viwolf.BusinessLogic.Interface
{
    public interface ICategoriasVehiculosBL
    {
        IEnumerable<ViwolfRental.Common.Model.t_CategoriasVehiculos> ListarCategoriasVehiculos(ViwolfRental.Common.Model.t_CategoriasVehiculos entidad);
    }
}
