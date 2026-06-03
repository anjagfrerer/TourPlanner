import { Component, AfterViewInit, input } from "@angular/core";
import { MapViewModel } from "./map.vm";
import * as L from 'leaflet';
import { Tour } from "../../../app/models/tour.model";

@Component({
    selector: 'map',
    templateUrl: './map.html',
    imports: [],
    providers: [MapViewModel]
})

export class Map implements AfterViewInit{
    tour = input.required<Tour | null>();
    map: L.Map | null = null;

    private readonly ROUTE_COLOR = '#321904'; //brown
    
    ngAfterViewInit(){
        //console.log(this.tour()?.routeInformation);
        this.map = L.map('map').setView([51.505, -0.09], 23);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

        //Draw markers and route on map
        L.circleMarker(L.latLng(51.505, -0.09), {color: this.ROUTE_COLOR}).addTo(this.map);
        L.polyline([], {color: this.ROUTE_COLOR}).addTo(this.map);
        L.circleMarker(L.latLng(51.505, -0.09), {color: this.ROUTE_COLOR}).addTo(this.map);
    }
}