using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Viwolf.BusinessLogic.Interface;
using ViwolfRental.Common.Model;

namespace Viwolf.BusinessLogic
{
    public class ComisionistasBL : IComisionistasBL
    {
        public IEnumerable<t_ClientesComisionistas> ListarComisionistas(t_ClientesComisionistas entidad)
        {
            ViwolfRentals.DataAccess.Interface.IComisionistasRepository repository = new ViwolfRentals.DataAccess.ComisionistasRepository();

            return repository.ListarComisionistas(entidad);
        }
    }
}
