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
    //Jede Komponente bekommt eigene ViewModel-Instanz
    providers: [TourLogItemViewModel]
})

export class TourLogsItemComponent {
  // holt das VM ohne Konstruktor
  vm = inject(TourLogItemViewModel);
  // Signal-Input, Zugriff über this.tourLog(), Pflichtfeld
  tourLog = input.required<TourLog>();

  // Beim Erstellen der Komponente
  constructor() {
    // Jedes Mal, wenn sich tourLog() ändert, wird das hier aufgerufen
    effect(() => {
      // übergibt aktuellen tourLog() Wert an VM
      this.vm.setTourLog(this.tourLog());
    });
  }

  // Leitet Event an VM weiter, glaube aber unnötig hier
  visitTour() {
    this.vm.visitTour();
  }
}