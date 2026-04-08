import { signal, Injectable } from "@angular/core";
import { Tour } from "../../../app/models/tour.model";

@Injectable()
export class TourCardViewModel{
    private tour = signal<Tour | null>(null);
    rating = signal(Math.floor(Math.random() * 5) + 1);

    setTour(tour: Tour) {
    this.tour.set(tour);
  }
}