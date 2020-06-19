using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Viwolf.BusinessLogic.Interface;
using ViwolfRental.Common.Model;

namespace Viwolf.BusinessLogic
{
    public class PagosComisionesBL : IPagosComisionesBL
    {
        ViwolfRentals.DataAccess.Interface.IPagosComisionesRepository repository = new ViwolfRentals.DataAccess.PagosComisionesRepository(null);

        public IEnumerable<t_PagosComisiones> ListarComisiones(t_PagosComisiones entidad)
        {
            return repository.ListarComisiones(entidad);
        }

        public t_PagosComisiones PagarComisiones(IEnumerable<t_PagosComisiones> EnumPagosComisiones, t_PagosComisiones pagosComisiones)
        {
            return repository.PagarComisiones(EnumPagosComisiones, pagosComisiones);
        }
    }
}
