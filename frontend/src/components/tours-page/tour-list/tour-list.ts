import { Component, computed, effect, inject, input } from "@angular/core";
import {ActivatedRoute} from '@angular/router';
import { TourCard } from "../tour-card/tour-card";
import { TourListViewModel } from "./tour-list.vm";
import { Tour } from "../../../app/models/tour.model";
import { TourService } from "../../../services/tour.service";
import { SearchService } from "../../../services/search.service";

@Component({
    selector: 'tour-list',
    templateUrl: './tour-list.html',
    imports: [TourCard]
})

export class TourList {
    vm = inject(TourListViewModel);
    activatedRoute = inject(ActivatedRoute);
    tours = input<Tour[] | null>(null);
    private tourService = inject(TourService);
    private readonly searchService = inject(SearchService);
    
    displayedTours = computed(() => this.tours() ?? this.vm.filteredTours());

    constructor() {
        effect(() => {
            if (this.tours() === null) {
                const currentSearchTerm = this.searchService.searchTerm();
                this.tourService.getAllTours(currentSearchTerm);
            }
        });
    }
}
