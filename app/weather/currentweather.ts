import { Weather } from './weather'

export class CurrentWeather {
    name : string;
    id : number;
    country: string;
    longitude : number;
    latitude : number;
    weather : Weather;
    mapoptions :  google.maps.MapOptions;
    nearbyWeather : Array<CurrentWeather>; 

    constructor(object: any) {
        this.nearbyWeather = new Array<CurrentWeather>();
        this.fill(object);
    }

    private fill(data: any): void {
        /*
        for (var prop in object) 
        {
            this[prop] = object[prop];
        }
        */

        this.name = data.name;
        this.id = data.id;
        this.longitude = data.coord.lon;
        this.latitude = data.coord.lat;
        this.country = data.sys.country.toLowerCase();
        this.weather = new Weather(data);
    }
}