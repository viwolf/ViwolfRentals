using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViwolfRentals.DataAccess.Interface
{
    public interface IProveedoresRepository
    {
        IEnumerable<ViwolfRental.Common.Model.t_Proveedores> ListarProveedores(ViwolfRental.Common.Model.t_Proveedores proveedores);
    }
}
