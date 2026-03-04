import { Routes } from '@angular/router';
import { ToursPageComponent } from '../components/toursPage/toursPage';
import { TourLogsPageComponent } from '../components/tourLogsPage/tourLogsPage';

export const routes: Routes = [
 { path: '', component: ToursPageComponent },
 { path: 'tourLogs', component: TourLogsPageComponent },
 { path: '**', redirectTo: '' },
];
