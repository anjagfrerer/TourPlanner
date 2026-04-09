import { computed, Injectable, signal, inject } from "@angular/core";
import { Tour } from "../../app/models/tour.model";
import { TourService } from "../../services/TourService";

@Injectable()
export class MyToursPageViewModel {
    private tourService = inject(TourService);
    //tours = signal<Tour[] | null>(null);
    selectedTour = signal<Tour | null>(null);

    tours = computed(() => {
    const allTours = this.tourService.getAllTours()(); // Signal auslesen
    return allTours.filter(tour => tour.author === "Anja");
});
    
    loadTourById(id: number) {
        const loadedTour = this.tourService.getTourById(id);
        //DEBUG console.log("getTourById(id) triggered: "+ id);
        this.selectedTour.set(loadedTour);
    }
    
    openAddLogPopup() {
        const currentTour = this.selectedTour()
        this.tourService.startNewTour()
    }
}