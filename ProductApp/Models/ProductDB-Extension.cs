using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Linq;
using System.Web;

namespace ProductApp.Models
{
    public partial class ProductDB
    {
        protected override DbEntityValidationResult ValidateEntity(DbEntityEntry entityEntry, IDictionary<object, object> items)
        {
            List<DbValidationError> list = new List<DbValidationError>();

            if (entityEntry.Entity is Product)
            {
                Product entity = entityEntry.Entity as Product;
                list = ValidateProduct(entity);

                if (list.Count > 0)
                    return new DbEntityValidationResult(entityEntry, list);
            }

            return base.ValidateEntity(entityEntry, items);
        }

        protected List<DbValidationError> ValidateProduct(Product entity)
        {
            List<DbValidationError> list = new List<DbValidationError>();

            // Check ProductName field
            if (string.IsNullOrEmpty(entity.ProductName))
            {
                list.Add(new DbValidationError("ProductName", "Product Name must be filled in."));
            }
            else
            {
                if (entity.ProductName.ToLower() == entity.ProductName)
                {
                    list.Add(new DbValidationError("ProductName", "Product Name must not be all lower case."));
                }
                if (entity.ProductName.Length < 4 || entity.ProductName.Length > 150)
                {
                    list.Add(new DbValidationError("ProductName", "Product Name must have between 4 and 150 characters."));
                }
            }

            // Check IntroductionDate field
            if (entity.IntroductionDate < DateTime.Now.AddYears(-5))
            {
                list.Add(new DbValidationError("IntroductionDate", "Introduction date must be within the last five years."));
            }

            // Check Price field
            if (entity.Price <= Convert.ToDecimal(0) ||
                entity.Price > Convert.ToDecimal(9999.99))
            {
                list.Add(new DbValidationError("Price", "Price must be greater than $0 and less than $10, 000."));
            }

            // Check Url field
            if (string.IsNullOrEmpty(entity.Url))
            {
                list.Add(new DbValidationError("Url", "Url must be filled in."));
            }
            else
            {
                if (entity.Url.Length < 5 || entity.Url.Length > 255)
                {
                    list.Add(new DbValidationError("Url", "Url must be between 5 and 255 characters."));
                }
            }

            return list;
        }
    }

}