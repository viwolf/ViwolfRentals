using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Viwolf.BusinessLogic.Interface;
using ViwolfRental.Common.Model;

namespace Viwolf.BusinessLogic
{
    public class ReservacionesBL : IReservacionesBL
    {
        ViwolfRentals.DataAccess.Interface.IReservacionesRepository repository = new ViwolfRentals.DataAccess.ReservacionesRepository();

        public t_Reservaciones GuardarReservacion(t_Reservaciones reservacion)
        {
            return repository.Guardar(reservacion);
        }

        public IEnumerable<t_Reservaciones> ListarCalendarioReservaciones(t_Reservaciones reservaciones)
        {
            return repository.ListarCalendarioReservaciones(reservaciones);
        }

        public IEnumerable<t_Reservaciones> ListarReservaciones(t_Reservaciones entidad)
        {
            return repository.ListarReservaciones(entidad);
        }
    }
}
