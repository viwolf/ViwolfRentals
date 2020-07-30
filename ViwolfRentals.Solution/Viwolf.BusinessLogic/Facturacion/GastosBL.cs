using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Viwolf.BusinessLogic.Interface;
using ViwolfRental.Common.Model;
using ViwolfRentals.DataAccess;
using ViwolfRentals.DataAccess.Interface;

namespace Viwolf.BusinessLogic
{
    public class GastosBL : IGastosBL
    {
        public t_Gastos GuardarGastos(t_Gastos entidad)
        {
            IGastoRepository repository = new GastosRepository(null);
            return repository.GuardarGasto(entidad);

        }
    }
}
