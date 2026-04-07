import { Component, computed, signal } from "@angular/core";
import { TourPopupComponent } from "../tour-popup/tour-popup";
import { TourLogsItemComponent } from "../tour-log-item/tour-log-item";
import { TourLog } from "../../../app/models/tour-log.model";

// ViewModel
@Component({
    selector: 'tourLogsPage',
    standalone: true,
    templateUrl: './tour-logs-page.html',
    imports: [TourPopupComponent, TourLogsItemComponent],
})

export class TourLogsPageComponent {
tourLogs: TourLog[] = [
  {
    date: '2026-03-17',
    time: '14:30',
    rating: 4,
    difficulty: 6,
    totalDistanceKm: 12.5,
    totalTimeMin: 90,
    comment: 'Nice tour, a bit tiring'
  },
  {
    date: '2026-03-18',
    time: '10:00',
    rating: 5,
    difficulty: 4,
    totalDistanceKm: 8,
    totalTimeMin: 60,
    comment: 'Easy and relaxing'
  },
  {
    date: '2026-03-18',
    time: '10:00',
    rating: 5,
    difficulty: 4,
    totalDistanceKm: 8,
    totalTimeMin: 60,
    comment: 'Easy and relaxing'
  }
];
}