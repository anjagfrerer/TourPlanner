import { Injectable, inject, signal } from "@angular/core";
import { TourService } from "../../../services/TourService";
import { Tour } from "../../../app/models/tour.model";

@Injectable()
export class TourListViewModel {
    private tourService = inject(TourService);
    tours = signal<Tour[]>([]);

    loadTours() {
        const allTours = this.tourService.getAllTours();
        this.tours.set(allTours());
    }

    loadToursByAuthor(author: string) {
        const toursByAuthor = this.tourService.getToursByAuthor(author);
        this.tours.set(toursByAuthor ?? []);
    }
}