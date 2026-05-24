import { HttpInterceptorFn } from "@angular/common/http";
import { AuthService } from "./AuthService";
import { inject } from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const token = authService.token();

    if(token) {
        const clonedRequest = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next(clonedRequest);        
    }
    return next(req);
}

/**
 * wenn eine http Anfrage ausgelöst wird
 * (sei es Request oder Response),
 * wandert sie durch den Interceptor. 
 * 
 * wir verwenden req.clone(), weil man einen
 * bestehenden Request nicht einfach modifizieren darf.
 * Man kann mehrere Interceptoren haben und so kommen
 * sie sich auch nicht in die Quere.
 * 
 * Wieso next und nicht einfach return?
 * - "Fertig mit der Arbeit, nexter Schritt (next) -
 * mache weiter mit der Arbeit"
 * - könnte z.B. nächster Interceptor sein
 */