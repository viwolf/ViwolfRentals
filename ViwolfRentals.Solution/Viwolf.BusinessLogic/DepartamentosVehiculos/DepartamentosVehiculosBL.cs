using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Viwolf.BusinessLogic.Interface;
using ViwolfRental.Common.Model;

namespace Viwolf.BusinessLogic
{
    public class DepartamentosVehiculosBL : IDepartamentosVehiculosBL
    {
        public IEnumerable<t_Departamentos> ListarDepartamentos(t_Departamentos departamentos)
        {
            ViwolfRentals.DataAccess.Interface.IDepartamentosVehiculosRepository repository = new ViwolfRentals.DataAccess.DepartamentosVehiculosRepository();
            return repository.ListarDepartamentos(departamentos);
        }
    }
}
