import { Component, computed, signal } from "@angular/core";
import { ToursListComponent } from "../Tour/toursList/toursList";

// ViewModel
@Component({
    selector: 'my-tours-page',
    standalone: true,
    templateUrl: './my-tours-page.html',
    imports: [ToursListComponent],
})

export class MyToursPageComponent {
}