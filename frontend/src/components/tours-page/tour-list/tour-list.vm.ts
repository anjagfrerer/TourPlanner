import { Injectable, inject, signal, computed } from "@angular/core";
import { TourService } from "../../../services/tour.service";
import { Tour } from "../../../app/models/tour.model";
import { LoadingState } from "../../../app/models/loading-state.model";
import { debounceTime, distinctUntilChanged, finalize, Observable, switchMap } from "rxjs";
import { SearchService } from "../../../services/search.service";
import { toObservable } from "@angular/core/rxjs-interop";

@Injectable({
    providedIn: 'root' // von Anja: im gesamten Projekt als Singelton verfügbar
})
export class TourListViewModel {
    private tourService = inject(TourService);
    private readonly _tourStatus = signal<LoadingState>('idle');
    private readonly searchService = inject(SearchService);

    //tours = signal<Tour[]>([]);
    // von Anja geändert: damit es eine single source of truth gibt und die daten aus dem service geladen werden
    public readonly tours = this.tourService.tours;

    public getAllTourLogsByUser() {
        this.tourService.getAllTours(this.searchService.searchTerm());
    }

    async loadTours() {
        this._tourStatus.set("loading");
        try {
            await this.tourService.getAllTours();
            this._tourStatus.set("success");
        } catch (err) {
            this._tourStatus.set("error");
            console.error(err);
        } finally {
            this._tourStatus.set("idle");
        }
    }

    // von Anja für Suche:
    filteredTours = computed(() => {
        const filters = this.searchService.activeFilters();
        let result = this.tourService.tours();

        if (filters.transport) {
            result = result.filter(tour => tour.transportType === filters.transport);
        }

        if (filters.ratings && filters.ratings.length > 0) {
            result = result.filter(tour => filters.ratings.includes(tour.rating));
        }

        if (filters.maxDistance) {
            result = result.filter(tour => tour.distance <= filters.maxDistance);
        }

        if (filters.maxDuration) {
            result = result.filter(tour => {
                const durationAsNumber = parseInt(tour.estimatedTime, 10) || 0;
                return durationAsNumber <= filters.maxDuration;
            });
        }

        return result;
    });
}
