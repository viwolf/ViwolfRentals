using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViwolfRentals.DataAccess.Interface
{
    public interface IDepartamentosVehiculosRepository
    {
        IEnumerable<ViwolfRental.Common.Model.t_Departamentos> ListarDepartamentos(ViwolfRental.Common.Model.t_Departamentos departamentos);
    }
}
