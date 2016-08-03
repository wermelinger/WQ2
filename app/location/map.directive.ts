import {Component, Input} from 'angular2/core';
import {LocationEventService} from './location-event.service';
import {CurrentWeather} from '../Weather/CurrentWeather';

@Component({
    selector: "map",
    template: "<div id='" + Map.mapId + "' style='height:{{height}}px;'></div>"
})
export class Map {
    private static mapId = "mapElement";

    @Input() height: number = 20;

    constructor(private _locationEventService: LocationEventService) {
        this._locationEventService.locationFetched.subscribe(weather => {
					var elementForMap = document.getElementById(Map.mapId);
					
					var opts: google.maps.MapOptions = {
						center: new google.maps.LatLng(weather.latitude, weather.longitude),
						mapTypeId: google.maps.MapTypeId.ROADMAP,
						zoom: 8
					};
		
					var map = new google.maps.Map(elementForMap, opts);
					var marker = new google.maps.Marker(
					{
						position: new google.maps.LatLng(weather.latitude, weather.longitude),
						map: map,
						draggable:true,
						title: weather.name
					});
					
					// Enable moving the marker
                    google.maps.event.addListener(marker, "dragend", this.onDragged);
        });
    }

    private onDragged(mouseEvent : google.maps.MouseEvent) {
        this._locationEventService.NotifyNewLocationRequested(mouseEvent.latLng.lat(), mouseEvent.latLng.lng());
    }
}