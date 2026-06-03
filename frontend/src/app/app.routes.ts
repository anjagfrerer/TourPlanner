/**
 * Hier importiert man die Angular Components, die dann später
 * angezeigt werden sollen
 */
import { Routes } from '@angular/router';
import { ToursPage } from '../components/tours-page/tours-page';
import { TourLogsPageComponent } from '../components/TourLog/tour-logs-page/tour-logs-page';
import { MyToursPageComponent } from '../components/my-tours-page/my-tours-page';
import { StatsPageComponent } from '../components/stats-page/stats-page';
import { TourDetailComponent } from '../components/tour-detail-page/tour-detail-page';
import { LoginComponent } from '../components/login-page/login-page';
import { RegisterComponent } from '../components/register-page/register-page';
import { authGuard } from '../services/auth.guard';

export const routes: Routes = [
 { path: '', component: ToursPage, canActivate: [authGuard] }, // Pfad leer http://localhost:4200/
 { path: 'tourLogs', component: TourLogsPageComponent, canActivate: [authGuard] }, // http://localhost:4200/tourLogs
 { path: 'myTours', component: MyToursPageComponent, canActivate: [authGuard] },
 { path: 'stats', component: StatsPageComponent, canActivate: [authGuard] },
 { path: 'tour/:id', component: TourDetailComponent, canActivate: [authGuard] },
 { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
 { path: '**', redirectTo: '', canActivate: [authGuard] },
];

/**
 * Angular ist eine Single Page Application. Die Seite wird also nur
 * einmal geladen und danach nicht mehr. Stattdessen tauscht Angular
 * nur Komponenten im <router-outlet> aus.
 * 
 * Hier binden wir den Guard ein und bestimmen alle Routen, die geschützt sein sollen
 */