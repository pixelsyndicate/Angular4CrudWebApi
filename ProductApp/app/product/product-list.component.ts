import { Component } from "@angular/core";
import { OnInit } from "@angular/core";

// need to use routing, because have a clickable link for add()
import { Router } from "@angular/router";

import { Product } from "./product";
import { ProductService } from "./product.service";

// THIS IS THE 'CODE BEHIND' FOR THE PRODUCT-LIST.COMPONENT.HTML
@Component({ moduleId: module.id, templateUrl: "./product-list.component.html" })
export class ProductListComponent implements OnInit {

    constructor(private productService: ProductService, private router: Router) { }

    pageTitle = "Product List"; // a parameter value in the html as {{pageTitle}}

    // an implementation for the 'implements' declaration
    ngOnInit(): void { this.getProducts(); }

    // public properties
    products: Product[] = [];
    messages: string[] = [];

    add() { this.router.navigate(["/productDetail", -1]); }

    selectProduct(id: number) {
        this.router.navigate(["/productDetail", id]);
    }

    deleteProduct(id: number) {
        if (confirm("Delete this product?")) {
            this.productService.deleteProduct(id)
                .subscribe(() => this.getProducts(),
                    errors => this.handleErrors(errors));
        }
    }

    private getProducts(): void {
        this.productService.getProducts()
            .subscribe(products => this.products = products,
            errors => this.handleErrors(errors));
    }

    private handleErrors(errors: any): void {
        for (let msg of errors) {
            this.messages.push(msg);
        }
    }
}