export interface WeatherInfo {
  temperature: number;
  apparentTemperature: number;
  precipitation: number;
  weatherCode: number;
  cloudCover: number;
  windSpeed: number;
  description: string;
  icon: string;
}

export interface OpenMeteoCurrentResponse {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    precipitation: number;
    weather_code: number;
    cloud_cover: number;
    wind_speed_10m: number;
  };
}
