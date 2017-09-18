// the product serice will call the webapi for product collections
import { Injectable } from "@angular/core";

// Headers and RequestOptions is required to set content-type as application/json in the POST
import { Http, Response, Headers, RequestOptions } from "@angular/http";

// rxjs is Reactive-Extensions (https://github.com/Reactive-Extensions/rxjs)
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

// my DTO to be used to hold data
import { Product } from "./product";


// heres my typescript class for the serivce.
// @Injectable() means it can be injected into any constructor of any component
@Injectable()
export class ProductService {

    private url = "api/product";

    // angular injects the HTTP service into this service
    constructor(private http: Http) { }

    // this creates a promise using the toPromise extension function. 
    // if the data is retreived, the THEN function is called and passed a reference to the extractData function
    // the extractData() function isn't needed, but gives me a place to set breakpoints
    getProducts(): Observable<Product[]> {
        // will return results of the GET
        return this.http.get(this.url)
            // not needed, but lets me look at the json
            .map(this.extractData)
            // populate a collection of errors so i can see it in the console
            .catch(this.handleError);
    }


    addProduct(product: Product): Observable<Product> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.url, product, options).map(this.extractData).catch(this.handleError);
    }

    getProduct(id: number): Observable<Product> {
        let url = this.url + "/" + id;
        return this.http.get(url)
            .map(response => response.json() as Product)
            .catch(this.handleError);
    }

    updateProduct(product: Product): Observable<Product> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.url + "/" + product.productId, product, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteProduct(id: number): Observable<Product> {
        return this.http.delete(this.url + "/" + id)
            .map(() => null)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    };

    private handleError(error: any): Observable<any> {

        let errors: string[] = [];

        switch (error.status) {

            case 400: // Model State Error
                let valErrors = error.json().modelState;
                for (var key in valErrors)
                    for (var i = 0; i < valErrors[key].length; i++)
                        errors.push(valErrors[key][i]);
                break;

            case 404:
                errors.push("No product data is available");
                break;

            case 500:
                errors.push(error.json().exeptionMessage);
                break;

            default:
                errors.push("Status: " + error.status + " - Error Message: " + error.statusText);
                break;
        }

        console.error("An error occurred", errors);

        return Observable.throw(errors);
    };
}

