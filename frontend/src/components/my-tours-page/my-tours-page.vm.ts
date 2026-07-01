import { computed, Injectable, signal, inject } from "@angular/core";
import { Tour } from "../../app/models/tour.model";
import { TourService } from "../../services/tour.service";
import { ExportService } from "../../services/export.service";

@Injectable()
export class MyToursPageViewModel {
    private tourService = inject(TourService);
    //tours = signal<Tour[] | null>(null);
    selectedTour = signal<Tour | null>(null);
    public tourStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle'); // für potenziellen ladebalken

    //HERE TO FIX THE READ-DATA-FROM-BACKEND ISSUE
    //tours = computed(() => {
    //const allTours = this.tourService.getAllTours()(); // Signal auslesen 
    //return allTours.filter(tour => tour.author === "Anja");
    //});

    /*loadTourById(id: number) {
        const loadedTour = this.tourService.getTourById(id);
        //DEBUG console.log("getTourById(id) triggered: "+ id);
        this.selectedTour.set(loadedTour);
    }*/

    openAddLogPopup() {
        //const currentTour = this.selectedTour()
        //this.tourService.startNewTour()
    }

    // Anja für import einer tour
    public onFileSelected(event: Event): void {

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

        // asynchroner file reader
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const importedTour = JSON.parse(reader.result as string);

                // Minimale Validierung der Pflichtfelder
                if (!importedTour.name) {
                    alert('Invalid tour format: Name missing.');
                    return;
                }

                // Tour ans Backend übertragen
                this.saveImportedTour(importedTour);


            } catch (error) {
                console.error('Error parsing the JSON file:', error);
                alert('The file could not be read.');
            }
        };

        reader.readAsText(file);

        // Input zurücksetzen, damit dieselbe Datei sofort wieder gewählt werden könnte
        input.value = '';
    }

    private saveImportedTour(tourData: any): void {
        this.tourStatus.set("loading");

        // destructuring
        const { id, createdBy, routeInformation, ...cleanTourData } = tourData;
        const finalPayload = { ...cleanTourData, routeInformation: null };

        this.tourService.createTour(finalPayload).subscribe({
            next: (savedTour) => {
                console.log('Successfully imported:', savedTour);
                this.tourStatus.set("success");
                // lädt die gesamtliste neu:
                this.tourService.getAllTours().subscribe();
            },
            error: (err) => {
                this.tourStatus.set("error");
                console.error('Backend error during import:', err);
                alert('Error saving the imported tour in the backend.');
            }
        });
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