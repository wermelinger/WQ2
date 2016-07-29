import {CurrentWeather} from '../weather/CurrentWeather';
import { Injectable } from 'angular2/core';
import { Http, Response} from 'angular2/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OpenWeatherService {
    private apiKey = "15185ba4fcaa79b6600788874db6ca0a";

    // TODO SW: using typed objects with interface instead of any.
    constructor(private _http: Http) {

    }

    /**
     * Gets the current weather by location name.
     */
    ByLocationName(locationName: string) : Observable<any> {
        return this.getCurrentWeather("http://api.openweathermap.org/data/2.5/weather?q=" + locationName + "&APPID=" + this.apiKey)
    }
    
    private getCurrentWeather(resourceUri : string) : Observable<any> {
        return this._http.get(resourceUri)
                   .map(response => response.json())
                   .catch(this.handleErrors);
    }      

    private handleErrors(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error);
    }  
}