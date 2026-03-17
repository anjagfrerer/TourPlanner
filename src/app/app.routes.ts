/**
 * Hier importiert man die Angular Components, die dann später
 * angezeigt werden sollen
 */
import { Routes } from '@angular/router';
import { ToursPageComponent } from '../components/Tour/toursPage/toursPage';
import { TourLogsPageComponent } from '../components/TourLog/tour-logs-page/tour-logs-page';
import { MyToursPageComponent } from '../components/my-tours-page/my-tours-page';
import { StatsPageComponent } from '../components/stats-page/stats-page';
import { TourDetailComponent } from '../components/Tour/tourDetail/tourDetail';

export const routes: Routes = [
 { path: '', component: ToursPageComponent }, // Pfad leer http://localhost:4200/
 { path: 'tourLogs', component: TourLogsPageComponent }, // http://localhost:4200/tourLogs
 { path: 'myTours', component: MyToursPageComponent },
 { path: 'stats', component: StatsPageComponent },
 { path: 'tourDetail', component: TourDetailComponent }, // derzeit statisch
 { path: '**', redirectTo: '' },
];

/**
 * Angular ist eine Single Page Application. Die Seite wird also nur
 * einmal geladen und danach nicht mehr. Stattdessen tauscht Angular
 * nur Komponenten im <router-outlet> aus.
 */