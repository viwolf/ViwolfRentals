using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Viwolf.BusinessLogic.Interface
{
    public interface IPagosComisionesBL
    {
        IEnumerable<ViwolfRental.Common.Model.t_PagosComisiones> PagarComisiones(IEnumerable<ViwolfRental.Common.Model.t_PagosComisiones> EnumPagosComisiones, ViwolfRental.Common.Model.t_PagosComisiones pagosComisiones);
        IEnumerable<ViwolfRental.Common.Model.t_PagosComisiones> ListarComisiones(ViwolfRental.Common.Model.t_PagosComisiones entidad);

        IEnumerable<ViwolfRental.Common.Model.t_CuentasxCobrar> ListarCuentasPorCobrar(ViwolfRental.Common.Model.t_CuentasxCobrar entidad);
        IEnumerable<ViwolfRental.Common.Model.t_CuentasxCobrar> AplicarCxC(IEnumerable<ViwolfRental.Common.Model.t_CuentasxCobrar> EnumPagosComisiones, ViwolfRental.Common.Model.t_CuentasxCobrar pagosComisiones);
    }
}
