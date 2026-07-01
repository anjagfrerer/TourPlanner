import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink], // Komplett leer! Kein FormsModule oder ReactiveFormsModule nötig
  templateUrl: './login-page.html'
})
export class LoginComponent {
  // Moderne Signals für reaktiven State
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  username = signal('');
  password = signal('');
  errorMessage = signal<string | null>(null); //Für Backend-Fehlermeldungen (z.B. 401 Unauthorized)

  async onLogin(event: Event) {
    event.preventDefault(); // Verhindert den klassischen Page-Reload
    this.errorMessage.set(null);

    try {
      await this.authService.login({
        username: this.username(),
        password: this.password()
      });
      console.log('Login successful');
      await this.router.navigate(['/tours']);

    } catch(error: any) {
      console.error('Login failed', error);
      this.errorMessage.set('Invalid username or password!')
    }
  }
}