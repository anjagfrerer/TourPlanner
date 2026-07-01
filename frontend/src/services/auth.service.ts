import { isPlatformBrowser } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { AuthDto } from "../app/models/auth.models";
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = `${environment.apiUrl}/users`;

    private readonly _token = signal<string | null>(this.getInitialToken());

    readonly token = this._token.asReadonly();

    readonly isLoggedIn = computed(() => this._token() !== null);

    register(credentials: AuthDto): Promise<string> {
        return firstValueFrom(this.http.post(`${this.apiUrl}/register`, credentials, { responseType: 'text' }));
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
        if (typeof window !== 'undefined') {
            return localStorage.getItem('token')
        }
        return null;
    }

    // Holt den Usernamen aus dem verschlüsselten Token
    readonly username = computed<string | null>(() => {
        const currentToken = this._token();
        if (!currentToken) return null;

        try {
            // JWT besteht aus: Header.Payload.Signature
            // brauchen mittleren Teil (Payload), also Index 1
            const payloadBase64 = currentToken.split('.')[1];

            // Base64 decodieren und in ein JSON-Objekt umwandeln
            const payloadJson = JSON.parse(atob(payloadBase64));

            // username meistens 'sub'
            return payloadJson.sub || null;
        } catch (error) {
            console.error("Fehler beim Decodieren des JWT-Tokens:", error);
            return null;
        }
    });

}