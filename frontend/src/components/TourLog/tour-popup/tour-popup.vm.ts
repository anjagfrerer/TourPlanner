import { effect, inject, Injectable, signal } from '@angular/core';
import { TourLog } from '../../../app/models/tour-log.model';
import { TourLogService } from '../../../services/tourlog.service';

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

  async saveTourLog(): Promise<void> {
    const currentData = this.tourLog();
    const tourId = currentData.tourId;

    if (!tourId) {
      window.alert('No Tour available!');
      return;
    }

    try {
      if (!currentData.tourLogId) {
        await this.service.addTourLog(tourId, currentData);
      } else {
        await this.service.updateTourLog(tourId, currentData);
      }

      this.closeModal();
      window.alert('Successfully saved!');
    } catch (error: any) {
      console.error('Failed to save TourLog:', error);

      const backendMessage = error.error?.message;

      // echte Message
      if (error.status === 401) {
        window.alert(`Error (401): ${backendMessage || 'You do not have permission to edit this entry!'}`);
      } else if (error.status === 404) {
        window.alert(`Error (404): ${backendMessage || 'This entry no longer exists in the system.'}`);
      } else if (error.status === 400) {
        window.alert(`Error (400): ${backendMessage || 'Invalid data transmitted.'}`);
      } else {
        // Allgemeiner Fallback
        window.alert(backendMessage || 'Failed to save TourLog. Please try again.');
      }
    }
  }

  closeModal(): void {
    this.service.clearEdit();
  }
}