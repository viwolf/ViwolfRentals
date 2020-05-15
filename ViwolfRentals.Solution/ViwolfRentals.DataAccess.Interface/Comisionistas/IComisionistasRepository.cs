using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViwolfRentals.DataAccess.Interface
{
    public interface IComisionistasRepository
    {
        IEnumerable<ViwolfRental.Common.Model.t_ClientesComisionistas> ListarComisionistas(ViwolfRental.Common.Model.t_ClientesComisionistas comisionistas);
    }
}
