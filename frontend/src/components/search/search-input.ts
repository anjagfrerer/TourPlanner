import { Component, output, signal, computed } from "@angular/core";

@Component({
    selector: 'search-input',
    templateUrl: './search-input.html',
    styleUrls: ['./search-input.css'],
    standalone: true
})
export class SearchInput {
    searchChanged = output<string>();
    filterChanged = output<any>(); 

    isDropdownOpen = signal<boolean>(false);
    
    selectedTransport = signal<string>(''); // 'BIKE', 'HIKE', 'RUNNING', 'VACATION' oder 'ALL TYPES'
    selectedRatings: number[] = [];

    maxDistance = signal<number>(1000);
    maxDuration = signal<number>(72);

    distanceLimit = computed(() => {
        switch (this.selectedTransport()) {
            case 'RUNNING': return 42;
            case 'HIKING':  return 60;
            case 'BIKING':  return 150;
            case 'VACATION': return 1000;
            default: return 1000;
        }
        });

    durationLimit = computed(() => {
        switch (this.selectedTransport()) {
            case 'RUNNING': return 6;
            case 'HIKING':  return 12;
            case 'BIKING':  return 16;
            case 'VACATION': return 72;
            default: return 72;
        }
    });

    onSearch(value: string): void {
        this.searchChanged.emit(value);
    }

    toggleDropdown() {
        this.isDropdownOpen.update(open => !open);
    }

    selectTransport(transport: string): void {
        this.selectedTransport.set(this.selectedTransport() === transport ? '' : transport);        this.maxDistance.set(this.distanceLimit());
        this.maxDistance.set(this.distanceLimit());
        this.maxDuration.set(this.durationLimit());
        this.applyFilter();
    }

    toggleRating(stars: number): void {
        const index = this.selectedRatings.indexOf(stars);
        if (index > -1) {
            this.selectedRatings.splice(index, 1);
        } else {
            this.selectedRatings.push(stars);
        }
        this.applyFilter();
    }

    isRatingSelected(stars: number): boolean {
        return this.selectedRatings.includes(stars);
    }

    clearFilters(): void {
        this.selectedTransport.set('');
        this.selectedRatings = [];
        this.maxDistance.set(this.distanceLimit());
        this.maxDuration.set(this.durationLimit());
        this.applyFilter();
    }

    applyFilter(): void {
        this.filterChanged.emit({
            transport: this.selectedTransport(),
            ratings: this.selectedRatings,
            maxDistance: this.maxDistance(),
            maxDuration: this.maxDuration()
        });
    }
}