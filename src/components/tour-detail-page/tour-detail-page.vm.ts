import { signal, Injectable, inject, computed, OnInit } from "@angular/core";
import { TourLogService } from "../../services/TourLogService";
import { TourService } from "../../services/TourService";
import { Tour } from "../../app/models/tour.model";


@Injectable()
export class TourDetailPageViewModel {
    private tourService = inject(TourService);
    selectedtour = signal<Tour | null>(null);
    
    loadTourById(id: number) {
        const loadedTour = this.tourService.getTourById(id);
        console.log("getTourById(id) triggered: "+ id);
        this.selectedtour.set(loadedTour);
    }
}