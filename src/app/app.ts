import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../components/sidebar/sidebar";
import { ToursPageComponent } from "../components/toursPage/toursPage";
import { HeaderComponent } from "../components/header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, ToursPageComponent, HeaderComponent ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TourPlanner');
}