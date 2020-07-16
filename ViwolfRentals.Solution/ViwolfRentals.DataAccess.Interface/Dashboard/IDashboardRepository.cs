using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViwolfRentals.DataAccess.Interface
{
    public interface IDashboardRepository
    {
        IEnumerable<ViwolfRental.Common.Model.t_Reservaciones> ListarReservacionesDashboard(ViwolfRental.Common.Model.t_Reservaciones reservaciones);

        //PROPIEDADES PARA EL MANEJO DE LA TRANSACCIONABILIDAD
        System.Data.IDbConnection Conexion { get; set; }
        System.Data.IDbTransaction Transaccion { get; set; }
    }
}
