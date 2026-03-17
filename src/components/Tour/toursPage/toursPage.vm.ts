import { computed, Injectable, signal } from "@angular/core";

@Injectable()
export class ToursPageViewModel {
    title = 'ToursPage';
    // Model state as signals
    count = signal(0);
    doubled = computed(() => this.count() * 2);
 
    // ViewModel behavior
    increment(): void {
        this.count.update(v => v + 1);
    }
    reset(): void {
        this.count.set(0);
    }
}