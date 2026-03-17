import { Component } from "@angular/core";
import { StarRating } from "../star-rating/star-rating";

@Component({
    selector: 'tour-card',
    templateUrl: './tour-card.html',
    imports:[StarRating]
})

export class TourCard {}