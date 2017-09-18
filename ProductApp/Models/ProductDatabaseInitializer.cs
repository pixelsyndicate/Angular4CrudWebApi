using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;

namespace ProductApp.Models
{
    public class ProductDatabaseInitializer : DropCreateDatabaseIfModelChanges<ProductDB>
    {
        protected override void Seed(ProductDB context)
        {
            base.Seed(context);

            var questions = new List<Product>
            {
                new Product
                {
                    ProductName = "Seed Monkey",
                    IntroductionDate = DateTime.Parse("1969/05/25").Date,
                    Price = (decimal) 0.99,
                    Url = "http://www.pixelsyndicate.com/projects/",
                    Summary = "This is a seeded record",
                }
            };

            questions.ForEach(a => context.Products.AddOrUpdate(a));

            context.SaveChanges();
        }
    }
}