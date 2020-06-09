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
    }
}
