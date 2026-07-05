import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
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
   router = inject(Router);
  protected readonly title = signal('TourPlanner');
}