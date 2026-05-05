import { effect, inject, Injectable, signal } from '@angular/core';
import { TourLog } from '../../../app/models/tour-log.model';
import { TourLogService } from '../../../services/TourLogService';

@Injectable()
export class TourPopupViewModel {
  private service = inject(TourLogService);
  
  isModalOpen = signal(false);
  tourLog = signal<TourLog>(this.service.getEmptyLog());

  constructor() {
    effect(() => {
      const logFromService = this.service.activeLogForEdit();
      if (logFromService) {
        this.tourLog.set({ ...logFromService }); 
        this.isModalOpen.set(true);
      } else {
        this.isModalOpen.set(false);
      }
    });
  }

  /** 
  openModalForNew() {
    this.service.clearEdit();
    this.tourLog.set(this.createEmptyTourLog());
    this.isModalOpen.set(true);
  }*/

  saveTourLog(): void {
    const currentData = this.tourLog();
    if (currentData.tourLogId > 0) {
      this.service.updateTourLog(currentData);
    } else {
      this.service.addTourLog(currentData);
    }
    this.closeModal();
    window.alert('Erfolgreich gespeichert!');
  }

  closeModal(): void {
    this.service.clearEdit();
  }
}