using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Viwolf.BusinessLogic.Interface
{
    public interface IReservacionesBL
    {
        ViwolfRental.Common.Model.t_Reservaciones GuardarReservacion(ViwolfRental.Common.Model.t_Reservaciones reservacion);
        IEnumerable<ViwolfRental.Common.Model.t_Reservaciones> ListarReservaciones(ViwolfRental.Common.Model.t_Reservaciones entidad);
        IEnumerable<ViwolfRental.Common.Model.t_Vehiculos> ListarCalendarioReservaciones(ViwolfRental.Common.Model.t_Vehiculos vehiculo);
    }
}
