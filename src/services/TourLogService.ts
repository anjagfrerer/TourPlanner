import { Injectable, signal } from '@angular/core';
import { TourLog } from '../app/models/tour-log.model';

@Injectable({ providedIn: 'root' })
export class TourLogService {
  // Signal initialisieren
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

  // Hilfs-Signal: Welcher Log wird gerade editiert?
  private logToEdit = signal<TourLog | null>(null);
  public readonly activeLogForEdit = this.logToEdit.asReadonly();

  // Startet den Edit-Prozess
  startEdit(log: TourLog) {
    this.logToEdit.set(log);
  }

  // Bricht den Edit-Prozess ab
  clearEdit() {
    this.logToEdit.set(null);
  }

  // Speichert die Änderungen im Array
  updateTourLog(updatedLog: TourLog) {
    this.logs.update(currentLogs => 
      currentLogs.map(log => log.tourLogId === updatedLog.tourLogId ? updatedLog : log)
    );
  }

  addTourLog(newLog: TourLog) {
    const id = Math.max(0, ...this.logs().map(l => l.tourLogId)) + 1;
    this.logs.update(current => [...current, { ...newLog, tourLogId: id }]);
  }

  deleteTourLog(tourLogId: number) {
    this.logs.set(this.logs().filter(log => log.tourLogId !== tourLogId));
  }
}