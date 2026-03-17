import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { SidebarComponent } from "../components/sidebar/sidebar";
import { ToursPage } from "../components/tours-page/tours-page";
import { HeaderComponent } from "../components/header/header";

/**
 * Root: Komponente, mit der Angular die ganze App startet
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, SidebarComponent, ToursPage, HeaderComponent ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TourPlanner');
}