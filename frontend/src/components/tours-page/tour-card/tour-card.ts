import { Component, inject, input, output } from "@angular/core";
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
    edit = output<Tour>();
    deleteTour = output<Tour>();

    onEdit(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.edit.emit(this.tour());
    }

    onDelete(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.deleteTour.emit(this.tour());
    }
}
