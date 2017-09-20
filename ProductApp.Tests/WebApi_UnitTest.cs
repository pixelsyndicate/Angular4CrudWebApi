using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProductApp.Controllers;
using ProductApp.Models;

namespace ProductApp.Tests
{
    [TestClass]
    public class WebApi_UnitTest
    {
        [TestMethod]
        public void Can_I_Get_Not_Found()
        {
            // Arrange

            ProductController controller = new ProductController()
            {
                Request = new HttpRequestMessage(HttpMethod.Get, "UnitTest/Uri"),
                Configuration = new HttpConfiguration(),
            };

            // Act
            IHttpActionResult result = controller.Get(999);// as OkNegotiatedContentResult<TransformJobDto>;

            // Assert
            // get OK response?
            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
            var resultContent = result as NotFoundResult;

            // get object in OK response?
            Assert.IsNotNull(resultContent);

        }

        [TestMethod]
        public void Can_I_Get_OK_with_Products()
        {
            // Arrange

            ProductController controller = new ProductController()
            {
                Request = new HttpRequestMessage(HttpMethod.Get, "UnitTest/Uri"),
                Configuration = new HttpConfiguration(),
            };

            // Act
            IHttpActionResult result = controller.Get();// as OkNegotiatedContentResult<TransformJobDto>;

            // Assert
            // get OK response?
            Assert.IsInstanceOfType(result, typeof(OkNegotiatedContentResult<IEnumerable<Product>>));
            var resultContent = result as OkNegotiatedContentResult<IEnumerable<Product>>;

            // get object in OK response?
            Assert.IsNotNull(resultContent.Content);
            var resultJob = resultContent.Content;

            // is object in OK response a collection of jobs?
            Assert.IsInstanceOfType(resultJob, typeof(IEnumerable<Product>));
            Assert.IsTrue(resultJob.Any());



            Debug.WriteLine($"got back {resultJob.Count()} products...");


        }


        [TestMethod]
        public void Can_I_Get_OK_with_Single_Product()
        {
            // Arrange

            ProductController controller = new ProductController()
            {
                Request = new HttpRequestMessage(HttpMethod.Get, "UnitTest/Uri"),
                Configuration = new HttpConfiguration(),
            };

            // Act
            IHttpActionResult result = controller.Get();// as OkNegotiatedContentResult<TransformJobDto>;

            // Assert
            // get OK response?
            Assert.IsInstanceOfType(result, typeof(OkNegotiatedContentResult<IEnumerable<Product>>));
            var resultContent = result as OkNegotiatedContentResult<IEnumerable<Product>>;

            // get object in OK response?
            Assert.IsNotNull(resultContent.Content);
            var resultJob = resultContent.Content;

            var lastRec = resultJob.LastOrDefault();
            var singleResult = controller.Get(lastRec.ProductId);
            var singleResultContent = singleResult as OkNegotiatedContentResult<Product>;
            Assert.IsNotNull(singleResultContent);
            // is object in OK response a single Product?
            Assert.IsInstanceOfType(singleResultContent.Content, typeof(Product));
            Assert.AreEqual(singleResultContent.Content.ProductId, lastRec.ProductId, "Wasn't able to get the last product specifically");

        }

        [TestMethod]
        public void Can_I_Get_INSERT_NEW_RECORD()
        {

            // Arrange
            var newProd = new Product() { IntroductionDate = DateTime.Today, Price = new decimal(0.89), Url = "http://www.dubdubdub.com",ProductName = "Unit Test Product", Summary = "This is throw-away product during testing. Should be deleted by another test." };
            ProductController controller = new ProductController()
            {
                Request = new HttpRequestMessage(HttpMethod.Post, "UnitTest/Uri"),
                Configuration = new HttpConfiguration(),
            };

            // Act
            IHttpActionResult result = controller.Post(newProd); // Created<Product>

            // Assert
            // get OK response?
            Assert.IsInstanceOfType(result, typeof(CreatedNegotiatedContentResult<Product>));
            var resultContent = result as CreatedNegotiatedContentResult<Product>;

            Assert.IsNotNull(resultContent);
            // is object in OK response a single Product?
            Assert.IsInstanceOfType(resultContent.Content, typeof(Product));
            Assert.AreEqual(resultContent.Content.ProductName, "Unit Test Product", "Wasn't able to insert product specifically");

        }


        [TestMethod]
        public void Can_I_Get_DELETE_TEST_RECORD()
        {
            // Arrange
            var newProd = new Product() { IntroductionDate = DateTime.Today, Price = new decimal(0.89), ProductName = "Unit Test Product", Summary = "This is throw-away product during testing. Should be deleted by another test." };

            // get the product to delete
            ProductController gcontroller = new ProductController()
            {
                Request = new HttpRequestMessage(HttpMethod.Get, "UnitTest/Uri"),
                Configuration = new HttpConfiguration(),
            };

            // Act
            IHttpActionResult gresult = gcontroller.Get();// as OkNegotiatedContentResult<TransformJobDto>;

            // Assert
            // get OK response?
            Assert.IsInstanceOfType(gresult, typeof(OkNegotiatedContentResult<IEnumerable<Product>>));
            var gresultContent = gresult as OkNegotiatedContentResult<IEnumerable<Product>>;

            // get object in OK response?
            Assert.IsNotNull(gresultContent.Content);
            var toDelete = gresultContent.Content.FirstOrDefault(x => x.ProductName == "Unit Test Product");
            Assert.IsNotNull(toDelete);


            ProductController controller = new ProductController()
            {
                Request = new HttpRequestMessage(HttpMethod.Delete, "UnitTest/Uri"),
                Configuration = new HttpConfiguration(),
            };

            // Act
            IHttpActionResult result = controller.Delete(toDelete.ProductId); // Created<Product>

            // Assert
            // get OK response?
            Assert.IsInstanceOfType(result, typeof(OkNegotiatedContentResult<Product>));
            var resultContent = result as OkNegotiatedContentResult<Product>;

            Assert.IsNotNull(resultContent);
            // is object in OK response a single Product?
            Assert.IsInstanceOfType(resultContent.Content, typeof(Product));
            Assert.AreEqual(resultContent.Content.ProductName, newProd.ProductName, "Wasn't able to delete product specifically");

        }

    }
}