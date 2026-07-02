export interface Coordinates {
  lat: number;
  lng: number;
}

export interface RouteInformation {
  start: Coordinates;
  end: Coordinates;
  distance: number;
  duration: number | null;
  geometry: Coordinates[];
}