using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ViwolfRental.Common.Model;

namespace ViwolfRentals.DataAccess
{
    public interface IFacturacionDetalleRepository
    {
        IEnumerable<t_FacturasDetalles> GuardarDetalleFactura(IEnumerable<t_FacturasDetalles> EnumDetalle);
        //PROPIEDADES PARA EL MANEJO DE LA TRANSACCIONABILIDAD
        System.Data.IDbConnection Conexion { get; set; }
        System.Data.IDbTransaction Transaccion { get; set; }
    }
}
