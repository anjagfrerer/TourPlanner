import { Component, inject, input, effect } from "@angular/core";
import { StarRating } from "../../star-rating/star-rating";
import { Tour } from "../../../app/models/tour.model";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'tour-card',
    templateUrl: './tour-card.html',
    imports:[StarRating, RouterLink],
})

export class TourCard {
    tour = input.required<Tour>();
}