﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Viwolf.BusinessLogic.Interface
{
    public interface IReservacionesBL
    {
        ViwolfRental.Common.Model.t_Reservaciones GuardarReservacion(ViwolfRental.Common.Model.t_Reservaciones reservacion);
    }
}