import { Component, inject, input, OnInit } from "@angular/core";
import {ActivatedRoute} from '@angular/router';
import { TourCard } from "../tour-card/tour-card";
import { TourListViewModel } from "./tour-list.vm";
import { Tour } from "../../../app/models/tour.model";

@Component({
    selector: 'tour-list',
    templateUrl: './tour-list.html',
    imports: [TourCard],
    providers: [TourListViewModel]
})

export class TourList implements OnInit{
    vm = inject(TourListViewModel);
    activatedRoute = inject(ActivatedRoute);
    
    ngOnInit() {
        this.vm.loadTours();
    }
}