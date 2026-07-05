import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RouteInformation } from '../app/models/routeInformation.model';
import { WeatherInfo } from '../app/models/weather.model';
import { WeatherFacade } from './weather.facade';
import { WeatherService } from './weather.service';

describe('WeatherFacade', () => {
  let facade: WeatherFacade;
  let weatherService: Pick<WeatherService, 'getCurrentWeather'>;

  beforeEach(() => {
    weatherService = {
      getCurrentWeather: vi.fn().mockReturnValue(of(weatherInfo())),
    };

    TestBed.configureTestingModule({
      providers: [
        WeatherFacade,
        { provide: WeatherService, useValue: weatherService },
      ],
    });

    facade = TestBed.inject(WeatherFacade);
  });

  it('should request weather for the middle point of the route geometry', () => {
    facade.getCurrentWeatherForRoute(routeWithGeometry()).subscribe();

    expect(weatherService.getCurrentWeather).toHaveBeenCalledWith({
      lat: 48.3,
      lng: 16.3,
    });
  });

  it('should fall back to the midpoint between start and end without geometry', () => {
    facade.getCurrentWeatherForRoute(routeWithoutGeometry()).subscribe();

    expect(weatherService.getCurrentWeather).toHaveBeenCalledWith({
      lat: 48.5,
      lng: 16.5,
    });
  });
});

function routeWithGeometry(): RouteInformation {
  return {
    start: { lat: 48, lng: 16 },
    end: { lat: 49, lng: 17 },
    distance: 10,
    duration: 20,
    geometry: [
      { lat: 48.1, lng: 16.1 },
      { lat: 48.2, lng: 16.2 },
      { lat: 48.3, lng: 16.3 },
      { lat: 48.4, lng: 16.4 },
    ],
  };
}

function routeWithoutGeometry(): RouteInformation {
  return {
    start: { lat: 48, lng: 16 },
    end: { lat: 49, lng: 17 },
    distance: 10,
    duration: 20,
    geometry: [],
  };
}

function weatherInfo(): WeatherInfo {
  return {
    temperature: 21,
    apparentTemperature: 20,
    precipitation: 0,
    weatherCode: 0,
    cloudCover: 5,
    windSpeed: 13,
    description: 'Sunny',
    icon: 'sunny',
  };
}
