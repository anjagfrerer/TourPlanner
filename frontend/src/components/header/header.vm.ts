import { computed, Injectable, signal } from "@angular/core";

@Injectable()
export class HeaderViewModel {
    title = 'Header';
    count = signal(0);
    doubled = computed(() => this.count() * 2);
 
    increment(): void {
        this.count.update(v => v + 1);
    }
    reset(): void {
        this.count.set(0);
    }
}