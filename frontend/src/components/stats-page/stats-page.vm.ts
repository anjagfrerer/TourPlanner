import { Injectable, inject, signal, computed } from "@angular/core";
import { TourLogService } from "../../services/tourlog.service";

@Injectable()
export class StatsPageViewModel {
    private readonly tourLogService = inject(TourLogService);

    constructor() {
        // lädt beim Erstellen die Logs des eingeloggten Users
        this.tourLogService.getAllTourLogsByUser();
    }

    private readonly logs = this.tourLogService.logs;

    readonly completedToursCount = computed(() => {
        const uniqueTourIds = new Set(this.logs().map(log => log.tourId));
        return uniqueTourIds.size;
    });

    readonly totalDistanceKm = computed(() =>
        this.logs().reduce((sum, log) => sum + (log.totalDistanceKm ?? 0), 0)
    );

    readonly totalHours = computed(() => {
        const totalMinutes = this.logs().reduce((sum, log) => sum + (log.totalTimeMin ?? 0), 0);
        const hours = totalMinutes / 60;
        return Math.round(hours * 100) / 100;
    });
}