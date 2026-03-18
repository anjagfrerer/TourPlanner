import { Component, inject, input } from "@angular/core";
import { TourCard } from "../tour-card/tour-card";
import { TourListViewModel } from "./tour-list.vm";

@Component({
    selector: 'tour-list',
    templateUrl: './tour-list.html',
    imports: [TourCard],
    providers: [TourListViewModel]
})

export class TourList {
    vm = inject(TourListViewModel);
}