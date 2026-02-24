import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchInput } from "../components/search/search-input";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SearchInput],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TourPlanner');
}