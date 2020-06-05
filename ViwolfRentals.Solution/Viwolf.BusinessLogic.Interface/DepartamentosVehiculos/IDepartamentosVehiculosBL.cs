using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Viwolf.BusinessLogic.Interface
{
    public interface IDepartamentosVehiculosBL
    {
        IEnumerable<ViwolfRental.Common.Model.t_Departamentos> ListarDepartamentos(ViwolfRental.Common.Model.t_Departamentos departamentos);
    }
}
