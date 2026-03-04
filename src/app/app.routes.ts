import { Routes } from '@angular/router';
import { ToursPageComponent } from '../components/toursPage/toursPage';
import { TourLogsPageComponent } from '../components/tourLogsPage/tourLogsPage';
import { MyToursPageComponent } from '../components/myToursPage/myToursPage';
import { StatsPageComponent } from '../components/statsPage/statsPage';

export const routes: Routes = [
 { path: '', component: ToursPageComponent },
 { path: 'tourLogs', component: TourLogsPageComponent },
 { path: 'myTours', component: MyToursPageComponent },
 { path: 'stats', component: StatsPageComponent },
 { path: '**', redirectTo: '' },
];
