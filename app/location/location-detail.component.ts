import { Component, OnInit } from 'angular2/core';
import {NgClass } from 'angular2/common';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { RouteParams, Router } from 'angular2/router';
import {CurrentWeather} from '../weather/CurrentWeather';
import {Weather} from '../weather/Weather';
import {OpenWeatherService} from './open-weather.service';
import {SearchHistoryService} from './search-history.service';

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
                private _router: Router,
                private _openWeatherService: OpenWeatherService,
                private _searchHistory: SearchHistoryService) {
        this.locationName = this._routeParams.get('name');
    }

    ngOnInit() : void {
        this._openWeatherService.ByLocationName(this.locationName).subscribe(weather => {
            this.loadCurrentWeather(weather);
        });
    }    

    lastSearchNames(): string[] {
        return this._searchHistory.SearchNames.reverse();
    }

    deleteFromHistory(name: string): void {
        this._searchHistory.Delete(name);
    }

    loadLocationDataWithId(id: number): void {
        this._openWeatherService.ById(id).subscribe(weather => {
            this.loadCurrentWeather(weather);
        });
    }

    loadCurrentWeather(weather: any): void {
            let temp = new CurrentWeather(weather);
            this.currentWeather = temp;
            this.flagIcon = "flag-icon flag-icon-" + this.currentWeather.country;//weather['sys'].country;

            // Get weather nearby
            this._openWeatherService.ByCoordinatesAround(this.currentWeather.latitude, this.currentWeather.longitude).subscribe(nearby => {
                var nearbyWeathers = nearby.list;  
                for(let nearbyWeather of nearbyWeathers) {
                    var weatherObj = new CurrentWeather(nearbyWeather);
                    this.currentWeather.nearbyWeather.push(weatherObj);                     
                };                  
            });           
    }
}