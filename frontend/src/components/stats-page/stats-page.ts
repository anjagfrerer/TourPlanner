import { Component, computed, signal } from "@angular/core";
import { StatsCardComponent } from "../stats-card/stats-card";

// ViewModel
@Component({
    selector: 'stats-page',
    standalone: true,
    templateUrl: './stats-page.html',
    imports: [StatsCardComponent]
})

export class StatsPageComponent {
}