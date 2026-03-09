import { Component, computed, signal } from "@angular/core";
import { ToursListComponent } from "../toursList/toursList";

// ViewModel
@Component({
    selector: 'myToursPage',
    standalone: true,
    templateUrl: './myToursPage.html',
    styleUrls: ['./myToursPage.css'],
    imports: [ToursListComponent],
})

export class MyToursPageComponent {
}