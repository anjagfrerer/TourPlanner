import { Component, inject, input, OnInit, signal } from "@angular/core";
import {ActivatedRoute} from '@angular/router';
import { StarRating } from "../star-rating/star-rating";
import { BackButton } from "../back-button/back-button";
import { TourLogsItemComponent } from "../TourLog/tour-log-item/tour-log-item"
import { TourDetailPageViewModel } from "./tour-detail-page.vm"
import { MapFacade } from "../../services/MapFacade";

// ViewModel
@Component({
    selector: 'tour-detail',
    templateUrl: './tour-detail-page.html',
    imports: [StarRating, BackButton, TourLogsItemComponent],
    providers: [TourDetailPageViewModel]
})

export class TourDetailComponent implements OnInit {
    private activatedRoute = inject(ActivatedRoute);
    //private mapFacade = inject(MapFacade);
    vm = inject(TourDetailPageViewModel);

    ngOnInit(){
       const tourId : number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
       //const lat = 48.2082;
       //const lng = 16.3738;

       this.vm.loadTourById(tourId);
       this.vm.loadTourLogByTourId(tourId);
       //this.mapFacade.initMap("map");
       //this.mapFacade.addMarker(lat, lng);
    }
}