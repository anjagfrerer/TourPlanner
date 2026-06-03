import { Component } from "@angular/core";
import { SearchInput } from "../search/search-input";

@Component({
  selector: 'banner',
  templateUrl: './banner.html',
  styleUrl: './banner.css',
  imports: [SearchInput]
})

export class BannerComponent {}
