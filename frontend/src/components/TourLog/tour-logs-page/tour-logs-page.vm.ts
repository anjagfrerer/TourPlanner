import { Injectable, inject, computed, effect } from "@angular/core";
import { TourService } from "../../../services/tour.service";
import { TourLogService } from "../../../services/tourlog.service";
import { SearchService } from "../../../services/search.service";

@Injectable({
  providedIn: 'root' // von Anja: im gesamten Projekt als Singelton verfügbar
})
export class TourLogsViewModel {
  private tourLogsService = inject(TourLogService);
  private tourService = inject(TourService);
  private readonly searchService = inject(SearchService);

  constructor() {
    this.tourService.loadToursIfEmpty();

    effect(() => {
      const currentSearchTerm = this.searchService.searchTerm();
      this.tourLogsService.getAllTourLogsByUser(currentSearchTerm);
    });
  }

  public getAllTourLogsByUser() {
    this.tourLogsService.getAllTourLogsByUser(this.searchService.searchTerm());
  }

  filteredLogs = computed(() => { 
    const filters = this.searchService.activeFilters(); 
    
    let result = this.tourLogsService.myLogs();

    if (filters.transport && filters.transport !== '') { 
      result = result.filter(log => { 
        const associatedTour = this.tourService.allTours().find(t => t.id === log.tourId);
        return associatedTour?.transportType === filters.transport; 
      }); 
    } 

    if (filters.ratings && filters.ratings.length > 0) { 
      result = result.filter(log => filters.ratings.includes(log.rating)); 
    } 

    if (filters.maxDistance) { 
      result = result.filter(log => log.totalDistanceKm <= filters.maxDistance); 
    } 

    if (filters.maxDuration) { 
      const maxMinutes = filters.maxDuration * 60; 
      result = result.filter(log => { 
        const logMinutes = log.totalTimeMin || 0; 
        return logMinutes <= maxMinutes; 
      }); 
    } 

    return result; 
  });
}
