import { Injectable, signal, computed } from '@angular/core';
import { TourLog } from '../app/models/tour-log.model';

/** Angular erstellt ein Singleton dieser Klasse global;
providedIn: 'root'-> service ist in der gesamten App verfügbar.*/
@Injectable({ providedIn: 'root' })
export class TourLogService {
  // Signal
  logs = signal<TourLog[]>([
    {
      tourLogId: 1,
      tourId: 1,
      author: 'Anja',
      date: '2026-03-17',
      time: '14:30',
      rating: 4,
      difficulty: 6,
      totalDistanceKm: 12.5,
      totalTimeMin: 90,
      comment: 'Nice tour, a bit tiring'
    },
    {
      tourLogId: 2,
      tourId: 2,
      author: 'Anja2',
      date: '2026-03-18',
      time: '10:00',
      rating: 5,
      difficulty: 4,
      totalDistanceKm: 8,
      totalTimeMin: 60,
      comment: 'Easy and relaxing'
    },
    {
      tourLogId: 3,
      tourId: 3,
      author: 'Anja3',
      date: '2026-03-19',
      time: '09:30',
      rating: 3,
      difficulty: 5,
      totalDistanceKm: 10,
      totalTimeMin: 70,
      comment: 'Moderate hike'
    }
  ]);

  // welcher Log wird gerade editiert; Edit Formular kann auf dieses Signal reagieren
  private logToEdit = signal<TourLog | null>(null);
  // Das Edit Formular darf zuerst nur lesen und nicht gleich ändern, damit nix kaputt wird
  // diesen Wert für Edit-Popup
  public readonly activeLogForEdit = this.logToEdit.asReadonly();

 getLogsByTourId(tourId: number) {
  return computed(() =>
    this.logs().filter(log => log.tourId === tourId)
  );
}

  // startet Edit Prozess
  // UI reagiert automatisch; Popup geht auf
  startEdit(log: TourLog) {
    this.logToEdit.set(log);
  }

  // bricht Edit Prozess ab
  // Signal wird zurückgesetzt
  // Popup Komponente weiß jetzt: kein Log in Bearbeitung
  clearEdit() {
    this.logToEdit.set(null);
  }

  // Speichert die Änderungen im Array
  updateTourLog(updatedLog: TourLog) {
    this.logs.update(currentLogs => 
      currentLogs.map(log => log.tourLogId === updatedLog.tourLogId ? updatedLog : log)
    );
  }

  // Methode fügt neuen TourLog hinzu mit eindeutiger ID
  addTourLog(newLog: TourLog) {
    const id = Math.max(0, ...this.logs().map(l => l.tourLogId)) + 1;
    this.logs.update(current => [...current, { ...newLog, tourLogId: id }]);
  }

  deleteTourLog(tourLogId: number) {
    this.logs.set(this.logs().filter(log => log.tourLogId !== tourLogId));
  }
}