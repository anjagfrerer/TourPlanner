import { computed, Injectable, signal } from "@angular/core";

@Injectable()
export class SidebarViewModel {
    title = 'Sidebar';
    count = signal(0);
    doubled = computed(() => this.count() * 2);
 /** wird gelöscht in zukunft */
    increment(): void {
        this.count.update(v => v + 1);
    }
    reset(): void {
        this.count.set(0);
    }
}