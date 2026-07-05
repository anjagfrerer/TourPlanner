import { computed, Injectable, signal, inject, effect } from "@angular/core";
import { Tour } from "../../app/models/tour.model";
import { TourService } from "../../services/tour.service";
import { ExportService } from "../../services/export.service";
import { SearchService } from "../../services/search.service";

@Injectable()
export class MyToursPageViewModel {
    private tourService = inject(TourService);
    isAddPopupOpen = signal(false);
    selectedTour = signal<Tour | null>(null);
    
    public tourStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle'); // für potenziellen ladebalken
    
    private readonly searchService = inject(SearchService);
    private exportService = inject(ExportService);

    // anja: (musste leider subscribe auflösen und es so machen, weil sonst die backend suche nicht geklappt hat in den tours)
    constructor() {
        effect(() => {
            const currentSearchTerm = this.searchService.searchTerm();
            this.tourService.getMyTours(currentSearchTerm);
        });
    }

    tours = computed(() => {
        const myTours = this.tourService.myTours();
        const filters = this.searchService.activeFilters();

        return myTours.filter(tour => {
            if (filters.transport && tour.transportType !== filters.transport) {
                return false;
            }

            if (filters.ratings && filters.ratings.length > 0) {
                if (!filters.ratings.includes(tour.rating)) {
                    return false;
                }
            }

            if (filters.maxDistance && tour.distance > filters.maxDistance) {
                return false;
            }

            if (filters.maxDuration) {
                const durationAsNumber = parseInt(tour.estimatedTime, 10) || 0;
                if (durationAsNumber > filters.maxDuration) {
                    return false;
                }
            }
            return true;
        });
    });
    
    // anja: für import einer tour
    async loadMyTours(): Promise<void> {
        await this.tourService.getMyTours(this.searchService.searchTerm());
    }

    public async onFileSelected(event: Event): Promise<void> {

        // "das ist ein Input Element, wo man files auswählen kann!"
        const input = event.target as HTMLInputElement;

        // falls auf abbrechen geklickt wurde bzw. kein file ausgewählt wurde
        if (!input.files || input.files.length === 0) return;

        // input erlaubt nur eine datei
        const file = input.files[0];

        // Sicherheits-Check
        if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
            alert('Please select a valid .json file.');
            return;
        }

        try {
            this.tourStatus.set("loading");

            // logik an den ExportService übergeben
            const preparedTourPayload = await this.exportService.importTourFromJson(file);

            // an den TourService zur Backend-Übertragung übergeben
            const savedTour = await this.tourService.createTour(preparedTourPayload);
            console.log('Successfully imported:', savedTour);

            this.tourStatus.set("success");

            // liste neu laden, damit importierte Tour gleich sichtbar wird
            await this.tourService.getMyTours(this.searchService.searchTerm());

        } catch (error: any) {
            this.tourStatus.set("error");
            console.error('Import failed:', error);
            const message = error?.error?.message || error?.message || (typeof error === 'string' ? error : 'Unknown Error during Import.');
            alert(message);
        }
    }

    openAddPopup() {
        this.selectedTour.set(null);
        this.isAddPopupOpen.set(true);
    }

    closeAddPopup() {
        this.isAddPopupOpen.set(false);
        this.selectedTour.set(null);
    }

    openEditPopup(tour: Tour) {
        this.selectedTour.set(tour);
        this.isAddPopupOpen.set(true);
    }

    async deleteTour(tour: Tour): Promise<void> {
        if (!window.confirm(`Are you sure you want to delete "${tour.name}"?`)) {
            return;
        }

        try {
            this.tourStatus.set("loading");
            await this.tourService.deleteTour(tour.id);
            this.tourStatus.set("success");
        } catch (error: any) {
            this.tourStatus.set("error");
            console.error('Delete failed:', error);
            const message = error?.error?.message || error?.message || 'Unknown Error during Delete.';
            alert(message);
        }
    }
}

/**
 * $event = {
  type: "change",
  timeStamp: 24504.2,
  target: {                
    id: "tour-file-upload",
    value: "C:\\fakepath\\tour.json",
    files: [               
      {
        name: "tour-kahlenberg.json",
        size: 1450,        // Byte-Größe
        type: "application/json",
        lastModified: 1715873922000
      }
    ]
  }
}
 */
