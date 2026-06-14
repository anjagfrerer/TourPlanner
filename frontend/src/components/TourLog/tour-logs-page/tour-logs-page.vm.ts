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
    private readonly searchService = inject(SearchService);

    public getAllTourLogsByUser() {
      this.tourLogsService.getAllTourLogsByUser();
    }

    filteredLogs = computed(() => {
        const search = this.searchService.searchTerm().toLowerCase().trim();
        const allTourLogs = this.tourLogsService.logs();

        if(!search) return allTourLogs;

        return allTourLogs.filter( log =>
            log.comment.toLowerCase().includes(search)
        );
    });
    
}