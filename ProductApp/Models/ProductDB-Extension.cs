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

            return list;
        }
    }

}