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
        public t_Reservaciones GuardarReservacion(t_Reservaciones reservacion)
        {
            ViwolfRentals.DataAccess.Interface.IReservacionesRepository repository = new ViwolfRentals.DataAccess.ReservacionesRepository();

            return repository.Guardar(reservacion);
        }
    }
}
