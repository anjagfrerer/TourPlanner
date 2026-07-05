import { signal, Injectable, inject, computed, OnInit } from "@angular/core";
import { TourLogService } from "../../services/tourlog.service";
import { TourService } from "../../services/tour.service";
import { Tour } from "../../app/models/tour.model";
import { TourLog } from "../../app/models/tour-log.model";
import { LoadingState } from "../../app/models/loading-state.model";
import { finalize } from "rxjs";
import { TRANSPORT_TYPES } from "../../app/constants/transport-type.enum";
import { ExportService } from "../../services/export.service";
import { WeatherService } from "../../services/weather.service";
import { Coordinates, RouteInformation } from "../../app/models/routeInformation.model";
import { WeatherInfo } from "../../app/models/weather.model";


@Injectable()
export class TourDetailPageViewModel {
    private tourService = inject(TourService);
    private tourLogService = inject(TourLogService);
    private exportService = inject(ExportService);
    private weatherService = inject(WeatherService);
    private readonly tourStatus = signal<LoadingState>('idle'); // Maybe globalize and reusable??
    readonly weatherStatus = signal<LoadingState>('idle');
    selectedTour = signal<Tour | null>(null);
    weather = signal<WeatherInfo | null>(null);


    readonly transportTypeConst = TRANSPORT_TYPES;

    loadTourById(id : string) {
        if(!id.length) return;

        this.tourStatus.set("loading");
        this.tourService.getTourById(id).pipe(
            finalize(() => {
                this.tourStatus.set("idle");
            })
        ).subscribe({
            next: (response) => {
                this.selectedTour.set(response);
                this.tourLogService.getLogsByTourId(response.id);
                this.loadWeather(response.route);
                this.tourStatus.set("success");
            },
            error: (err) => {
                this.tourStatus.set("error");
                console.error(err);
            }
        });
    }

    loadWeather(route: RouteInformation | null) {
        if (!route) {
            this.weather.set(null);
            return;
        }

        this.weatherStatus.set('loading');
        this.weatherService.getCurrentWeather(this.getRouteWeatherPoint(route)).pipe(
            finalize(() => {
                this.weatherStatus.set('idle');
            })
        ).subscribe({
            next: (response) => {
                this.weather.set(response);
                this.weatherStatus.set('success');
            },
            error: (err) => {
                this.weather.set(null);
                this.weatherStatus.set('error');
                console.error('Failed to load weather:', err);
            }
        });
    }

    private getRouteWeatherPoint(route: RouteInformation): Coordinates {
        if (route.geometry.length) {
            return route.geometry[Math.floor(route.geometry.length / 2)];
        }

        return {
            lat: (route.start.lat + route.end.lat) / 2,
            lng: (route.start.lng + route.end.lng) / 2,
        };
    }


    tourLogs = computed(() => {
        const tour = this.selectedTour();
        if (!tour) return [];
        return this.tourLogService.tourLogs();
    });

    /*loadTourById(id: number) {
        const loadedTour = this.tourService.getTourById(id);
        //DEBUG console.log("getTourById(id) triggered: "+ id);
        this.selectedTour.set(loadedTour);
    }**/

    // von Anja wieder *un*-auskommentiert
    openAddLogPopup() {
        const currentTour = this.selectedTour()
        if (!currentTour) return;
        this.tourLogService.startNewLog(currentTour.id)
    }

    // von Anja: exportieren
    exportTour() {
        const currentTour = this.selectedTour();
        if (currentTour) {
            this.exportService.exportTourAsJson(currentTour);
        } else {
            console.warn("Es ist keine Tour zum Exportieren ausgewählt.");
        }
    }
}
