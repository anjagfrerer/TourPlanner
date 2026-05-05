import { Component, inject, input } from "@angular/core";
import { BackButtonViewModel } from "./back-button.vm";

@Component({
    selector: 'back-button',
    templateUrl: './back-button.html',
    providers: [BackButtonViewModel]
})

export class BackButton {
    vm = inject(BackButtonViewModel);
    height = input<string>("24px");
    width = input<string>("24px");
    fill = input<string>('#FFF');
}