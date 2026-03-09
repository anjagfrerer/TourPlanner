import { Component, computed, signal } from "@angular/core";
import { ToursListComponent } from "../toursList/toursList";

// ViewModel
@Component({
    selector: 'toursPage',
    standalone: true,
    templateUrl: './toursPage.html',
    styleUrls: ['./toursPage.css'],
    imports: [ToursListComponent],
})

export class ToursPageComponent {
}