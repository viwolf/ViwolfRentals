using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Viwolf.BusinessLogic.Interface;
using ViwolfRental.Common.Model;

namespace Viwolf.BusinessLogic
{
    public class FacturacionBL : IFacturacionBL
    {
        ViwolfRentals.DataAccess.Interface.IFacturacionRepository repository  = new ViwolfRentals.DataAccess.FacturacionRepository(null);
        public t_Facturas GuardarFactura(t_Facturas entidad)
        {
            return repository.GuardarFactura(entidad);
        }
    }
}
