import { Injectable, signal, computed, inject, Optional } from '@angular/core';
import { TourLog } from '../app/models/tour-log.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class TourLogService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/tour`;

  // Zustand im Frontend
  private readonly _logs = signal<TourLog[]>([]);
  public readonly logs = this._logs.asReadonly();

  // welcher log grad bearbeitet wird  
  private logToEdit = signal<TourLog | null>(null);
  public readonly activeLogForEdit = this.logToEdit.asReadonly();

  async getLogsByTourId(tourId: string, search?: string): Promise<void> {
    try {
      let params = new HttpParams();
      if (search && search.trim() !== '') {
        params = params.set('search', search.trim());
      }

      const serverLogs = await firstValueFrom(
        this.http.get<TourLog[]>(`${this.apiUrl}/${tourId}/logs`, { params })
      );
      this._logs.set(serverLogs);
    } catch (error: any) {
      console.error(`Failed to load Logs of this Tour ${tourId}:`, error);
    }
  }

  async getAllTourLogsByUser(search?: string): Promise<void> {
    try {
      let params = new HttpParams();
      if (search && search.trim() !== '') {
        params = params.set('search', search.trim());
      }

      const allServerLogs = await firstValueFrom(
        this.http.get<TourLog[]>(`${environment.apiUrl}/tourlogs`, { params })
      );
      this._logs.set(allServerLogs);
    } catch (error: any) {
      console.error("Failed to load TourLogs:", error);
    }
  }

  async updateTourLog(tourId: string, updatedLog: TourLog): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.http.put<TourLog>(`${this.apiUrl}/${tourId}/logs/${updatedLog.tourLogId}`, updatedLog)
      );

      this._logs.update(currentLogs =>
        currentLogs.map(log => {
          if (log.tourLogId === response.tourLogId) {
            return response;
          }
          return log;
        })
      );
    } catch (error: any) {
      console.error('Failed to update TourLog:', error);
      throw error;
    }
  }

  async addTourLog(tourId: string, newLog: Omit<TourLog, 'tourLogId'>): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.http.post<TourLog>(`${this.apiUrl}/${tourId}/logs`, newLog)
      );
      this._logs.update(current => [...current, response]);
    } catch (error: any) {
      console.error('Failed to create TourLog:', error);
    }
  }

  async deleteTourLog(tourId: string, tourLogId: string): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.http.delete<TourLog>(`${this.apiUrl}/${tourId}/logs/${tourLogId}`)
      );
      this._logs.update(current => current.filter(log => log.tourLogId !== tourLogId));
    } catch (error) {
      console.error('Failed to delete TourLog:', error);
    }
  }

  // edit prozess starten
  startEdit(log: TourLog) {
    this.logToEdit.set(log);
  }

  // edit prozess abbrechen
  clearEdit() {
    this.logToEdit.set(null);
  }


  startNewLog(tourId: string) {
    this.logToEdit.set(this.getEmptyLog(tourId));
  }

  getEmptyLog(tourId: string = ''): TourLog {
    return {
      tourLogId: '', // Leer, da UUID vom Backend generiert wird
      tourId: tourId,
      author: '',
      date: new Date().toISOString().split('T')[0],
      time: '',
      rating: 0,
      difficulty: 0,
      totalDistanceKm: 0,
      totalTimeMin: 0,
      comment: ''
    };
  }
}
