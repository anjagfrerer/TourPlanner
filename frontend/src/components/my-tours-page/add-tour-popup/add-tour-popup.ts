import { Component, effect, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTourPopupViewModel } from './add-tour-popup.vm';
import { Tour } from '../../../app/models/tour.model';

@Component({
  selector: 'add-tour-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-tour-popup.html',
  providers: [AddTourPopupViewModel],
})
export class AddTourPopupComponent {
  readonly tourToEdit = input<Tour | null>(null);
  readonly close = output<void>();

  constructor(public vm: AddTourPopupViewModel) {
    effect(() => {
      const tour = this.tourToEdit();
      if (tour) {
        this.vm.setTourToEdit(tour);
      }
    });
  }

  async onSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();

    try {
      await this.vm.saveTour(this.tourToEdit()?.id);
      this.close.emit();
    } catch {
      // saveStatus is shown in the template.
    }
  }

  onCancel(): void {
    this.vm.resetForm();
    this.close.emit();
  }
}
