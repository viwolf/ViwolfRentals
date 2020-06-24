using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Viwolf.BusinessLogic.Interface
{
    public interface IFacturacionBL
    {
        ViwolfRental.Common.Model.t_Facturas GuardarFactura(ViwolfRental.Common.Model.t_Facturas entidad);
    }
}
