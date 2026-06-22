import { Component, output } from "@angular/core";

@Component({
    selector: 'search-input',
    templateUrl: './search-input.html'
})
export class SearchInput {
    searchChanged = output<string>();

    onSearch(value: string): void {
        this.searchChanged.emit(value);
    }
}