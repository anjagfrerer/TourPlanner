import { Component, inject } from "@angular/core";
import { TourList } from "./tour-list/tour-list";
import { TourListViewModel } from "./tour-list/tour-list.vm";
import { BannerComponent } from "../banner/banner";

// ViewModel
@Component({
    selector: 'tour-page',
    templateUrl: './tours-page.html',
    imports: [TourList, BannerComponent]
})

export class ToursPage {
    tourVm = inject(TourListViewModel);
}