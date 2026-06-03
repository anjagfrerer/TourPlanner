import { isPlatformBrowser } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { AuthDto } from "../app/models/auth.models";

@Injectable({ providedIn: 'root'})
export class AuthService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = "http://localhost:8080/users"

    private readonly _token = signal<string | null>(this.getInitialToken());
    
    readonly token = this._token.asReadonly();

    readonly isLoggedIn = computed(() => this._token() !== null);
    
    register(credentials: AuthDto): Promise<string> {
        return firstValueFrom(this.http.post(`${this.apiUrl}/register`, credentials, { responseType: 'text'}));
    }

    async login(credentials: AuthDto): Promise<void> {
        const response = await firstValueFrom(
        // 1. Hier 'credentials' DIREKT ohne extra geschweifte Klammern übergeben!
        this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials)
        );
  
        this._token.set(response.token);
  
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', response.token);
        }
    }

    logout(): void {
        this._token.set(null);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
        }
    }

    private getInitialToken(): string | null {
        if(typeof window !== 'undefined') {
            return localStorage.getItem('token')
        }
        return null;
    }

}