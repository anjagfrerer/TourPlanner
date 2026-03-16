import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { SidebarComponent } from "../components/sidebar/sidebar";
import { ToursPageComponent } from "../components/toursPage/toursPage";
import { HeaderComponent } from "../components/header/header";
import { LoginPageComponent } from '../components/loginPage/loginPage';

/**
 * Root: Komponente, mit der Angular die ganze App startet
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, SidebarComponent, LoginPageComponent, ToursPageComponent, HeaderComponent ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TourPlanner');
}