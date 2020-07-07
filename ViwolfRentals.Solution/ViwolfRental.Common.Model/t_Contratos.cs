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
            this.t_CuentasxCobrar = new HashSet<t_CuentasxCobrar>();
            this.t_FacturasDetalles = new HashSet<t_FacturasDetalles>();
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
        public byte[] FrontalVehiculos { get; set; }
        public byte[] TraseraVehiculos { get; set; }
        public byte[] IzquierdaVehiculos { get; set; }
        public byte[] DerechaVehiculos { get; set; }
        public byte[] QuintaVehiculos { get; set; }
        public byte[] SextaVehiculos { get; set; }
        public bool Extendido { get; set; }
        public Nullable<int> Referencia { get; set; }
        public int IDEstadoContrato { get; set; }
        public int IDCodigoContrato { get; set; }
        public Nullable<int> IDUsuario { get; set; }
    
        public virtual t_CodigosContratos t_CodigosContratos { get; set; }
        public virtual t_EstadosContratos t_EstadosContratos { get; set; }
        public virtual t_Reservaciones t_Reservaciones { get; set; }
        public virtual t_ContratosTerminados t_ContratosTerminados { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<t_CuentasxCobrar> t_CuentasxCobrar { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<t_FacturasDetalles> t_FacturasDetalles { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<t_PagosComisiones> t_PagosComisiones { get; set; }
    }
}
