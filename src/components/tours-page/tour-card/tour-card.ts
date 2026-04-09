import { Component, inject, input, effect } from "@angular/core";
import { StarRating } from "../../star-rating/star-rating";
import { TourCardViewModel } from "./tour-card.vm";
import { Tour } from "../../../app/models/tour.model";
import { RouterLink } from "@angular/router";
import { TourDetailPageViewModel } from "../../tour-detail-page/tour-detail-page.vm";

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