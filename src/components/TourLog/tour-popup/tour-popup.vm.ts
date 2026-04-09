import { effect, inject, Injectable, signal } from '@angular/core';
import { TourLog } from '../../../app/models/tour-log.model';
import { TourLogService } from '../../../services/TourLogService';

@Injectable()
export class TourPopupViewModel {
  private service = inject(TourLogService);
  
  isModalOpen = signal(false);
  tourLog = signal<TourLog>(this.createEmptyTourLog());

  constructor() {
    // wenn im Service ein Log zum Editieren gesetzt wird, kopiert er es hierher
    // Ziel: Automatisch das Popup öffnen, wenn der Service ein Log zum Editieren setzt
    effect(() => {
      const logFromService = this.service.activeLogForEdit();
      if (logFromService) {
        // Kopie erstellen: Immutability: Änderungen im Popup verändern nicht gleich das Original im Service
        this.tourLog.set({ ...logFromService });
        this.isModalOpen.set(true);
      }
    });
  }

  // Popup, wenn neuer Log erstellt wird
  openModalForNew() {
    this.service.clearEdit();
    this.tourLog.set(this.createEmptyTourLog());
    this.isModalOpen.set(true);
  }

  // tourLogId > 0 -> existierender Log -> Update
  // tourLogId = 0 -> neuer Log -> Add
  saveTourLog(): void {
    const currentData = this.tourLog();
    if (currentData.tourLogId > 0) {
      this.service.updateTourLog(currentData);
    } else {
      this.service.addTourLog(currentData);
    }
    this.closeModal();
    alert('Eintrag erfolgreich gespeichert!');
  }

  // Schließt das Modal: Signal isModalOpen = false -> UI reagiert
  closeModal(): void {
    this.isModalOpen.set(false);
    this.service.clearEdit();
  }

  // erstellt ein leeres Log-Objekt, Verwendung beim Intitialisieren beim neuen Log oder Reset
  private createEmptyTourLog(): TourLog {
    return { 
      tourLogId: 0, tourId: 0, author: '', date: '', time: '', 
      rating: 0, difficulty: 0, totalDistanceKm: 0, totalTimeMin: 0, comment: '' 
    };
  }
}