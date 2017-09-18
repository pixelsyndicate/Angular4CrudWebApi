using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using ProductApp.Models;

namespace ProductApp.Controllers
{
    public class ProductController : ApiController
    {
        [HttpGet]
        public IHttpActionResult Get()
        {
            IHttpActionResult ret;
            ProductDB db = new ProductDB();

            if (db.Products.Any())
            {
                ret = Ok(db.Products);
            }
            else
            {
                ret = NotFound();
            }
            return ret;
        }

        [HttpGet]
        public IHttpActionResult Get(int id)
        {
            IHttpActionResult ret;
            ProductDB db = new ProductDB();
            Product product = new Product();

            product = db.Products.Find(id);
            if (product != null)
            {
                ret = Ok(product);
            }
            else
            {
                ret = NotFound();
            }

            return ret;
        }

        [HttpPost]
        public IHttpActionResult Post(Product product)
        {
            IHttpActionResult ret = null;
            ProductDB db = null;

            try
            {
                db = new ProductDB();

                // insert new entity
                db.Products.Add(product);
                db.SaveChanges();

                ret = Created<Product>(Request.RequestUri + product.ProductId.ToString(), product);
            }
            catch (DbEntityValidationException ex)
            {
                ret = BadRequest(
                    ValidationErrorsToMessages(ex));
            }
            catch (Exception ex)
            {
                ret = InternalServerError(ex);
            }

            return ret;
        }

        [HttpPut()]
        public IHttpActionResult Put(int id, Product product)
        {
            IHttpActionResult ret = null;
            ProductDB db = null;

            try
            {
                db = new ProductDB();

                // update the entity
                db.Entry(product).State = EntityState.Modified;
                db.SaveChanges();

                ret = Ok(product);
            }
            catch (DbEntityValidationException ex)
            {
                ret = BadRequest(ValidationErrorsToMessages(ex));
            }
            catch (Exception ex)
            {
                ret = InternalServerError(ex);
            }

            return ret;
        }

        [HttpDelete()]
        public IHttpActionResult Delete(int id) {
            IHttpActionResult ret = null;
            ProductDB db = null;

            try
            {
                db = new ProductDB();

                // get the product
                Product product = db.Products.Find(id);

                // delete the product
                db.Products.Remove(product);
                db.SaveChanges();

                ret = Ok(product);
            }
            catch (Exception ex)
            {
                ret = InternalServerError(ex);
            }

            return ret;
        }

        protected ModelStateDictionary ValidationErrorsToMessages(DbEntityValidationException ex)
        {
            ModelStateDictionary ret = new ModelStateDictionary();

            foreach (DbEntityValidationResult result in ex.EntityValidationErrors)
            {
                foreach (DbValidationError item in result.ValidationErrors)
                {
                    ret.AddModelError(item.PropertyName, item.ErrorMessage);
                }
            }
            return ret;
        }
    }
}