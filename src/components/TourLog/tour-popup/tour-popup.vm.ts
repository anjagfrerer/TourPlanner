import { Injectable } from '@angular/core';
import { TourLog } from '../../../app/models/tour-log.model';

@Injectable()
export class TourPopupViewModel {
  isModalOpen = false;

  tourLog: TourLog = this.createEmptyTourLog();

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  saveTourLog(): void {
    console.log('TourLog speichern:', this.tourLog);

    this.closeModal();
    this.resetTourLog();
  }

  resetTourLog(): void {
    this.tourLog = this.createEmptyTourLog();
  }

  private createEmptyTourLog(): TourLog {
    return {
      date: '',
      time: '',
      rating: 0,
      difficulty: 0,
      totalDistanceKm: 0,
      totalTimeMin: 0,
      comment: '',
    };
  }
}