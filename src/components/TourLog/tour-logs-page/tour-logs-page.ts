import { Component, computed, signal } from "@angular/core";
import { TourPopupComponent } from "../tour-popup/tour-popup";

// ViewModel
@Component({
    selector: 'tourLogsPage',
    standalone: true,
    templateUrl: './tour-logs-page.html',
    imports: [TourPopupComponent],
})

export class TourLogsPageComponent {
}