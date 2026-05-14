import { Injectable, inject, signal, Signal } from "@angular/core";
import { TourService } from "../../../services/TourService";
import { Tour } from "../../../app/models/tour.model";
import { LoadingState } from "../../../app/models/loading-state.model";
import { finalize, Observable } from "rxjs";

@Injectable()
export class TourListViewModel {
    private tourService = inject(TourService);
    private readonly _tourStatus = signal<LoadingState>('idle');
    tours = signal<Tour[]>([]);

    loadTours(){
        this._tourStatus.set("loading");

        this.tourService.getAllTours()
        .pipe(
            finalize(() => {
                this._tourStatus.set("idle");
            })
        )
        .subscribe({
            next: (response) => {
                this.tours.set(response);
                this._tourStatus.set("success");
            },
            error: (err) => {
                this._tourStatus.set("error");
                console.error(err);
            } 
        });
    }
}