import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coordinates, RouteInformation } from '../app/models/routeInformation.model';
import { WeatherInfo } from '../app/models/weather.model';
import { WeatherService } from './weather.service';

@Injectable({ providedIn: 'root' })
export class WeatherFacade {
  private readonly weatherService = inject(WeatherService);

  getCurrentWeatherForRoute(route: RouteInformation): Observable<WeatherInfo> {
    return this.weatherService.getCurrentWeather(this.getRouteWeatherPoint(route));
  }

  private getRouteWeatherPoint(route: RouteInformation): Coordinates {
    if (route.geometry.length) {
      return route.geometry[Math.floor(route.geometry.length / 2)];
    }

    return {
      lat: (route.start.lat + route.end.lat) / 2,
      lng: (route.start.lng + route.end.lng) / 2,
    };
  }
}
