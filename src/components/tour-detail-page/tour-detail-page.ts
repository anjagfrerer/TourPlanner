import { Component, inject, input, OnInit, signal } from "@angular/core";
import {ActivatedRoute} from '@angular/router';
import { StarRating } from "../star-rating/star-rating";
import { BackButton } from "../back-button/back-button";
import { TourLogsItemComponent } from "../TourLog/tour-log-item/tour-log-item"
import { TourLog } from "../../app/models/tour-log.model";
import { Tour } from "../../app/models/tour.model";
import { TourLogService } from "../../services/TourLogService";
import { TourService } from "../../services/TourService";
import { TourDetailPageViewModel } from "./tour-detail-page.vm"
// ViewModel
@Component({
    selector: 'tour-detail',
    templateUrl: './tour-detail-page.html',
    imports: [StarRating, BackButton, TourLogsItemComponent],
    providers: [TourDetailPageViewModel]
})

export class TourDetailComponent implements OnInit {
    private activatedRoute = inject(ActivatedRoute);
    vm = inject(TourDetailPageViewModel);

    ngOnInit(){
       const tourId : number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
       this.vm.loadTourById(tourId);
    }
}