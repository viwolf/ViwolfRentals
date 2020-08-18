//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ViwolfRental.Common.Model
{
    using System;
    using System.Collections.Generic;
    
    public partial class t_PagosComisiones
    {
        public int IDPagoComision { get; set; }
        public System.DateTime FechaCreacion { get; set; }
        public string UsuarioCreacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public string UsuarioModificacion { get; set; }
        public int IDClienteComisionista { get; set; }
        public int IDContrato { get; set; }
        public decimal PrecioTotal { get; set; }
        public int PorcentajeComision { get; set; }
        public decimal TotalPagar { get; set; }
        public Nullable<System.DateTime> FechaPago { get; set; }
        public Nullable<bool> ComisionPaga { get; set; }
    
        public virtual t_ClientesComisionistas t_ClientesComisionistas { get; set; }
        public virtual t_Contratos t_Contratos { get; set; }
        public IDictionary<string, Object> ExtendedProperties { set; get; }
    }
}
