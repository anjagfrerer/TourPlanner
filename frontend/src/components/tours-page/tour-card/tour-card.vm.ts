import { inject, Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TRANSPORT_TYPES } from "../../../app/constants/transport-type.enum";

@Injectable()
export class TourCardViewModel {
    activatedRoute = inject(ActivatedRoute);
    readonly transportTypeConst = TRANSPORT_TYPES;

    isEditable() {
        const link = this.activatedRoute.snapshot.url[0]?.path;
        return link === "myTours";
    }
}
