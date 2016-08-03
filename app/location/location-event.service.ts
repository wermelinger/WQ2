import {EventEmitter, Injectable} from 'angular2/core';

import {CurrentWeather} from '../weather/CurrentWeather';

@Injectable()
export class LocationEventService {
    
        locationFetched = new EventEmitter<CurrentWeather>();
        locationRequested = new EventEmitter<Number[]>();

		NotifyNewLocationFetched(weather : CurrentWeather) {
			this.locationFetched.emit(weather);
		}

		NotifyNewLocationRequested(latitude : number, longitude : number) {
            this.locationRequested.emit([latitude, longitude]);
		}
	}