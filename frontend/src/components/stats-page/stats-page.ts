import { Component, inject } from "@angular/core";
import { StatsCardComponent } from "../stats-card/stats-card";
import { StatsPageViewModel } from "./stats-page.vm";

@Component({
    selector: 'stats-page',
    standalone: true,
    templateUrl: './stats-page.html',
    imports: [StatsCardComponent],
    providers: [StatsPageViewModel]
})
export class StatsPageComponent {
    vm = inject(StatsPageViewModel);
}