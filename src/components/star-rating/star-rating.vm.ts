import { Injectable, signal } from "@angular/core";

@Injectable()
export class StarRatingViewModel {
    rating = signal(3);
}