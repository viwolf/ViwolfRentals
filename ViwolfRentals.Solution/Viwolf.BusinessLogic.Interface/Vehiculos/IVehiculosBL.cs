﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Viwolf.BusinessLogic.Interface
{
    public interface IVehiculosBL
    {
        IEnumerable<ViwolfRental.Common.Model.t_Vehiculos> ListarVehiculos(ViwolfRental.Common.Model.t_Vehiculos entidad);
    }
}
