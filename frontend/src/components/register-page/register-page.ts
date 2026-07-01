import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink], // Komplett leer! Kein FormsModule oder ReactiveFormsModule nötig
  templateUrl: './register-page.html'
})
export class RegisterComponent {
  // Moderne Signals für reaktiven State
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  username = signal('');
  password = signal('');
  repeatPassword = signal('');
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  async onRegister(event: Event) {
    event.preventDefault(); // Verhindert den klassischen Page-Reload
    this.errorMessage.set(null);
    this.successMessage.set(null);

    try {
      const message = await this.authService.register({
        username: this.username(),
        password: this.password()
      });
      this.successMessage.set(message);
      setTimeout(async () => {
        await this.router.navigate(['/login']);
      }, 2000);
    } catch (error: any) {
      console.log('Registration failed', error);
      this.errorMessage.set('Registration failed. Username might already be taken.');
    }
  }
}