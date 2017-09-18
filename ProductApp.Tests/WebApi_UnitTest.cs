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


    }
}