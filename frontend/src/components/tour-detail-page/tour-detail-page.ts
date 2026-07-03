import { Component, inject, OnInit, signal } from "@angular/core";
import {ActivatedRoute} from '@angular/router';
import { StarRating } from "../star-rating/star-rating";
import { BackButton } from "../back-button/back-button";
import { TourLogsItemComponent } from "../TourLog/tour-log-item/tour-log-item"
import { TourDetailPageViewModel } from "./tour-detail-page.vm"
import { Map } from "./map/map";
import { TourPopupComponent } from "../TourLog/tour-popup/tour-popup";

// ViewModel
@Component({
    selector: 'tour-detail',
    templateUrl: './tour-detail-page.html',
    imports: [StarRating, BackButton, TourLogsItemComponent, TourPopupComponent, Map],
    providers: [TourDetailPageViewModel]
})

export class TourDetailComponent implements OnInit {
    private activatedRoute = inject(ActivatedRoute);
    vm = inject(TourDetailPageViewModel);

    ngOnInit(){
       const tourId : string = this.activatedRoute.snapshot.paramMap.get('id') ?? "";
       this.vm.loadTourById(tourId);
    }
}