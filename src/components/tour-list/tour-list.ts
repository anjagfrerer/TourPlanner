import { Component } from "@angular/core";
import { TourCard } from "../tour-card/tour-card";

@Component({
    selector: 'tour-list',
    templateUrl: './tour-list.html',
    imports: [TourCard]
})

export class TourList {
}