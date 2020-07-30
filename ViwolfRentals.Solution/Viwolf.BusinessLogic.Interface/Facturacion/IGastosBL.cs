using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Viwolf.BusinessLogic.Interface
{
    public interface IGastosBL
    {
        ViwolfRental.Common.Model.t_Gastos GuardarGastos(ViwolfRental.Common.Model.t_Gastos entidad);
    }
}
