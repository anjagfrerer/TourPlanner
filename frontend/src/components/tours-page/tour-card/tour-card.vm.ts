import { inject, Inject, Injectable, signal } from "@angular/core";
import { TourService } from "../../../services/TourService";
import { ActivatedRoute } from "@angular/router";

@Injectable()
export class TourCardViewModel {
    tourService = inject(TourService);
    activatedRoute = inject(ActivatedRoute);

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