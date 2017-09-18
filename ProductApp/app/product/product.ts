// create a model that can recieve the json from the webapi
export class Product {
    productId: number;
    productName: string;
    introductionDate: Date;
    price: number;
    url: string;
    summary: string;
    categoryId: number;
}