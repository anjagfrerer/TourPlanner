import { computed, Injectable, signal, inject } from "@angular/core";
import { Tour } from "../../app/models/tour.model";
import { TourService } from "../../services/TourService";

@Injectable()
export class MyToursPageViewModel {
     private tourService = inject(TourService);
     tours = signal<Tour[] | null>(null);

    loadMyTours(author: string) {
        const tourListByAuthor = this.tourService.getToursByAuthor(author);
        this.tours.set(tourListByAuthor);
    }
}