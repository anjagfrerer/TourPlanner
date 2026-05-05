import { Component } from "@angular/core";
import { TourList } from "./tour-list/tour-list";

// ViewModel
@Component({
    selector: 'tour-page',
    templateUrl: './tours-page.html',
    imports: [TourList]
})

export class ToursPage {
}