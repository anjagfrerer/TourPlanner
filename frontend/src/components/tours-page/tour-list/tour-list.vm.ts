import { Injectable, inject, signal, Signal, computed } from "@angular/core";
import { TourService } from "../../../services/TourService";
import { Tour } from "../../../app/models/tour.model";
import { LoadingState } from "../../../app/models/loading-state.model";
import { finalize, Observable } from "rxjs";
import { SearchService } from "../../../services/SearchService";

@Injectable({
    providedIn: 'root' // von Anja: im gesamten Projekt als Singelton verfügbar
})
export class TourListViewModel {
    private tourService = inject(TourService);
    private readonly _tourStatus = signal<LoadingState>('idle');
    private readonly searchService = inject(SearchService);
    tours = signal<Tour[]>([]);

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
                this.tours.set(response);
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
        const allTours = this.tours();

        if(!search) return allTours;

        return allTours.filter( tour =>
            tour.name.toLowerCase().includes(search)
        );
    });
    
}