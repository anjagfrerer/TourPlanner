import { Component, computed, signal } from "@angular/core";
import { StarRating } from "../star-rating/star-rating";
import { BackButton } from "../back-button/back-button";
import { TourLogsItemComponent } from "../TourLog/tour-log-item/tour-log-item"
import { TourLog } from "../../app/models/tour-log.model";

// ViewModel
@Component({
    selector: 'tour-detail',
    templateUrl: './tour-detail-page.html',
    imports: [StarRating, BackButton, TourLogsItemComponent],
})

export class TourDetailComponent {
    tourlogs = signal<TourLog[]>([]);

}