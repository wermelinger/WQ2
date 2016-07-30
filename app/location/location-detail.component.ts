import { Component, OnInit } from 'angular2/core';
import {NgClass } from 'angular2/common';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { RouteParams, Router } from 'angular2/router';
import {CurrentWeather} from '../weather/CurrentWeather';
import {Weather} from '../weather/Weather';
import {OpenWeatherService} from './open-weather.service';

@Component({
    templateUrl: 'app/location/location-detail.component.html',
    directives: [ROUTER_DIRECTIVES ]
})
export class LocationDetailComponent implements OnInit {
    locationName: string;
    newLocationName: string;
    currentWeather: CurrentWeather;

    flagIcon: string;

    constructor(private _routeParams: RouteParams,
                private _openWeatherService: OpenWeatherService) {
        this.locationName = this._routeParams.get('name');
    }

    ngOnInit() : void {
        this._openWeatherService.ByLocationName(this.locationName).subscribe(weather => {
            let temp = new CurrentWeather(weather);
            this.currentWeather = temp;
            this.flagIcon = "flag-icon flag-icon-" + this.currentWeather.country;//weather['sys'].country;
        });
    }    
}