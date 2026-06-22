import { Component, inject } from "@angular/core";
import { SearchInput } from "../search/search-input";
import { SearchService } from "../../services/SearchService";
import { Router } from "@angular/router";

@Component({
  selector: 'banner',
  templateUrl: './banner.html',
  imports: [SearchInput],
  styleUrl: './banner.css'
})
export class BannerComponent {
  private searchService = inject(SearchService);
  public router = inject(Router);

  handleSearch(text: string): void {
    this.searchService.searchTerm.set(text);
  }
}