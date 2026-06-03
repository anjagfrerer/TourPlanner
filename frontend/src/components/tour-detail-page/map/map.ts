import { Component, AfterViewInit, input } from "@angular/core";
import { MapViewModel } from "./map.vm";
import * as L from 'leaflet';
import { Tour } from "../../../app/models/tour.model";
import { routeInformation } from "../../../app/models/routeInformation.model";

@Component({
    selector: 'map',
    templateUrl: './map.html',
    imports: [],
    providers: [MapViewModel]
})

export class Map implements AfterViewInit{
    routeInformation = input.required<routeInformation>();
    map: L.Map | null = null;

    private readonly ROUTE_COLOR = '#321904'; //brown
    private readonly ROUTE_ZOOM = 15;

    ngAfterViewInit(){
        this.map = L.map('map').setView(this.routeInformation().viewport, this.ROUTE_ZOOM);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

        //Draw markers and route on map
        L.circleMarker(L.latLng(this.routeInformation().startLat,
                                this.routeInformation().startLng), 
                                {color: this.ROUTE_COLOR}).addTo(this.map);

        L.polyline([], {color: this.ROUTE_COLOR}).addTo(this.map);

        L.circleMarker(L.latLng(this.routeInformation().destinationLat,
                                this.routeInformation().destinationLng), 
                                {color: this.ROUTE_COLOR}).addTo(this.map);
    }
}