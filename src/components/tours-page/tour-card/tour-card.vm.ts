import { signal, Injectable } from "@angular/core";
import { Tour } from "../../../app/models/tour.model";

@Injectable()
export class TourCardViewModel{
    readonly rating = signal(Math.floor(Math.random() * 5) + 1);
}