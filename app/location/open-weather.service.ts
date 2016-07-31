import {CurrentWeather} from '../weather/CurrentWeather';
import {SearchHistoryService} from './search-history.service';
import { Injectable } from 'angular2/core';
import { Http, Response} from 'angular2/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OpenWeatherService {
    private apiKey = "15185ba4fcaa79b6600788874db6ca0a";

    // TODO SW: using typed objects with interface instead of any.
    constructor(private _http: Http, 
                private _searchHistoryService: SearchHistoryService) {

    }

    /**
     * Gets the current weather by location name.
     */
    ByLocationName(locationName: string) : Observable<any> {
        return this.getCurrentWeather("http://api.openweathermap.org/data/2.5/weather?q=" + locationName + "&APPID=" + this.apiKey);
    }

    /**
     * Gets the current weather by specific id.
     */
    ById(id: number) : Observable<any> {
        return this.getCurrentWeather("http://api.openweathermap.org/data/2.5/weather?id=" + id + "&APPID=" + this.apiKey);
    }    

    /**
     * Gets the current weather by coordinates.
     */
    ByCoordinates(latitude: number, longitude: number) : Observable<any> {
        return this.getCurrentWeather("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=" + this.apiKey);
    }    

    /**
     * Gets the current weather by coordinates.
     */
    ByCoordinatesAround(latitude: number, longitude: number) : Observable<any> {
        return this.getCurrentWeather("http://api.openweathermap.org/data/2.5/find?lat=" + latitude + "&lon=" + longitude + "&cnt=10&APPID=" + this.apiKey);
    }     
    
    private getCurrentWeather(resourceUri : string) : Observable<any> {
        return this._http.get(resourceUri)
                   .map(response => response.json())
                   .do(response => this._searchHistoryService.AddSearch(response.name))
                   .catch(this.handleErrors);
    } 

    private handleErrors(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error);
    }  
}