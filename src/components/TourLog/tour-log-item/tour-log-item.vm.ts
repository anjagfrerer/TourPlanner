import { signal, Injectable } from "@angular/core";
import { TourLog } from "../../../app/models/tour-log.model";

@Injectable({
  providedIn: 'root'
})
export class TourLogViewModel {
  private tourLog = signal<TourLog | null>(null);
  rating = signal(Math.floor(Math.random() * 5) + 1);

  setTourLog(tourLog: TourLog) {
    this.tourLog.set(tourLog);
  }
}