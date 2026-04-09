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
    tourLogs = signal<TourLog[]>([]);
    
    loadTourById(id: number) {
        const loadedTour = this.tourService.getTourById(id);
        //DEBUG console.log("getTourById(id) triggered: "+ id);
        this.selectedTour.set(loadedTour);
    }

    loadTourLogByTourId(id: number){
        const tourLogsByTourId = this.tourLogService.getLogsByTourId(id);
        this.tourLogs.set(tourLogsByTourId());
    }
}