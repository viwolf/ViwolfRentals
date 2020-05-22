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
    
    public partial class t_Vehiculos
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public t_Vehiculos()
        {
            this.t_Kilometrajes = new HashSet<t_Kilometrajes>();
            this.t_Reservaciones = new HashSet<t_Reservaciones>();
        }
    
        public string IDVehiculo { get; set; }
        public System.DateTime FechaCreacion { get; set; }
        public string UsuarioCreacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public string UsuarioModificacion { get; set; }
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public int Anno { get; set; }
        public bool GPS { get; set; }
        public Nullable<System.DateTime> FechaCompra { get; set; }
        public string NumeroChasis { get; set; }
        public string NumeroMotor { get; set; }
        public string Color { get; set; }
        public string Direccion { get; set; }
        public string Transmision { get; set; }
        public int NumeroCilindros { get; set; }
        public int PesoKg { get; set; }
        public string Carroceria { get; set; }
        public string Traccion { get; set; }
        public int Capacidad { get; set; }
        public int RtvVencimientoAnno { get; set; }
        public string RtvVencimientoMes { get; set; }
        public int MarchamoProximo { get; set; }
        public bool RtvSticker { get; set; }
        public bool RtvPapel { get; set; }
        public bool MarchamoSticker { get; set; }
        public bool MarchamoPapel { get; set; }
        public bool StickerPlaca { get; set; }
        public bool TituloPropiedad { get; set; }
        public decimal Multas { get; set; }
        public int Kilometraje { get; set; }
        public int IDCategoriaVehiculo { get; set; }
        public int IDDepartamento { get; set; }
        public bool Activo { get; set; }
    
        public virtual t_CategoriasVehiculos t_CategoriasVehiculos { get; set; }
        public virtual t_Departamentos t_Departamentos { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<t_Kilometrajes> t_Kilometrajes { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<t_Reservaciones> t_Reservaciones { get; set; }
    }
}
