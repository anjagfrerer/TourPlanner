import { Component, computed, signal } from "@angular/core";
import { RouterLink } from "@angular/router";

// ViewModel
@Component({
    selector: 'toursList',
    standalone: true,
    templateUrl: './toursList.html',
    styleUrls: ['./toursList.css'],
    imports: [RouterLink],
})

export class ToursListComponent {
}