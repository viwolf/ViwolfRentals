using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Viwolf.BusinessLogic.Interface
{
    public interface IProveedoresBL
    {
        IEnumerable<ViwolfRental.Common.Model.t_Proveedores> ListarProveedores(ViwolfRental.Common.Model.t_Proveedores entidad);
    }
}
