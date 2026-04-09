import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({providedIn: 'root'})
export class MapFacade {
  private map: L.Map | null = null;

  initMap(containerId: string): void {
    if (this.map) return;

    this.map = L.map(containerId);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    this.map.setView([48.2082, 16.3738], 12); //Wien
  }

  addMarker(lat: number, lng: number): void {
    if (!this.map) return;
    L.marker([lat, lng]).addTo(this.map);
  }

  centerMap(lat: number, lng: number): void {
    if (!this.map) return;
    this.map.setView([lat, lng], 1);
  }
}