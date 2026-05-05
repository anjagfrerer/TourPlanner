import { effect, inject, Injectable, signal } from '@angular/core';
import { TourLog } from '../../../app/models/tour-log.model';
import { TourLogService } from '../../../services/TourLogService';
import { TourService } from '../../../services/TourService';
import { Tour } from '../../../app/models/tour.model';

@Injectable()
export class AddTourPopupViewModel {
  private service = inject(TourService);
  
  isModalOpen = signal(false);
  tour = signal<Tour>(this.service.getEmptyTour());

  constructor() {
    effect(() => {
      const tourFromService = this.service.activeTourForEdit();
      if (tourFromService) {
        this.tour.set({ ...tourFromService }); 
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

  saveTour(): void {
    const currentData = this.tour();
    if (currentData.id > 0) {
      this.service.updateTour(currentData);
    } else {
      this.service.addTour(currentData);
    }
    this.closeModal();
    window.alert('Erfolgreich gespeichert!');
  }

  closeModal(): void {
    this.service.clearEdit();
  }
}