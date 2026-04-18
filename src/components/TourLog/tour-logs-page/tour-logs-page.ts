import { Component, computed, inject, signal } from "@angular/core";
import { TourPopupComponent } from "../tour-popup/tour-popup";
import { TourLogsItemComponent } from "../tour-log-item/tour-log-item";
import { TourLog } from "../../../app/models/tour-log.model";
import { TourLogItemViewModel } from "../tour-log-item/tour-log-item.vm";
import { CommonModule } from "@angular/common";
import { TourLogService } from "../../../services/TourLogService";

// ViewModel
@Component({
    selector: 'tourLogsPage',
    standalone: true,
    templateUrl: './tour-logs-page.html',
    imports: [TourPopupComponent, TourLogsItemComponent,CommonModule],
})

export class TourLogsPageComponent {
  public tourLogService = inject(TourLogService)
}