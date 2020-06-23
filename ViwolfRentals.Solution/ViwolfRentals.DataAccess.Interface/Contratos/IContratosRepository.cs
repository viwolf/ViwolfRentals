using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ViwolfRental.Common.Model;

namespace ViwolfRentals.DataAccess.Interface
{
    public interface IContratosRepository
    {
        t_Contratos Guardar(t_Contratos model);
        IEnumerable<ViwolfRental.Common.Model.t_EstadosContratos> ListarEstados(ViwolfRental.Common.Model.t_EstadosContratos entidad);
        IEnumerable<ViwolfRental.Common.Model.t_Contratos> ListarContratos(ViwolfRental.Common.Model.t_Contratos entidad);
    }
}
