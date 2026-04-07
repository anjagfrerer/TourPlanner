import { signal, Injectable, inject } from "@angular/core";
import { TourLog } from "../../../app/models/tour-log.model";
import { Router } from '@angular/router';
import { TourLogService } from '../../../services/TourLogService';


@Injectable()
export class TourLogItemViewModel {
  public tourLog = signal<TourLog | null>(null);
  private service = inject(TourLogService)
  logs = this.service.logs
  constructor(private router: Router) {}

  rating() {
    return this.tourLog()?.rating ?? 0;
  }

  setTourLog(tourLog: TourLog) {
    this.tourLog.set(tourLog);
  }

  deleteLog() {
    const currentLog = this.tourLog(); // Hol den Wert aus dem Signal
    if (currentLog) {
      this.service.deleteTourLog(currentLog.tourLogId);
    } else {
      console.error("Kein Log zum Löschen ausgewählt");
    }
  }

 editLog() {
    const currentLog = this.tourLog();
    if (currentLog) {
      this.service.startEdit(currentLog); // Informiert den Service
    }
  }

  visitTour() {
    const log = this.tourLog()
    if (!log?.tourId) {
      alert('Keine Tour zu diesem Log gefunden.');
      return;
    }

    // navigiere dynamisch zur TourDetail-Seite
    this.router.navigate(['/tour', log.tourId]);
  }
}