import { Component, inject, input } from "@angular/core";

@Component({
    selector: 'star-rating',
    templateUrl: './star-rating.html',
})

export class StarRating {
    stars = input.required<number>();
}