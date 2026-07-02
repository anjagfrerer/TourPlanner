import { signal, Injectable, inject, computed } from "@angular/core";
import { TourLog } from "../../../app/models/tour-log.model";
import { Router } from '@angular/router';
import { TourLogService } from '../../../services/tourlog.service';
import { TourService } from "../../../services/tour.service";
import { TRANSPORT_TYPES } from "../../../app/constants/transport-type.enum";
import { AuthService } from "../../../services/auth.service";


@Injectable()
export class TourLogItemViewModel {
  private readonly service = inject(TourLogService)
  private readonly router = inject(Router);
  private readonly tourService = inject(TourService)
  private readonly authService = inject(AuthService);

  public tourLog = signal<TourLog | null>(null);
  logs = this.service.logs;

  // Selektierte Tour abfragen
  public selectedTour = computed(() => {
    const log = this.tourLog();
    if (!log || !log.tourId) return null;

    const allTours = this.tourService.tours();

    // wenn Tourenliste noch leer -> triggern Laden im Hintergrund
    if (allTours.length === 0) {
      this.tourService.loadToursIfEmpty();
      return null;
    }

    return allTours.find(t => t.id === log.tourId) || null;
  });

  rating() {
    return this.tourLog()?.rating ?? 0;
  }

  setTourLog(tourLog: TourLog) {
    this.tourLog.set(tourLog);
  }

  async deleteLog(): Promise<void> {
    if (!this.canModify()) {
      window.alert("You are not authorized to delete this log! Only the author may do so.");
      return;
    }

    const currentLog = this.tourLog();
    if (currentLog) {
      if (window.confirm("Are you sure you want to delete this tour log?")) {
        try {
          await this.service.deleteTourLog(currentLog.tourId, currentLog.tourLogId);
          window.alert('Successfully deleted log!');
        } catch (error) {
          console.error("Failed to delete Log:", error);
          window.alert('Failed to delete Log. Please try again.');
        }
      }
    }
  }

  editLog() {
    if (!this.canModify()) {
      window.alert("You are not authorized to edit this log! Only the author may do so.");
      return;
    }

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

  // Icon
  public tourIcon = computed(() => {
    const log = this.tourLog();
    if (!log) return 'route';

    const tour = this.tourService.tours().find(t => t.id === log.tourId);
    const type = tour?.transportType;

    if (!type) return 'route';

    switch (type) {
      case TRANSPORT_TYPES.BIKING:
        return 'directions_bike';
      case TRANSPORT_TYPES.HIKING:
        return 'hiking';
      case TRANSPORT_TYPES.RUNNING:
        return 'directions_run';
      case TRANSPORT_TYPES.VACATION:
        return 'luggage';
      default:
        return 'route';
    }
  });

  // Daten im Cache
  init() {
    this.tourService.loadToursIfEmpty();
  }

  // computed-Signal, das prüft, ob der Log mir gehört
  public canModify = computed(() => {
    const log = this.tourLog();
    const loggedInUser = this.authService.username(); // Holt den entschlüsselten Namen

    if (!log || !loggedInUser) return false;

    return log.author === loggedInUser;
  });
}