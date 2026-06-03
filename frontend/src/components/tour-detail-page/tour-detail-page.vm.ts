import { signal, Injectable, inject, computed, OnInit } from "@angular/core";
import { TourLogService } from "../../services/TourLogService";
import { TourService } from "../../services/TourService";
import { Tour } from "../../app/models/tour.model";
import { TourLog } from "../../app/models/tour-log.model";
import { LoadingState } from "../../app/models/loading-state.model";
import { finalize } from "rxjs";
import { TRANSPORT_TYPES } from "../../app/constants/transport-type.enum";


@Injectable()
export class TourDetailPageViewModel {
    private tourService = inject(TourService);
    private tourLogService = inject(TourLogService);
    private readonly tourStatus = signal<LoadingState>('idle'); // Maybe globalize and reusable??
    selectedTour = signal<Tour | null>(null);

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
                // von Anja hinzugefügt um Logs zu laden zur Tour
                this.tourLogService.getLogsByTourId(response.id);
                this.tourStatus.set("success");
            },
            error: (err) => {
                this.tourStatus.set("error");
                console.error(err);
            } 
        });
    }
    

    tourLogs = computed(() => {
        const tour = this.selectedTour();
        if (!tour) return [];
        return this.tourLogService.logs(); // .logs() statt ._logs verwenden!
    });
    
    /*loadTourById(id: number) {
        const loadedTour = this.tourService.getTourById(id);
        //DEBUG console.log("getTourById(id) triggered: "+ id);
        this.selectedTour.set(loadedTour);
    }**/

    // von Anja wieder *un*-auskommentiert
    openAddLogPopup() {
        const currentTour = this.selectedTour()
        if(!currentTour) return;
        this.tourLogService.startNewLog(currentTour.id)
    }
}