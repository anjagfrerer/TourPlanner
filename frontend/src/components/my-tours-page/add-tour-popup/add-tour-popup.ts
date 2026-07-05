import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTourPopupViewModel } from './add-tour-popup.vm';

@Component({
  selector: 'add-tour-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-tour-popup.html',
  providers: [AddTourPopupViewModel],
})
export class AddTourPopupComponent {
  readonly close = output<void>();

  constructor(public vm: AddTourPopupViewModel) {}

  async onSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();

    try {
      await this.vm.saveTour();
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
