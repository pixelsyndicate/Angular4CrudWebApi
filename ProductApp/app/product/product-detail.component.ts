import { Component, OnInit } from "@angular/core";

// to call the addProduct method in the service class requires ...

// for the id parameter for when we call the update method
import { ActivatedRoute, Params } from "@angular/router";
// to navigate back from the detail page to the list page
import { Location } from "@angular/common";

import { ProductService } from "./product.service";
import { Product } from "./product";

@Component({
    templateUrl: "./product-detail.component.html"
})
export class ProductDetailComponent implements OnInit {

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute,
        private location: Location) { }

    product: Product;
    messages: string[] = [];

    ngOnInit(): void {
        // loops through the route.params array and retrieves a Params object
        this.route.params.forEach((params: Params) => {
            // Check to see if the id parameter is defined on that Params object
            if (params['id'] !== undefined) {
                // If the id value exists, check that value to see if it’s equal to a -1.
                if (params['id'] != "-1") {
                    // else, then it’s a valid product ID
                    this.productService.getProduct(
                            params['id'])
                        .subscribe(product =>
                            this.product = product,
                            errors => this.handleErrors(errors));
                } else {
                    // If so, then you’re adding a product.
                    this.product = new Product();
                    this.product.price = 1;
                    this.product.url = "www.fairwaytech.com";
                }
            }
        });
    }

    goBack() { this.location.back(); }

    private handleErrors(errors: any) {
        this.messages = [];
        for (let msg of errors) {
            this.messages.push(msg);
        }
    }

    updateProduct(product: Product) {
        this.productService.updateProduct(product)
            .subscribe(() => this.goBack(),
                errors => this.handleErrors(errors));
    }

    // responsible for calling the addProduct method in the ProductService class
    private addProduct(product: Product) {
        this.productService.addProduct(product)
            .subscribe(() => this.goBack(),
            errors => this.handleErrors(errors));
    }

    saveProduct() {
        if (this.product) {
            if (this.product.productId) {
                this.updateProduct(this.product);
            }
            else {
                this.addProduct(this.product);
            }
        }
    }
}