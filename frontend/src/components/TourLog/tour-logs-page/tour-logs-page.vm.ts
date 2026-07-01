import { Injectable, inject, signal, Signal, computed } from "@angular/core";
import { TourService } from "../../../services/TourService";
import { Tour } from "../../../app/models/tour.model";
import { LoadingState } from "../../../app/models/loading-state.model";
import { finalize, Observable } from "rxjs";
import { TourLogService } from "../../../services/TourLogService";
import { SearchService } from "../../../services/SearchService";

@Injectable({
    providedIn: 'root' // von Anja: im gesamten Projekt als Singelton verfügbar
})
export class TourLogsViewModel {
    private tourLogsService = inject(TourLogService);
    private tourService = inject(TourService);
    private readonly searchService = inject(SearchService);
    logs = signal<Tour[]>([]);

    public getAllTourLogsByUser() {
      this.tourLogsService.getAllTourLogsByUser();
    }

    filteredLogs = computed(() => {
      const search = this.searchService.searchTerm().toLowerCase().trim();
      const filters = this.searchService.activeFilters();
      let result = this.tourLogsService.logs();

      if (search) {
        result = result.filter(log => 
          log.comment && log.comment.toLowerCase().includes(search)
        );
      }

      if (filters.transport && filters.transport !== '') { 
        result = result.filter(log => { 
          const associatedTour = this.tourService.tours().find(t => t.id === log.tourId); 
        
          return associatedTour?.transportType === filters.transport; 
        }); 
      }

      if (filters.ratings && filters.ratings.length > 0) {
        result = result.filter(log => filters.ratings.includes(log.rating));
      }

      if (filters.maxDistance) {
        result = result.filter(log => log.totalDistanceKm <= filters.maxDistance);
      }

      // slider liefert Stunden, aber Log speichert Minuten (* 60)
      if (filters.maxDuration) {
        const maxMinutes = filters.maxDuration * 60;
        
        result = result.filter(log => {
          const logMinutes = parseInt(log.time, 10) || 0; 
          return logMinutes <= maxMinutes;
        });
      }

      return result;
    });
}