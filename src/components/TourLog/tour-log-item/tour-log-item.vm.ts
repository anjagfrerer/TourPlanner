import { signal, Injectable, inject } from "@angular/core";
import { TourLog } from "../../../app/models/tour-log.model";
import { Router } from '@angular/router';
import { TourLogService } from '../../../services/TourLogService';


@Injectable()
export class TourLogItemViewModel {
  // Aktueller TourLog, Startwert = null
  public tourLog = signal<TourLog | null>(null);
  // Holt globalen Service
  private service = inject(TourLogService)
  // Referenz auf Logs aus Service (derzeit Dummy)
  logs = this.service.logs
  // Holt globalen Router
  public router = inject(Router)

  // Holt Rating aus aktuellem TourLog, Fallback auf 0
  rating() {
    return this.tourLog()?.rating ?? 0;
  }

  // Setzt aktuellen TourLog
  setTourLog(tourLog: TourLog) {
    this.tourLog.set(tourLog);
  }

  deleteLog() {
    // Hol den Wert aus dem Signal
    const currentLog = this.tourLog();
    if (currentLog) {
      if (confirm('Möchtest du diesen Eintrag wirklich unwiderruflich löschen?')) {
        this.service.deleteTourLog(currentLog.tourLogId);
      }
    } else {
      console.error("Kein Log zum Löschen ausgewählt");
    }
  }

 editLog() {
    const currentLog = this.tourLog();
    if (currentLog) {
      // startEdit, weil noch keine Änderungen
      this.service.startEdit(currentLog);
    }
  }

  visitTour() {
    const log = this.tourLog()
    // Wenn log nicht null/undefined ist, greife auf tourId zu; sonst gib undefined zurück
    if (!log?.tourId) {
      alert('Keine Tour zu diesem Log gefunden.');
      return;
    }

    // navigiere zur TourDetail-Seite
    this.router.navigate(['/tour', log.tourId]);
  }
}