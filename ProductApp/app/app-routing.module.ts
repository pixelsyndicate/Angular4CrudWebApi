import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from "./product/product-list.component";
import { ProductDetailComponent } from "./product/product-detail.component";

// this 'productList' will be a routerLink attribute in a html anchor link, 
// the component associated with this route path will be injected into the '<router-outlet>' tag
const routes: Routes = [
    { path: "productList", component: ProductListComponent },
    { path: "productDetail/:id", component: ProductDetailComponent }
];

@NgModule({
    // the forRoot() function addes the constant to the singleton instance
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }