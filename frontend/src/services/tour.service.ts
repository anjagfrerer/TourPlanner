import { Injectable, signal, inject } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Tour } from "../app/models/tour.model";
import { firstValueFrom, Observable, tap } from "rxjs";
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class TourService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/tour`;
  private readonly usersApiUrl = `${environment.apiUrl}/users`;

  private readonly _allTours = signal<Tour[]>([]);
  public readonly allTours = this._allTours.asReadonly();

  private readonly _myTours = signal<Tour[]>([]);
  public readonly myTours = this._myTours.asReadonly();

  async getAllTours(search?: string): Promise<void> {
    try {
      let params = new HttpParams();
      if (search && search.trim() !== '') {
        params = params.set('search', search.trim());
      }

      // firstValueFrom löst den HTTP-Request sofort aus
      const serverTours = await firstValueFrom(
        this.http.get<Tour[]>(this.apiUrl, { params })
      );

      this._allTours.set(serverTours);
    } catch (error) {
      console.error("Failed to load Tours:", error);
    }
  }

  async getMyTours(search?: string): Promise<void> {
    try {
      let params = new HttpParams();
      if (search && search.trim() !== '') {
        params = params.set('search', search.trim());
      }

      const serverTours = await firstValueFrom(
        this.http.get<Tour[]>(`${this.usersApiUrl}/me/tours`, { params })
      );

      this._myTours.set(serverTours);
    } catch (error) {
      console.error("Failed to load my Tours:", error);
    }
  }

  getTourById(id: string): Observable<Tour> {
    return this.http.get<Tour>(`${this.apiUrl}/${id}`);
  }

  // anja:
  loadToursIfEmpty(): void {
    if (this._allTours().length === 0) {
      this.getAllTours(); // Startet den async-Prozess
    }
  }

  // anja für upload tour:
  async createTour(tourData: any): Promise<Tour> {
    try {
      const newTour = await firstValueFrom(
        this.http.post<Tour>(this.apiUrl, tourData)
      );

      this._myTours.update(current => [...current, newTour]);
      if (newTour.publicTour) {
        this._allTours.update(current => [...current, newTour]);
      }

      return newTour;
    } catch (error) {
      console.error('Failed to create Tour:', error);
      throw error;
    }
  }

  async updateTour(tourId: string, tourData: any): Promise<Tour> {
    try {
      const updatedTour = await firstValueFrom(
        this.http.put<Tour>(`${this.apiUrl}/${tourId}`, tourData)
      );

      this._myTours.update(current =>
        current.map(tour => tour.id === updatedTour.id ? updatedTour : tour)
      );
      this._allTours.update(current =>
        updatedTour.publicTour
          ? (current.some(tour => tour.id === updatedTour.id)
            ? current.map(tour => tour.id === updatedTour.id ? updatedTour : tour)
            : [...current, updatedTour])
          : current.filter(tour => tour.id !== updatedTour.id)
      );

      return updatedTour;
    } catch (error) {
      console.error('Failed to update Tour:', error);
      throw error;
    }
  }

  async deleteTour(tourId: string): Promise<void> {
    try {
      await firstValueFrom(
        this.http.delete<void>(`${this.apiUrl}/${tourId}`)
      );

      this._myTours.update(current => current.filter(tour => tour.id !== tourId));
      this._allTours.update(current => current.filter(tour => tour.id !== tourId));
    } catch (error) {
      console.error('Failed to delete Tour:', error);
      throw error;
    }
  }
}
