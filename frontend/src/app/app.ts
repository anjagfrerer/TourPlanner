import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { SidebarComponent } from "../components/sidebar/sidebar";
import { HeaderComponent } from "../components/header/header";
import { BannerComponent } from '../components/banner/banner';

/**
 * Root: Komponente, mit der Angular die ganze App startet
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, SidebarComponent, HeaderComponent, BannerComponent ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TourPlanner');
}