﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Viwolf.BusinessLogic.Interface
{
    public interface IContratosBL
    {
        ViwolfRental.Common.Model.t_Contratos GuardarContrato(ViwolfRental.Common.Model.t_Contratos contrato);
    }
}
