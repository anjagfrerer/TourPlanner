import { Component, inject, input } from "@angular/core";
import { Location } from '@angular/common';

@Component({
  selector: 'back-button',
  templateUrl: './back-button.html'
})
export class BackButton {
  private location = inject(Location); // Direkt hier injecten
  
  height = input<string>("24px");
  width = input<string>("24px");
  fill = input<string>('#FFF');

  prev() {
    this.location.back(); // Methode direkt in der Komponente
  }
}