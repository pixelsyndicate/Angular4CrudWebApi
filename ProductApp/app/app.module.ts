import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
// because i'm using some webapi, need the http module
import { HttpModule } from "@angular/http";
// because i'm using Forms
import { FormsModule } from "@angular/forms";

// my components (html with classes)
import { AppComponent } from "./app.component";
import { ProductListComponent } from "./product/product-list.component";
import { ProductDetailComponent } from "./product/product-detail.component";

// services
// because i marked my ProductService as Injectable, i have to import it here.
import { ProductService } from "./product/product.service";

// router service
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
    // imports is for core functionality
    imports: [BrowserModule, AppRoutingModule, HttpModule,  FormsModule],
    // declarations is for components
    declarations: [AppComponent, ProductListComponent, ProductDetailComponent],
    // bootstrap is for what i want initial access to
    bootstrap: [AppComponent],
    // if i want my service to be used, set it here as a provider
    providers: [ProductService]
})
export class AppModule { }
