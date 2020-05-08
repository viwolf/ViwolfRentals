using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Viwolf.BusinessLogic.Interface;
using ViwolfRental.Common.Model;

namespace Viwolf.BusinessLogic
{
    public class ProveedoresBL : IProveedoresBL
    {
        public IEnumerable<t_Proveedores> ListarProveedores(t_Proveedores entidad)
        {
            ViwolfRentals.DataAccess.Interface.IProveedoresRepository repository = new ViwolfRentals.DataAccess.ProveedoresRepository();

            return repository.ListarProveedores(entidad);
        }
    }
}
