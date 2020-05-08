using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ViwolfRental.Common.Model;

namespace ViwolfRentals.DataAccess.Interface
{
    public interface IReservacionesRepository
    {
        t_Reservaciones Guardar(t_Reservaciones model);

    }
}
