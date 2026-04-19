import { Component, computed, signal } from "@angular/core";
import { RouterLink, RouterLinkActive } from '@angular/router';

// ViewModel
@Component({
    selector: 'sidebar',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './sidebar.html',
    styleUrls: ['./sidebar.css'],
})

export class SidebarComponent {
}