import { Injectable } from '@angular/core';
import { Tour } from '../app/models/tour.model';

@Injectable({
    providedIn: 'root'
})

export class ExportService {

    exportTourAsJson(tour: Tour): void {
        if (!tour) return;

        // Filter Methode
        // JSON.stringify Replacer als zweiten Parameter
        // Jedes Mal, wenn ein Schlüssel (Key) mit einem dieser Namen auftaucht, 'undefined' zurückgeben
        const jsonString = JSON.stringify(tour, (key, value) => {
            const forbiddenKeys = [
                'password',
                'authorities',
                'accountNonExpired',
                'accountNonLocked',
                'credentialsNonExpired',
                'enabled'
            ];

            if (forbiddenKeys.includes(key)) {
                return undefined; // Feld wird gelöscht
            }
            return value; // Alle anderen Felder bleiben normal
        }, 2);

        // JSON-String "URL-sicher" machen; wandelt Sonderzeichen in Prozent-Codes um 
        // data: es kommen Live-Daten direkt aus dem Code, kein Link zu einer Website 
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonString);

        // Variable umbenannt, um den TypeScript-Fehler (TS2451) zu verhindern
        const myExportAnchor = document.body.appendChild(document.createElement('a'));

        // link verweist nun auf dataStr 
        myExportAnchor.setAttribute("href", dataStr);

        // zwingt Browser, den Link beim Klicken herunterzuladen, anstatt ihn als Website zu öffnen 
        myExportAnchor.setAttribute("download", `tour-${tour.name.replace(/\s+/g, '_').toLowerCase()}.json`);

        // simuliert click 
        myExportAnchor.click();

        // löscht link wieder aus html 
        myExportAnchor.remove();
    }
}