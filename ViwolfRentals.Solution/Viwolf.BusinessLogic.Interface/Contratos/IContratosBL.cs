using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Viwolf.BusinessLogic.Interface
{
    public interface IContratosBL
    {
        ViwolfRental.Common.Model.t_Contratos GuardarContrato(ViwolfRental.Common.Model.t_Contratos contrato);

        IEnumerable<ViwolfRental.Common.Model.t_EstadosContratos> ListarEstados(ViwolfRental.Common.Model.t_EstadosContratos entidad);

        IEnumerable<ViwolfRental.Common.Model.t_Contratos> ListarContratos(ViwolfRental.Common.Model.t_Contratos entidad);

        IEnumerable<ViwolfRental.Common.Model.t_Contratos> ListarContratosxTerminar(ViwolfRental.Common.Model.t_Contratos entidad);

        ViwolfRental.Common.Model.t_ContratosTerminados TerminarContrato(ViwolfRental.Common.Model.t_ContratosTerminados contrato);
        

    }
}
