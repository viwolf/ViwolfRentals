﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class ViwolfRentalsDBEntities : DbContext
    {
        public ViwolfRentalsDBEntities()
            : base("name=ViwolfRentalsDBEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<t_CategoriasVehiculos> t_CategoriasVehiculos { get; set; }
        public virtual DbSet<t_ClientesComisionistas> t_ClientesComisionistas { get; set; }
        public virtual DbSet<t_Departamentos> t_Departamentos { get; set; }
        public virtual DbSet<t_Kilometrajes> t_Kilometrajes { get; set; }
        public virtual DbSet<t_Modulos> t_Modulos { get; set; }
        public virtual DbSet<t_Pantallas> t_Pantallas { get; set; }
        public virtual DbSet<t_Proveedores> t_Proveedores { get; set; }
        public virtual DbSet<t_Reservaciones> t_Reservaciones { get; set; }
        public virtual DbSet<t_Roles> t_Roles { get; set; }
        public virtual DbSet<t_RolesSistemaModuloPantalla> t_RolesSistemaModuloPantalla { get; set; }
        public virtual DbSet<t_Sistemas> t_Sistemas { get; set; }
        public virtual DbSet<t_Usuarios> t_Usuarios { get; set; }
        public virtual DbSet<t_Vehiculos> t_Vehiculos { get; set; }
    }
}
