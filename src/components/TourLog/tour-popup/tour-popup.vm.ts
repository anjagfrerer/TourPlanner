import { effect, inject, Injectable, signal } from '@angular/core';
import { TourLog } from '../../../app/models/tour-log.model';
import { TourLogService } from '../../../services/TourLogService';

@Injectable()
export class TourPopupViewModel {
  private service = inject(TourLogService);
  
  isModalOpen = signal(false);
  tourLog = signal<TourLog>(this.createEmptyTourLog());

  constructor() {
    // Effekt: Wenn im Service ein Log zum Editieren gesetzt wird, kopiere es hierher
    effect(() => {
      const logFromService = this.service.activeLogForEdit();
      if (logFromService) {
        this.tourLog.set({ ...logFromService }); // Kopie erstellen (Immutability!)
        this.isModalOpen.set(true);
      }
    });
  }

  openModalForNew() {
    this.service.clearEdit();
    this.tourLog.set(this.createEmptyTourLog());
    this.isModalOpen.set(true);
  }

  saveTourLog(): void {
    const currentData = this.tourLog();
    if (currentData.tourLogId > 0) {
      this.service.updateTourLog(currentData);
    } else {
      this.service.addTourLog(currentData);
    }
    this.closeModal();
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.service.clearEdit();
  }

  private createEmptyTourLog(): TourLog {
    return { 
      tourLogId: 0, tourId: 1, author: 'Anja', date: '', time: '', 
      rating: 0, difficulty: 0, totalDistanceKm: 0, totalTimeMin: 0, comment: '' 
    };
  }
}