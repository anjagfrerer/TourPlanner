import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TourPopupViewModel } from '../../TourLog/tour-popup/tour-popup.vm';
import { AddTourPopupViewModel } from './add-tour-popup.vm';

@Component({
  selector: 'add-tour-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-tour-popup.html',
  providers: [AddTourPopupViewModel],
})
export class AddTourPopupComponent {
  constructor(public vm: AddTourPopupViewModel) {}
}