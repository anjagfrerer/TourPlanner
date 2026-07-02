import { Injectable, signal } from '@angular/core';

export interface TourFilters {
  transport: string;
  ratings: number[];
  maxDistance: number;
  maxDuration: number;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchTerm = signal<string>('');

  activeFilters = signal<TourFilters>({
    transport: '',
    ratings: [],
    maxDistance: Infinity,
    maxDuration: Infinity
  });
}