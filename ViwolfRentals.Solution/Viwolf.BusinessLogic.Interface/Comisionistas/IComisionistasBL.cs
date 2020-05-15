using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Viwolf.BusinessLogic.Interface
{
    public interface IComisionistasBL
    {
        IEnumerable<ViwolfRental.Common.Model.t_ClientesComisionistas> ListarComisionistas(ViwolfRental.Common.Model.t_ClientesComisionistas entidad);
    }
}
