import { Component, inject } from "@angular/core";
import { SearchInput } from "../search/search-input";
import { SearchService } from "../../services/search.service";
import { Router } from "@angular/router";

@Component({
  selector: 'banner',
  templateUrl: './banner.html',
  styleUrls: ['./banner.css'],
  imports: [SearchInput]
})
export class BannerComponent {
  private searchService = inject(SearchService);
  public router = inject(Router);
  
  handleSearch(text: string): void {
    this.searchService.searchTerm.set(text);
  }

  handleFilter(filters: any): void {
    this.searchService.activeFilters.set(filters);
  }
  
}