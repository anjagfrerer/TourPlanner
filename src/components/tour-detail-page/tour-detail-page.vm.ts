import { signal, Injectable, inject, computed, OnInit } from "@angular/core";
import { TourLogService } from "../../services/TourLogService";
import { TourService } from "../../services/TourService";
import { Tour } from "../../app/models/tour.model";
import { TourLog } from "../../app/models/tour-log.model";


@Injectable()
export class TourDetailPageViewModel {
    private tourService = inject(TourService);
    private tourLogService = inject(TourLogService);
    selectedTour = signal<Tour | null>(null);
    tourLogs = computed(() => {
        const tour = this.selectedTour();
        if (!tour) return [];
        return this.tourLogService.getLogsByTourId(tour.id)();
    });
    
    loadTourById(id: number) {
        const loadedTour = this.tourService.getTourById(id);
        //DEBUG console.log("getTourById(id) triggered: "+ id);
        this.selectedTour.set(loadedTour);
    }

    openAddLogPopup() {
        const currentTour = this.selectedTour()
        if(!currentTour) return;
        this.tourLogService.startNewLog(currentTour.id)
    }
}