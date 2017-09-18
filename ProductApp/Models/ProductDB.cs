namespace ProductApp.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class ProductDB : DbContext
    {
        public ProductDB() : base("name=ProductDB")
        {

            Configuration.ProxyCreationEnabled = false;

            // initialize the database thorugh EF
            System.Data.Entity.Database.SetInitializer(new ProductDatabaseInitializer());
        }

        public virtual DbSet<Product> Products { get; set; }

        
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>() // if you changed PRICE to Bool, then this will not work anymore
                .Property(e => e.Price)
                .HasPrecision(19, 4);
        }
    }


}
