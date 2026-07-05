import { inject, Inject, Injectable, signal } from "@angular/core";
import { TourService } from "../../../services/tour.service";
import { ActivatedRoute } from "@angular/router";
import { TRANSPORT_TYPES } from "../../../app/constants/transport-type.enum";

@Injectable()
export class TourCardViewModel {
    tourService = inject(TourService);
    activatedRoute = inject(ActivatedRoute);
    readonly transportTypeConst = TRANSPORT_TYPES;

    isEditable() {
        const link = this.activatedRoute.snapshot.url[0]?.path;
        return link === "myTours";
    }

    modifyTour(){
        console.log("modify");
    }

    deleteTour(id: number){
        console.log("delete");
    }
}