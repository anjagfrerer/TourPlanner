import { Component, effect, inject } from "@angular/core";
import { TourList } from "./tour-list/tour-list";
import { TourListViewModel } from "./tour-list/tour-list.vm";
import { BannerComponent } from "../banner/banner";
import { SearchService } from "../../services/search.service";
import { TourService } from "../../services/tour.service";

// ViewModel
@Component({
    selector: 'tour-page',
    templateUrl: './tours-page.html',
    imports: [TourList, BannerComponent]
})

export class ToursPage {
    tourVm = inject(TourListViewModel);
    private readonly searchService = inject(SearchService);
    private readonly tourService = inject(TourService);

    constructor() {
        effect(() => {
            const currentSearchTerm = this.searchService.searchTerm();
            this.tourService.getAllTours(currentSearchTerm);
        });
    }
}
