import { Injectable, signal, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Tour } from "../app/models/tour.model";
import { LoadingState } from "../app/models/loading-state.model";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TourService {
  private http = inject(HttpClient);
  private readonly apiUrl = "http://localhost:8080/tour";
  private readonly _tourStatus = signal<LoadingState>('idle');

  getAllTours() {
    this._tourStatus.set('loading');
    this.http.get<Tour[]>(this.apiUrl).subscribe({
      next: (response) => {
        this._tourStatus.set('success');
        console.log('Tours fetched successfully:', response);
      },
      error: (err) => {
        this._tourStatus.set('error');
        console.log('Error during fetching Tours:', err);
      }
    });
    this._tourStatus.set('idle');
  }
}