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
    
    public partial class t_CuentasxCobrar
    {
        public int IDCuentaxCobrar { get; set; }
        public System.DateTime FechaCreacion { get; set; }
        public string UsuarioCreacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public string UsuarioModificacion { get; set; }
        public int IdProveedor { get; set; }
        public int IDContrato { get; set; }
        public decimal Total { get; set; }
        public bool CuentaCobrada { get; set; }
    
        public virtual t_Contratos t_Contratos { get; set; }
        public virtual t_Proveedores t_Proveedores { get; set; }
        public IDictionary<string, Object> ExtendedProperties { set; get; }
    }
}