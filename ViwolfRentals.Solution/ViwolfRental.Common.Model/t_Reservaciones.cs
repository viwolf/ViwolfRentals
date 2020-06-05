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
    
    public partial class t_Reservaciones
    {
        public int IdReservacion { get; set; }
        public System.DateTime FechaCreacion { get; set; }
        public string UsuarioCreacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public string UsuarioModificacion { get; set; }
        public string NombreCliente { get; set; }
        public string LugarEntrega { get; set; }
        public Nullable<bool> AplicaComision { get; set; }
        public Nullable<System.DateTime> FechaInicio { get; set; }
        public string HoraInicio { get; set; }
        public Nullable<System.DateTime> FechaEntrega { get; set; }
        public string HoraEntrega { get; set; }
        public Nullable<bool> SurfRacks { get; set; }
        public Nullable<decimal> MontoSurfRacks { get; set; }
        public Nullable<bool> Cajon { get; set; }
        public Nullable<decimal> MontoDia { get; set; }
        public Nullable<decimal> MontoTotal { get; set; }
        public string NumeroDeposito { get; set; }
        public Nullable<decimal> MontoDeposito { get; set; }
        public Nullable<decimal> SaldoActual { get; set; }
        public Nullable<int> ModoPago { get; set; }
        public Nullable<int> IdClienteComisionista { get; set; }
        public Nullable<int> IdProveedor { get; set; }
        public Nullable<int> IDUsuario { get; set; }
        public string IDVehiculo { get; set; }
        public Nullable<bool> Activo { get; set; }
    
        public virtual t_ClientesComisionistas t_ClientesComisionistas { get; set; }
        public virtual t_Proveedores t_Proveedores { get; set; }
        public virtual t_Usuarios t_Usuarios { get; set; }
        public virtual t_Vehiculos t_Vehiculos { get; set; }
    }
}
