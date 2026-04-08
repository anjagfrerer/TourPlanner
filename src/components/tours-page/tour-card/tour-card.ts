import { Component, inject, input, effect } from "@angular/core";
import { StarRating } from "../../star-rating/star-rating";
import { TourCardViewModel } from "./tour-card.vm";
import { Tour } from "../../../app/models/tour.model";

@Component({
    selector: 'tour-card',
    templateUrl: './tour-card.html',
    imports:[StarRating],
    providers: [TourCardViewModel]
})

export class TourCard {
    vm = inject(TourCardViewModel);
    tour = input.required<Tour>();
}