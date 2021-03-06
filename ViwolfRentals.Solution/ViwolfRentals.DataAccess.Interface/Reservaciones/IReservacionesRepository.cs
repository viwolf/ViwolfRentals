﻿using System;
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
        IEnumerable<ViwolfRental.Common.Model.t_Reservaciones> ListarReservaciones(ViwolfRental.Common.Model.t_Reservaciones reservaciones);
        IEnumerable<ViwolfRental.Common.Model.t_Reservaciones> ListarCalendarioReservaciones(ViwolfRental.Common.Model.t_Reservaciones reservaciones);

        //PROPIEDADES PARA EL MANEJO DE LA TRANSACCIONABILIDAD
        System.Data.IDbConnection Conexion { get; set; }
        System.Data.IDbTransaction Transaccion { get; set; }
    }
}
