import { inject, Injectable, signal } from "@angular/core";
import { Location } from '@angular/common';

@Injectable()
export class BackButtonViewModel {
    location = inject(Location);
    
    prev() {
        this.location.back();
    }
}