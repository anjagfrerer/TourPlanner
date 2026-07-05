import { Component, inject, OnInit } from "@angular/core";
import { TourList } from "../tours-page/tour-list/tour-list";
import { MyToursPageViewModel } from "./my-tours-page.vm";
import { AddTourPopupComponent } from "./add-tour-popup/add-tour-popup";

// ViewModel
@Component({
    selector: 'my-tours-page',
    standalone: true,
    templateUrl: './my-tours-page.html',
    imports: [TourList, AddTourPopupComponent],
    providers: [MyToursPageViewModel]
})

export class MyToursPageComponent implements OnInit { 
  vm = inject(MyToursPageViewModel); 

  ngOnInit() { 
    this.loadInitialTours();
  } 

  private async loadInitialTours() {
    await this.vm.loadMyTours();
  }
}
