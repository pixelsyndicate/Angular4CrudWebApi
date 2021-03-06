"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
// because i'm using some webapi, need the http module
var http_1 = require("@angular/http");
// because i'm using Forms
var forms_1 = require("@angular/forms");
// my components (html with classes)
var app_component_1 = require("./app.component");
var product_list_component_1 = require("./product/product-list.component");
var product_detail_component_1 = require("./product/product-detail.component");
// services
// because i marked my ProductService as Injectable, i have to import it here.
var product_service_1 = require("./product/product.service");
// router service
var app_routing_module_1 = require("./app-routing.module");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        // imports is for core functionality
        imports: [platform_browser_1.BrowserModule, app_routing_module_1.AppRoutingModule, http_1.HttpModule, forms_1.FormsModule],
        // declarations is for components
        declarations: [app_component_1.AppComponent, product_list_component_1.ProductListComponent, product_detail_component_1.ProductDetailComponent],
        // bootstrap is for what i want initial access to
        bootstrap: [app_component_1.AppComponent],
        // if i want my service to be used, set it here as a provider
        providers: [product_service_1.ProductService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map