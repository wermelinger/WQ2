import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { IProduct } from './product'
import { ProductFilterPipe } from './product-filter.pipe';
import { StarComponent } from '../shared/star.component';
import { ProductDataService } from './product.service';

@Component({
    templateUrl: 'app/products/product-list.component.html',
    styleUrls: [ 'app/products/product-list.component.css'],
    pipes: [ ProductFilterPipe ],
    directives: [ StarComponent, ROUTER_DIRECTIVES ]
})
export class ProductListComponent implements OnInit {
    pageTitle : string = 'Product List';
    imageWidth : number = 50;
    imageMargin: number = 2;
    showImage : boolean = false;
    listFilter : string = '';
    products: IProduct[] = [];
    errorMessage: string = '';

    constructor(private _dataService: ProductDataService) {

    }

    toggleImage() : void {
        this.showImage = !this.showImage;
    }

    ngOnInit() : void {
        console.log('init product-list');
        this._dataService.getProducts().subscribe(products => this.products = products, error => this.errorMessage = <any>error);
    }

    onNotify(message: string): void {
        alert(message);
    }
}