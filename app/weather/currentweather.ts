import { Weather } from './weather'

export class CurrentWeather {
    name : string;
    id : number;
    country: string;
    /*
    longitude : number;
    latitude : number;
    weather : Weather;
    mapoptions :  google.maps.MapOptions;
    */
    nearbyWeather : Array<CurrentWeather>; 

    constructor(object: any) {
        this.nearbyWeather = new Array<CurrentWeather>();
        this.fill(object);
    }

    private fill(object: any): void {
        for (var prop in object) 
        {
            this[prop] = object[prop];
        }
        
        this.country = object.sys.country.toLowerCase();
    }
}