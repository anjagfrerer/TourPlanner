import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(WeatherService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should request current weather from Open-Meteo with the route coordinates', () => {
    service.getCurrentWeather({ lat: 48.2082, lng: 16.3738 }).subscribe();

    const request = httpTesting.expectOne(req =>
      req.url === 'https://api.open-meteo.com/v1/forecast'
    );

    expect(request.request.method).toBe('GET');
    expect(request.request.params.get('latitude')).toBe('48.2082');
    expect(request.request.params.get('longitude')).toBe('16.3738');
    expect(request.request.params.get('timezone')).toBe('auto');
    expect(request.request.params.get('current')).toContain('temperature_2m');
    expect(request.request.params.get('current')).toContain('weather_code');

    request.flush(openMeteoResponse({ weather_code: 0 }));
  });

  it('should map sunny Open-Meteo weather data to WeatherInfo', () => {
    service.getCurrentWeather({ lat: 48.2082, lng: 16.3738 }).subscribe(weather => {
      expect(weather.temperature).toBe(21);
      expect(weather.apparentTemperature).toBe(20);
      expect(weather.precipitation).toBe(0);
      expect(weather.weatherCode).toBe(0);
      expect(weather.cloudCover).toBe(5);
      expect(weather.windSpeed).toBe(13);
      expect(weather.description).toBe('Sunny');
      expect(weather.icon).toBe('sunny');
    });

    const request = httpTesting.expectOne(req =>
      req.url === 'https://api.open-meteo.com/v1/forecast'
    );
    request.flush(openMeteoResponse({
      temperature_2m: 20.6,
      apparent_temperature: 19.7,
      precipitation: 0,
      weather_code: 0,
      cloud_cover: 5,
      wind_speed_10m: 12.7,
    }));
  });

  it('should map cloudy and rainy weather codes to readable labels', () => {
    service.getCurrentWeather({ lat: 48.2082, lng: 16.3738 }).subscribe(weather => {
      expect(weather.description).toBe('Cloudy');
      expect(weather.icon).toBe('cloud');
    });

    httpTesting.expectOne(req => req.url === 'https://api.open-meteo.com/v1/forecast')
      .flush(openMeteoResponse({ weather_code: 3 }));

    service.getCurrentWeather({ lat: 48.2082, lng: 16.3738 }).subscribe(weather => {
      expect(weather.description).toBe('Rainy');
      expect(weather.icon).toBe('rainy');
    });

    httpTesting.expectOne(req => req.url === 'https://api.open-meteo.com/v1/forecast')
      .flush(openMeteoResponse({ weather_code: 61 }));
  });
});

function openMeteoResponse(overrides: Partial<{
  temperature_2m: number;
  apparent_temperature: number;
  precipitation: number;
  weather_code: number;
  cloud_cover: number;
  wind_speed_10m: number;
}> = {}) {
  return {
    current: {
      temperature_2m: 20.6,
      apparent_temperature: 19.7,
      precipitation: 0,
      weather_code: 0,
      cloud_cover: 5,
      wind_speed_10m: 12.7,
      ...overrides,
    },
  };
}
