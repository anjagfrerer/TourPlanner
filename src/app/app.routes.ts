/**
 * Hier importiert man die Angular Components, die dann später
 * angezeigt werden sollen
 */
import { Routes } from '@angular/router';
import { ToursPage } from '../components/tours-page/tours-page';
import { TourLogsPageComponent } from '../components/tourLogsPage/tourLogsPage';
import { MyToursPageComponent } from '../components/myToursPage/myToursPage';
import { StatsPageComponent } from '../components/statsPage/statsPage';
import { TourDetailComponent } from '../components/tour-detail-page/tour-detail-page';

export const routes: Routes = [
 { path: '', component: ToursPage }, // Pfad leer http://localhost:4200/
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