import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Coordinates } from "../app/models/routeInformation.model";
import { OpenMeteoCurrentResponse, WeatherInfo } from "../app/models/weather.model";

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://api.open-meteo.com/v1/forecast';

  getCurrentWeather(coordinates: Coordinates): Observable<WeatherInfo> {
    const params = new HttpParams()
      .set('latitude', coordinates.lat)
      .set('longitude', coordinates.lng)
      .set(
        'current',
        'temperature_2m,apparent_temperature,precipitation,weather_code,cloud_cover,wind_speed_10m'
      )
      .set('timezone', 'auto');

    return this.http.get<OpenMeteoCurrentResponse>(this.apiUrl, { params }).pipe(
      map(response => this.toWeatherInfo(response))
    );
  }

  private toWeatherInfo(response: OpenMeteoCurrentResponse): WeatherInfo {
    const current = response.current;
    const condition = this.describeWeather(current.weather_code);

    return {
      temperature: Math.round(current.temperature_2m),
      apparentTemperature: Math.round(current.apparent_temperature),
      precipitation: current.precipitation,
      weatherCode: current.weather_code,
      cloudCover: current.cloud_cover,
      windSpeed: Math.round(current.wind_speed_10m),
      description: condition.description,
      icon: condition.icon,
    };
  }

  private describeWeather(code: number): { description: string; icon: string } {
    if (code === 0) return { description: 'Sunny', icon: 'sunny' };
    if ([1, 2].includes(code)) return { description: 'Partly Cloudy', icon: 'partly_cloudy_day' };
    if (code === 3) return { description: 'Cloudy', icon: 'cloud' };
    if ([45, 48].includes(code)) return { description: 'Fog', icon: 'foggy' };
    if ([51, 53, 55, 56, 57].includes(code)) return { description: 'Light Rain', icon: 'rainy_light' };
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { description: 'Rain', icon: 'rainy' };
    if ([71, 73, 75, 77, 85, 86].includes(code)) return { description: 'Snow', icon: 'ac_unit' };
    if ([95, 96, 99].includes(code)) return { description: 'Thunderstorm', icon: 'thunderstorm' };

    return { description: 'Weather Data', icon: 'thermostat' };
  }
}
