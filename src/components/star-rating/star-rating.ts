import { Component, inject, input } from "@angular/core";
import { StarRatingViewModel } from "./star-rating.vm";

@Component({
    selector: 'star-rating',
    templateUrl: './star-rating.html',
    providers: [StarRatingViewModel]
})

export class StarRating {
    vm = inject(StarRatingViewModel);
    stars = input.required<number>();
}