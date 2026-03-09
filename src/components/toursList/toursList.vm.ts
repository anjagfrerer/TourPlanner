import { computed, Injectable, signal } from "@angular/core";
import { Tour } from "../../app/models/tour.model";

@Injectable()
export class ToursListViewModel {

    /**
  title = "ToursList";

  tours: Tour[] = [];
  loading = false;

  constructor(private tourService: TourService) {}

  getTours(): void {
    this.loading = true;

    this.tourService.getTours().subscribe(data => {
      this.tours = data;
      this.loading = false;
    });
  }*/
}