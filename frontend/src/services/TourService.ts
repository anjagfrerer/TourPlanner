import { Injectable, signal, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Tour } from "../app/models/tour.model";
import { Observable, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TourService {
  private http = inject(HttpClient);
  private readonly apiUrl = "http://localhost:8080/tour";

  // von Anja hinzugefügt: Zentraler Zustand für das gesamte Frontend
  private readonly _tours = signal<Tour[]>([]);
  public readonly tours = this._tours.asReadonly();

  getAllTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.apiUrl).pipe(
      tap(tours => this._tours.set(tours)) // Speichert geladene Touren automatisch im Signal (von anja)
    );
  }

  getTourById(id: string): Observable<Tour> {
    return this.http.get<Tour>(`${this.apiUrl}/${id}`);
  }

  // anja:
  loadToursIfEmpty(): void {
    if (this._tours().length === 0) {
      this.getAllTours().subscribe();
    }
  }

  // anja für upload tour:
  createTour(tourData: any): Observable<Tour> {
    return this.http.post<Tour>(this.apiUrl, tourData).pipe(
      tap(newTour => {
        this._tours.set([...this._tours(), newTour]);
      })
    );
  }
}