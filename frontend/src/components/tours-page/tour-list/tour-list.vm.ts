import { Injectable, inject, signal, Signal, computed } from "@angular/core";
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
    
    loadTours(){
        this._tourStatus.set("loading");

        this.tourService.getAllTours()
        .pipe(
            finalize(() => {
                this._tourStatus.set("idle");
            })
        )
        .subscribe({
            next: (response) => {
                this._tourStatus.set("success");
            },
            error: (err) => {
                this._tourStatus.set("error");
                console.error(err);
            } 
        });
    }

    // von Anja für Suche:
    filteredTours = computed(() => {
        const search = this.searchService.searchTerm().toLowerCase().trim();
        const filters = this.searchService.activeFilters();
        let result = this.tours();

        if(search) {
            result = result.filter(tour => tour.name.toLowerCase().includes(search) ||
            tour.author?.toLowerCase().includes(search) ||
            tour.description?.toLowerCase().includes(search) ||
            tour.destinationLocation?.toLowerCase().includes(search) ||
            tour.startLocation?.toLowerCase().includes(search)
        );
        }

        if(filters.transport) {
            result = result.filter(tour => tour.transportType === filters.transport);
        }

        if(filters.ratings && filters.ratings.length > 0) {
            result = result.filter(tour => filters.ratings.includes(tour.rating));
        }

        if(filters.maxDistance) {
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