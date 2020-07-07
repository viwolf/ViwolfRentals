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

        /*************** Pago de comisiones *********************/
        t_PagosComisiones Guardar(t_PagosComisiones model);
        IEnumerable<ViwolfRental.Common.Model.t_PagosComisiones> ListarComisiones(ViwolfRental.Common.Model.t_PagosComisiones entity);
        IEnumerable<t_PagosComisiones> PagarComisiones(IEnumerable<t_PagosComisiones> EnumPagosComisiones, t_PagosComisiones pagosComisiones);


        /******************** Cuentas x Cobrar ***********************/
        IEnumerable<ViwolfRental.Common.Model.t_CuentasxCobrar> ListarCuentasCobrar(ViwolfRental.Common.Model.t_CuentasxCobrar entity);
        t_CuentasxCobrar GuardarCuentasCobrar(t_CuentasxCobrar model);
        IEnumerable<t_CuentasxCobrar> AplicarCuentasCobrar(IEnumerable<t_CuentasxCobrar> EnumPagosComisiones, t_CuentasxCobrar pagosComisiones);

        //PROPIEDADES PARA EL MANEJO DE LA TRANSACCIONABILIDAD
        System.Data.IDbConnection Conexion { get; set; }
        System.Data.IDbTransaction Transaccion { get; set; }
    }
}
