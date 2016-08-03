import { Component, OnInit, NgZone  } from 'angular2/core';
import {NgClass } from 'angular2/common';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { RouteParams, Router } from 'angular2/router';
import {CurrentWeather} from '../weather/CurrentWeather';
import {Weather} from '../weather/Weather';
import {OpenWeatherService} from './open-weather.service';
import {SearchHistoryService} from './search-history.service';
import {CollapsibleDirective} from '../common/collapsible.directive';
import {Map} from './map.directive';
import {LocationEventService} from './location-event.service';

@Component({
    templateUrl: 'app/location/location-detail.component.html',
    directives: [ROUTER_DIRECTIVES, CollapsibleDirective, Map ],
    providers: [Map]
})
export class LocationDetailComponent implements OnInit {
    locationName: string;
    newLocationName: string;
    currentWeather: CurrentWeather;

    flagIcon: string;

    constructor(private _routeParams: RouteParams,
                private _router: Router,
                private _openWeatherService: OpenWeatherService,
                private _searchHistory: SearchHistoryService,
                private _locationEventService: LocationEventService,
                private _map: Map, // Inject Map only to ensure, this object is created before this component (due to event dependencies)
                private _ngZone: NgZone) {
        this.locationName = this._routeParams.get('name');
        this._locationEventService.locationRequested.subscribe(this.loadLocationDataWithCoordinates.bind(this));
    }

    ngOnInit() : void {
        this._openWeatherService.ByLocationName(this.locationName).subscribe(this.loadCurrentWeather.bind(this));
    }    

    lastSearchNames(): string[] {
        return this._searchHistory.SearchNames.reverse();
    }

    deleteFromHistory(name: string): void {
        this._searchHistory.Delete(name);
    }

    loadLocationDataWithId(id: number): void {
        this._openWeatherService.ById(id).subscribe(this.loadCurrentWeather.bind(this));
    }

    loadLocationDataWithCoordinates(event, latitude : number, longitude : number) : void {
        this._ngZone.run(() => {
            this._openWeatherService.ByCoordinates(event[0], event[1]).subscribe(this.loadCurrentWeather.bind(this));
        });
        
    }    

    loadCurrentWeather(weather: any): void {
            let temp = new CurrentWeather(weather);
            this.locationName = temp.name;
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