import { Component, inject, input, effect } from "@angular/core";
import { StarRating } from "../../star-rating/star-rating";
import { Tour } from "../../../app/models/tour.model";
import { RouterLink } from "@angular/router";
import { TourCardViewModel } from "./tour-card.vm";

@Component({
    selector: 'tour-card',
    templateUrl: './tour-card.html',
    imports:[StarRating, RouterLink],
    providers: [TourCardViewModel]
})

export class TourCard {
    vm = inject(TourCardViewModel);
    tour = input.required<Tour>();
}