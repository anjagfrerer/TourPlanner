import { Component, computed, inject, input } from "@angular/core";
import { TourCard } from "../tour-card/tour-card";
import { TourListViewModel } from "./tour-list.vm";
import { Tour } from "../../../app/models/tour.model";

@Component({
    selector: 'tour-list',
    templateUrl: './tour-list.html',
    imports: [TourCard]
})

export class TourList {
    vm = inject(TourListViewModel);
    tours = input<Tour[] | null>(null);
    
    displayedTours = computed(() => this.tours() ?? this.vm.filteredTours());
}
