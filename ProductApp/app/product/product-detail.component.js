"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// to call the addProduct method in the service class requires ...
// for the id parameter for when we call the update method
var router_1 = require("@angular/router");
// to navigate back from the detail page to the list page
var common_1 = require("@angular/common");
var product_service_1 = require("./product.service");
var product_1 = require("./product");
var ProductDetailComponent = (function () {
    function ProductDetailComponent(productService, route, location) {
        this.productService = productService;
        this.route = route;
        this.location = location;
        this.messages = [];
    }
    ProductDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        // loops through the route.params array and retrieves a Params object
        this.route.params.forEach(function (params) {
            // Check to see if the id parameter is defined on that Params object
            if (params['id'] !== undefined) {
                // If the id value exists, check that value to see if it’s equal to a -1.
                if (params['id'] != "-1") {
                    // else, then it’s a valid product ID
                    _this.productService.getProduct(params['id'])
                        .subscribe(function (product) {
                        return _this.product = product;
                    }, function (errors) { return _this.handleErrors(errors); });
                }
                else {
                    // If so, then you’re adding a product.
                    _this.product = new product_1.Product();
                    _this.product.price = 1;
                    _this.product.url = "www.fairwaytech.com";
                }
            }
        });
    };
    ProductDetailComponent.prototype.goBack = function () { this.location.back(); };
    ProductDetailComponent.prototype.handleErrors = function (errors) {
        this.messages = [];
        for (var _i = 0, errors_1 = errors; _i < errors_1.length; _i++) {
            var msg = errors_1[_i];
            this.messages.push(msg);
        }
    };
    ProductDetailComponent.prototype.updateProduct = function (product) {
        var _this = this;
        this.productService.updateProduct(product)
            .subscribe(function () { return _this.goBack(); }, function (errors) { return _this.handleErrors(errors); });
    };
    // responsible for calling the addProduct method in the ProductService class
    ProductDetailComponent.prototype.addProduct = function (product) {
        var _this = this;
        this.productService.addProduct(product)
            .subscribe(function () { return _this.goBack(); }, function (errors) { return _this.handleErrors(errors); });
    };
    ProductDetailComponent.prototype.saveProduct = function () {
        if (this.product) {
            if (this.product.productId) {
                this.updateProduct(this.product);
            }
            else {
                this.addProduct(this.product);
            }
        }
    };
    return ProductDetailComponent;
}());
ProductDetailComponent = __decorate([
    core_1.Component({
        templateUrl: "./product-detail.component.html"
    }),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        router_1.ActivatedRoute,
        common_1.Location])
], ProductDetailComponent);
exports.ProductDetailComponent = ProductDetailComponent;
//# sourceMappingURL=product-detail.component.js.map