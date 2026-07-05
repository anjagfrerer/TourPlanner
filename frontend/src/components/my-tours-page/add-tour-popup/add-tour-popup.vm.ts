import { inject, Injectable, signal } from '@angular/core';
import { TRANSPORT_TYPES } from '../../../app/constants/transport-type.enum';
import { TourService } from '../../../services/tour.service';
import { Tour } from '../../../app/models/tour.model';

type TransportType = (typeof TRANSPORT_TYPES)[keyof typeof TRANSPORT_TYPES];

interface AddTourForm {
  name: string;
  description: string;
  startLocation: string;
  destinationLocation: string;
  transportType: TransportType;
  rating: number;
  childFriendly: boolean;
  publicTour: boolean;
}

@Injectable()
export class AddTourPopupViewModel {
  private service = inject(TourService);

  readonly transportTypes = Object.values(TRANSPORT_TYPES);
  readonly saveStatus = signal<'idle' | 'saving' | 'error'>('idle');
  readonly form = signal<AddTourForm>(this.createEmptyForm());

  setTourToEdit(tour: Tour): void {
    this.form.set({
      name: tour.name,
      description: tour.description,
      startLocation: tour.startLocation,
      destinationLocation: tour.destinationLocation,
      transportType: tour.transportType as TransportType,
      rating: tour.rating,
      childFriendly: tour.childFriendly,
      publicTour: tour.publicTour,
    });
  }

  async saveTour(tourId?: string): Promise<void> {
    this.saveStatus.set('saving');

    try {
      if (tourId) {
        await this.service.updateTour(tourId, this.form());
      } else {
        await this.service.createTour(this.form());
      }
      this.saveStatus.set('idle');
      this.resetForm();
    } catch (error) {
      this.saveStatus.set('error');
      console.error('Failed to save tour:', error);
      throw error;
    }
  }

  resetForm(): void {
    this.form.set(this.createEmptyForm());
  }

  updateName(event: Event): void {
    this.updateForm({ name: this.getInputValue(event) });
  }

  updateDescription(event: Event): void {
    this.updateForm({ description: this.getInputValue(event) });
  }

  updateStartLocation(event: Event): void {
    this.updateForm({ startLocation: this.getInputValue(event) });
  }

  updateDestinationLocation(event: Event): void {
    this.updateForm({ destinationLocation: this.getInputValue(event) });
  }

  updateTransportType(event: Event): void {
    this.updateForm({ transportType: this.getInputValue(event) as TransportType });
  }

  updateRating(event: Event): void {
    const rating = Number(this.getInputValue(event));
    this.updateForm({ rating: Number.isNaN(rating) ? 0 : rating });
  }

  updateChildFriendly(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.updateForm({ childFriendly: isChecked });
  }

  updatePublicTour(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.updateForm({ publicTour: isChecked });
  }

  private updateForm(changes: Partial<AddTourForm>): void {
    this.form.update(currentForm => ({
      ...currentForm,
      ...changes,
    }));
  }

  private getInputValue(event: Event): string {
    return (event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).value;
  }

  private createEmptyForm(): AddTourForm {
    return {
      name: '',
      description: '',
      startLocation: '',
      destinationLocation: '',
      transportType: TRANSPORT_TYPES.HIKING,
      rating: 0,
      childFriendly: false,
      publicTour: true,
    };
}
}
