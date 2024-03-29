﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Viwolf.BusinessLogic.Interface
{
    public interface IPagosComisionesBL
    {
        IEnumerable<ViwolfRental.Common.Model.t_PagosComisiones> PagarComisiones(IEnumerable<ViwolfRental.Common.Model.t_PagosComisiones> EnumPagosComisiones, ViwolfRental.Common.Model.t_PagosComisiones pagosComisiones);
        IEnumerable<ViwolfRental.Common.Model.t_PagosComisiones> ListarComisiones(ViwolfRental.Common.Model.t_PagosComisiones entidad);
    }
}
