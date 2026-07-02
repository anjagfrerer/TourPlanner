import { computed, Injectable, signal } from "@angular/core";
import { Coordinates, RouteInformation } from "../../../app/models/routeInformation.model";

@Injectable()
export class MapViewModel {
    private readonly route = signal<RouteInformation | null>(null);

    readonly routeColor = '#321904'; //brown
    readonly routeZoom = 15;
    readonly boundsPadding: [number, number] = [24, 24];
    readonly markerOptions = {
        color: this.routeColor,
        fillColor: this.routeColor,
        fillOpacity: 1,
        radius: 5,
        weight: 1
    };

    readonly start = computed<Coordinates | null>(() => this.route()?.start ?? null);
    readonly end = computed<Coordinates | null>(() => this.route()?.end ?? null);

    readonly routeLine = computed<Coordinates[]>(() => {
        const route = this.route();
        if (!route) return [];

        return route.geometry.length
            ? route.geometry
            : [route.start, route.end];
    });

    setRoute(route: RouteInformation): void {
        this.route.set(route);
    }
}
