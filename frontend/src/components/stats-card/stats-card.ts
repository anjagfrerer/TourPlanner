import { Component, computed, input, signal } from "@angular/core";
import { RouterLink, RouterLinkActive } from '@angular/router';

// ViewModel
@Component({
    selector: 'stats-card',
    standalone: true,
    templateUrl: './stats-card.html'
})

export class StatsCardComponent {

    value = input.required<string>();
    description = input.required<string>();
    imgPath = input<string>('assets/stats_1.jpg');
}