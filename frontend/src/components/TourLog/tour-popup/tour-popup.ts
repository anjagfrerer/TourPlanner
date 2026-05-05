import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TourPopupViewModel } from '../../TourLog/tour-popup/tour-popup.vm';

@Component({
  selector: 'app-tour-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tour-popup.html',
  providers: [TourPopupViewModel],
})
export class TourPopupComponent {
  constructor(public vm: TourPopupViewModel) {}
}