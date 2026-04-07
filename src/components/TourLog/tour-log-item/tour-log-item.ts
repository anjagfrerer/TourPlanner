import { Component, computed, effect, inject, input, signal } from "@angular/core";
import { TourLinkComponent } from "../tour-link/tour-link";
import { StarRating } from "../../star-rating/star-rating";
import { TourLogItemViewModel } from "./tour-log-item.vm";
import { TourLog } from "../../../app/models/tour-log.model";

// ViewModel
@Component({
    selector: 'tour-log-item',
    standalone: true,
    templateUrl: './tour-log-item.html',
    imports: [StarRating],
    providers: [TourLogItemViewModel]
})

export class TourLogsItemComponent {
  vm = inject(TourLogItemViewModel);
  // Das ist dein Signal-Input
  tourLog = input.required<TourLog>();

  constructor() {
    // Jedes Mal, wenn sich tourLog() ändert, aktualisieren wir das VM
    effect(() => {
      this.vm.setTourLog(this.tourLog());
    });
  }

  visitTour() {
    this.vm.visitTour();
  }
}