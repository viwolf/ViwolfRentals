using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Viwolf.BusinessLogic.Interface
{
    public interface IDashboardBL
    {
        IEnumerable<ViwolfRental.Common.Model.t_Reservaciones> ListarReservaciones(ViwolfRental.Common.Model.t_Reservaciones entidad);
    }
}
