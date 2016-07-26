import { Injectable } from 'angular2/core';
import { IProduct } from './product';
import { Http, Response} from 'angular2/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductDataService {
    private _productUrl = 'api/products/products.json';

    constructor(private _http: Http) {

    }

    getProducts(): Observable<IProduct[]> {
        return this._http.get(this._productUrl)
                    .map(response => <IProduct[]>response.json())
                    .do(response => console.log(JSON.stringify(response)))
                    .catch(this.handlerErrors);      
    }

    handlerErrors(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'server error');
    }
}