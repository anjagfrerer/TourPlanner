import { Injectable, signal, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Tour } from "../app/models/tour.model";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TourService {
  private http = inject(HttpClient);
  private readonly apiUrl = "http://localhost:8080/tour";
  
  getAllTours() : Observable<Tour[]> {
    return this.http.get<Tour[]>(this.apiUrl);
  }
}