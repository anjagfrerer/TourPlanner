import { Component, computed, inject, input, signal } from "@angular/core";
import { TourLinkComponent } from "../tour-link/tour-link";
import { StarRating } from "../../star-rating/star-rating";
import { TourLogViewModel } from "./tour-log-item.vm";
import { TourLog } from "../../../app/models/tour-log.model";

// ViewModel
@Component({
    selector: 'tour-log-item',
    standalone: true,
    templateUrl: './tour-log-item.html',
    imports: [StarRating]
})

export class TourLogsItemComponent {
    vm = inject(TourLogViewModel);
    tourLog = input.required<TourLog>();
}