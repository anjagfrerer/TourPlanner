import { Injectable, inject } from "@angular/core";
import { TourService } from "../../../services/TourService";

@Injectable()
export class TourListViewModel {
    private tourService = inject(TourService);
    tours = this.tourService.getAllTours();
}