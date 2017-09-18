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
// need to use routing, because have a clickable link for add()
var router_1 = require("@angular/router");
var product_service_1 = require("./product.service");
// THIS IS THE 'CODE BEHIND' FOR THE PRODUCT-LIST.COMPONENT.HTML
var ProductListComponent = (function () {
    function ProductListComponent(productService, router) {
        this.productService = productService;
        this.router = router;
        this.pageTitle = "Product List"; // a parameter value in the html as {{pageTitle}}
        // public properties
        this.products = [];
        this.messages = [];
    }
    // an implementation for the 'implements' declaration
    ProductListComponent.prototype.ngOnInit = function () { this.getProducts(); };
    ProductListComponent.prototype.add = function () { this.router.navigate(["/productDetail", -1]); };
    ProductListComponent.prototype.selectProduct = function (id) {
        this.router.navigate(["/productDetail", id]);
    };
    ProductListComponent.prototype.deleteProduct = function (id) {
        var _this = this;
        if (confirm("Delete this product?")) {
            this.productService.deleteProduct(id)
                .subscribe(function () { return _this.getProducts(); }, function (errors) { return _this.handleErrors(errors); });
        }
    };
    ProductListComponent.prototype.getProducts = function () {
        var _this = this;
        this.productService.getProducts()
            .subscribe(function (products) { return _this.products = products; }, function (errors) { return _this.handleErrors(errors); });
    };
    ProductListComponent.prototype.handleErrors = function (errors) {
        for (var _i = 0, errors_1 = errors; _i < errors_1.length; _i++) {
            var msg = errors_1[_i];
            this.messages.push(msg);
        }
    };
    return ProductListComponent;
}());
ProductListComponent = __decorate([
    core_1.Component({ moduleId: module.id, templateUrl: "./product-list.component.html" }),
    __metadata("design:paramtypes", [product_service_1.ProductService, router_1.Router])
], ProductListComponent);
exports.ProductListComponent = ProductListComponent;
//# sourceMappingURL=product-list.component.js.map