import {Component} from 'angular2/core';
import {ProductListComponent} from './products/product-list.component';
import {ProductDetailComponent} from './products/product-detail.component';
import {ProductDataService} from './products/product.service'
import {OpenWeatherService} from './location/open-weather.service';
import {WelcomeComponent} from './home/welcome.component'
import {LocationSearchComponent} from './location/location-search.component';
import {LocationDetailComponent} from './location/location-detail.component';
import {SearchHistoryService} from './location/search-history.service';
import {HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx'; // only load library
import {ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'pm-app',
    template: `<div>
        <nav class='navbar navbar-default'>
            <div class='container-fluid'>
                <a class='navbar-brand'>{{pageTitle}}</a>
                <ul class='nav navbar-nav'>
                    <li><a [routerLink]="['Welcome']">Home</a></li>
                    <li><a [routerLink]="['Products']">Product list</a></li>
                    <li><a [routerLink]="['Search']">Search location</a></li>
                </ul>
            </div>
        </nav>
        <div class='container'>
            <router-outlet></router-outlet>
        </div>

    </div>`,
    directives: [  ROUTER_DIRECTIVES ],
    providers: [ ProductDataService, OpenWeatherService, HTTP_PROVIDERS, ROUTER_PROVIDERS, SearchHistoryService ]
})
@RouteConfig([
    { path: '/welcome', name: 'Welcome', component: WelcomeComponent, useAsDefault: true },
    { path: '/products', name: 'Products', component: ProductListComponent },
    { path: '/product/:id', name: 'ProductDetail', component: ProductDetailComponent },
    { path: '/search', name: 'Search', component: LocationSearchComponent },
    { path: '/location/:name', name: 'Location', component: LocationDetailComponent }
])
export class AppComponent {
    pageTitle : string = 'Product management'
}