import {ROUTER_DIRECTIVES} from 'angular2/router';
import { Component, OnInit } from 'angular2/core';

@Component({
    templateUrl: 'app/location/location-search.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class LocationSearchComponent {
    locationName: string;
}