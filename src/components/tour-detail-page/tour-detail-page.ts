import { Component, computed, signal } from "@angular/core";
import { StarRating } from "../star-rating/star-rating";
import { BackButton } from "../back-button/back-button";

// ViewModel
@Component({
    selector: 'tour-detail',
    templateUrl: './tour-detail-page.html',
    imports: [StarRating, BackButton],
})

export class TourDetailComponent {

}