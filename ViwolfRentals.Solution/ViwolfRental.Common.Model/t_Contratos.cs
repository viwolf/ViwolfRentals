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
    
    public partial class t_Contratos
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public t_Contratos()
        {
            this.t_PagosComisiones = new HashSet<t_PagosComisiones>();
        }
    
        public int IDContrato { get; set; }
        public int IDReservacion { get; set; }
        public string NumeroContrato { get; set; }
        public decimal TotalContrato { get; set; }
        public string UsuarioCreacion { get; set; }
        public System.DateTime FechaCreacion { get; set; }
        public string UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public byte[] VoucherDeposito { get; set; }
        public byte[] VoucherPago { get; set; }
        public byte[] Pasaporte { get; set; }
        public byte[] Licencia { get; set; }
        public byte[] PrimeraVehiculos { get; set; }
        public byte[] SegundaVehiculos { get; set; }
        public byte[] TerceraVehiculos { get; set; }
        public byte[] CuartaVehiculos { get; set; }
        public byte[] QuintaVehiculos { get; set; }
        public byte[] SextaVehiculos { get; set; }
        public int IDEstadoContrato { get; set; }
        public int IDCodigoContrato { get; set; }
    
        public virtual t_CodigosContratos t_CodigosContratos { get; set; }
        public virtual t_EstadosContratos t_EstadosContratos { get; set; }
        public virtual t_Reservaciones t_Reservaciones { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<t_PagosComisiones> t_PagosComisiones { get; set; }
    }
}
