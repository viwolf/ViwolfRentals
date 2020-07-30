using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ViwolfRental.Common.Model;

namespace ViwolfRentals.DataAccess.Interface
{
    public interface IGastoRepository
    {
        t_Gastos GuardarGasto(t_Gastos entidad);


        //PROPIEDADES PARA EL MANEJO DE LA TRANSACCIONABILIDAD
        System.Data.IDbConnection Conexion { get; set; }
        System.Data.IDbTransaction Transaccion { get; set; }
    }
}
