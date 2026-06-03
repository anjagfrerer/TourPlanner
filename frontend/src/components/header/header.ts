import { Component, inject, signal } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../services/AuthService";

@Component({
    selector: 'header',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './header.html',
    styleUrls: ['./header.css'],
})
export class HeaderComponent {
    public readonly isDropdownOpen = signal<boolean>(false);
    public readonly router = inject(Router);
    public readonly authService = inject(AuthService);
    public readonly isLoggedIn = this.authService.isLoggedIn;

    toggleDropdown() {
        this.isDropdownOpen.update(value => !value);
    }

    closeDropdown(): void {
        this.isDropdownOpen.set(false);
    }

    logout(): void {
       this.closeDropdown();
       this.authService.logout();
       this.router.navigate(['/login']);
    }
}