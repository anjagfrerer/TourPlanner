import { signal, Injectable, inject } from "@angular/core";
import { TourLog } from "../../../app/models/tour-log.model";
import { Router } from '@angular/router';
import { TourLogService } from '../../../services/TourLogService';


@Injectable()
export class TourLogItemViewModel {
  private readonly service = inject(TourLogService)
  private readonly router = inject(Router);

  public tourLog = signal<TourLog | null>(null);
  logs = this.service.logs

  rating() {
    return this.tourLog()?.rating ?? 0;
  }

  setTourLog(tourLog: TourLog) {
    this.tourLog.set(tourLog);
  }

  async deleteLog(): Promise<void> {
    const currentLog = this.tourLog();
    if (currentLog) {
      if (window.confirm("Are you sure you want to delete this tour?")) {
        try {
          await this.service.deleteTourLog(currentLog.tourId, currentLog.tourLogId);
          window.alert('Successfully deleted log!');
        } catch (error) {
          console.error("Failed to delete Log:", error);
          window.alert('Failed to delete Log. Please try again.');
        }
      }
    } else {
      console.error("No log selected for deletion");
    }
  }

 editLog() {
    const currentLog = this.tourLog();
    if (currentLog) {
      this.service.startEdit(currentLog);
    }
  }

  visitTour() {
    const log = this.tourLog()
    if (!log?.tourId) {
      alert('No tour found for this log.');
      return;
    }

    this.router.navigate(['/tour', log.tourId]);
  }
}