using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Viwolf.BusinessLogic.Interface;
using ViwolfRental.Common.Model;

namespace Viwolf.BusinessLogic
{
    public class DashboardBL : IDashboardBL
    {
        ViwolfRentals.DataAccess.Interface.IDashboardRepository repository = new ViwolfRentals.DataAccess.DashboardRepository(null);
        public IEnumerable<t_Reservaciones> ListarReservaciones(t_Reservaciones entidad)
        {
            return repository.ListarReservacionesDashboard(entidad);
        }
    }
}
