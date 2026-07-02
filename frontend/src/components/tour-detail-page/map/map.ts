import { Component, AfterViewInit, ElementRef, inject, input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MapViewModel } from "./map.vm";
import * as L from 'leaflet';
import { RouteInformation } from "../../../app/models/routeInformation.model";

@Component({
    selector: 'map',
    templateUrl: './map.html',
    imports: [],
    providers: [MapViewModel]
})

export class Map implements OnInit, AfterViewInit, OnDestroy{
    @ViewChild('mapContainer', { static: true }) private mapContainer!: ElementRef<HTMLElement>;

    routeInformation = input.required<RouteInformation>();
    private readonly vm = inject(MapViewModel);

    private map: L.Map | null = null;

    ngOnInit(): void {
        this.vm.setRoute(this.routeInformation());
    }

    ngAfterViewInit(): void {
        const start = this.vm.start();
        const end = this.vm.end();
        const routeLine = this.vm.routeLine().map(coordinate => L.latLng(coordinate.lat, coordinate.lng));

        if (!start || !end || !routeLine.length) return;

        this.map = L.map(this.mapContainer.nativeElement).setView([start.lat, start.lng], this.vm.routeZoom);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

        //Draw markers and route on map
        L.circleMarker(L.latLng(start.lat, start.lng),
                                this.vm.markerOptions).addTo(this.map);

        L.polyline(routeLine, {color: this.vm.routeColor}).addTo(this.map);

        L.circleMarker(L.latLng(end.lat, end.lng),
                                this.vm.markerOptions).addTo(this.map);

        this.map.fitBounds(L.latLngBounds(routeLine), { padding: this.vm.boundsPadding });
    }

    ngOnDestroy(): void {
        this.map?.remove();
    }
}
