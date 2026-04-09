import { Component, computed, inject, input, signal } from "@angular/core";
import { Router } from '@angular/router';

// ViewModel
@Component({
    selector: 'tour-link',
    standalone: true,
    templateUrl: './tour-link.html'
})

export class TourLinkComponent {
    router = inject(Router) /* gibt mir das bereits vorhandene Router-Objekt */
    tourId = input.required<number>();

    visitTour() {
        if (!this.tourId()) return;
        this.router.navigate(['/tour', this.tourId()]);
    }
}