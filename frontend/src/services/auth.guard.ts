import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService)
    const router = inject(Router)

    if(authService.isLoggedIn()) {
        return true;
    }

    return router.createUrlTree(['/login']);
}

/**
 * CanActivateFn
 * - datentyp von Angular
 * - beschreibt, ob eine bestimmte Route (bzw. Seite) aktiviert werden darf
 * - muss true, false oder UrlTree zurückgeben
 * 
 * (route, state) =>
 * - parameter dieser fkt
 * - angular befüllt die parameter wenn ein user versucht, die Seite zu wechseln
 * - route: Route, die der User betreten möchte (hier z.B. id drinnen oder query params)
 * - state: zustand des Routers, exakter Pfad z.B. /tours
 * 
 * createUrlTree
 * - Navigationsobjekt, dass zur /login Route führt
 */