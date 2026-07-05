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

  // von Anja hinzugefügt: Zentraler Zustand für das gesamte Frontend
  private readonly _tours = signal<Tour[]>([]);
  public readonly tours = this._tours.asReadonly();

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

      this._tours.set(serverTours);
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

      this._tours.set(serverTours);
    } catch (error) {
      console.error("Failed to load my Tours:", error);
    }
  }

  getTourById(id: string): Observable<Tour> {
    return this.http.get<Tour>(`${this.apiUrl}/${id}`);
  }

  // anja:
  loadToursIfEmpty(): void {
    if (this._tours().length === 0) {
      this.getAllTours(); // Startet den async-Prozess
    }
  }

  // anja für upload tour:
  async createTour(tourData: any): Promise<Tour> {
    try {
      const newTour = await firstValueFrom(
        this.http.post<Tour>(this.apiUrl, tourData)
      );

      this._tours.update(current => [...current, newTour]);

      return newTour;
    } catch (error) {
      console.error('Failed to create Tour:', error);
      throw error;
    }
  }
}
