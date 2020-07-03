using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Viwolf.BusinessLogic.Interface;
using ViwolfRental.Common.Model;

namespace Viwolf.BusinessLogic
{
    public class ContratosBL : IContratosBL
    {
        ViwolfRentals.DataAccess.Interface.IContratosRepository repository = new ViwolfRentals.DataAccess.ContratosRepository();

        public t_Contratos GuardarContrato(t_Contratos contrato)
        {
            return repository.Guardar(contrato);
        }

        public IEnumerable<t_Contratos> ListarContratos(t_Contratos entidad)
        {
            return repository.ListarContratos(entidad);
        }

        public IEnumerable<t_Contratos> ListarContratosxTerminar(t_Contratos entidad)
        {
            return repository.ListarContratosxTerminar(entidad);
        }

        public IEnumerable<t_EstadosContratos> ListarEstados(t_EstadosContratos entidad)
        {
            return repository.ListarEstados(entidad);
        }

        public t_ContratosTerminados TerminarContrato(t_ContratosTerminados contrato)
        {
            return repository.TerminarContrato(contrato);
        }
    }
}
