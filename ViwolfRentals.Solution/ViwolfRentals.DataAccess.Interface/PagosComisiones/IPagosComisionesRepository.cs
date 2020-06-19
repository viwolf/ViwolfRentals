using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ViwolfRental.Common.Model;

namespace ViwolfRentals.DataAccess.Interface
{
    public interface IPagosComisionesRepository
    {
        t_PagosComisiones Guardar(t_PagosComisiones model);
        IEnumerable<ViwolfRental.Common.Model.t_PagosComisiones> ListarComisiones(ViwolfRental.Common.Model.t_PagosComisiones entity);
        IEnumerable<t_PagosComisiones> PagarComisiones(IEnumerable<t_PagosComisiones> EnumPagosComisiones, t_PagosComisiones pagosComisiones);
        //PROPIEDADES PARA EL MANEJO DE LA TRANSACCIONABILIDAD
        System.Data.IDbConnection Conexion { get; set; }
        System.Data.IDbTransaction Transaccion { get; set; }
    }
}
