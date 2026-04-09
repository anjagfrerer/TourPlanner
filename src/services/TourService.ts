import { Injectable, signal, computed } from "@angular/core";
import { Tour } from "../app/models/tour.model";

@Injectable({ providedIn: 'root' })
export class TourService {
  
  //Statisches Tour "Repo"
  private tours = signal<Tour[]>([
    {"id":1,"name":"Coastal Getaway Tour","description":"Embark on a culinary journey through local markets","from":"Sankt Pölten","to":"Graz","transportType":"Vacation","distance":12.5,"estimatedTime":"01:30","routeInformation":null, "rating": 4, "author": "Lili"},
    {"id":2,"name":"Mountain Escape Tour","description":"Explore the historic landmarks of the city","from":"Villach","to":"Villach","transportType":"Running","distance":8,"estimatedTime":"01:00","routeInformation":null, "rating": 5, "author": "Lili"},
    {"id":3,"name":"Coastal Getaway Tour","description":"Join a guided tour of the natural wonders in the area","from":"Salzburg","to":"Linz","transportType":"Biking","distance":10,"estimatedTime":"01:10","routeInformation":null, "rating": 3, "author": "Lili"},
    {"id":4,"name":"Historical Landmarks Tour","description":"Explore the historic landmarks of the city","from":"Linz","to":"Innsbruck","transportType":"Running","distance":5.27,"estimatedTime":"00:20","routeInformation":null, "rating": 3, "author": "Max"},
    {"id":5,"name":"City Lights Tour","description":"Join a guided tour of the natural wonders in the area","from":"Graz","to":"Innsbruck","transportType":"Hiking","distance":9.07,"estimatedTime":"04:20","routeInformation":null, "rating": 3,  "author": "Anja"},
    {"id":6,"name":"Coastal Getaway Tour","description":"Explore the historic landmarks of the city","from":"Steyr","to":"Wels","transportType":"Biking","distance":79.12,"estimatedTime":"04:20","routeInformation":null, "rating": 2, "author": "Lena"},
    {"id":7,"name":"Mountain Escape Tour","description":"Discover hidden gems off the beaten path","from":"Graz","to":"Vienna","transportType":"Vacation","distance":68.18,"estimatedTime":"03:15","routeInformation":null, "rating": 5,  "author": "Paul"},
    {"id":8,"name":"Mountain Escape Tour","description":"Join a guided tour of the natural wonders in the area","from":"Vienna","to":"Salzburg","transportType":"Biking","distance":69.79,"estimatedTime":"04:20","routeInformation":null, "rating": 5, "author": "Paul"},
    {"id":9,"name":"Summer Adventure Tour","description":"Experience the vibrant nightlife of the town","from":"Vienna","to":"Steyr","transportType":"Running","distance":42.12,"estimatedTime":"04:20","routeInformation":null, "rating": 4, "author": "Anna"},
    {"id":10,"name":"City Lights Tour","description":"Experience the vibrant nightlife of the town","from":"Salzburg","to":"Salzburg","transportType":"Biking","distance":58.63,"estimatedTime":"03:15","routeInformation":null, "rating": 2, "author": "Meg"}
    ]);

  selectedTour = signal<Tour>({
    "id":0,
    "name":"null",
    "description":"null",
    "from":"null",
    "to":"null",
    "transportType":"null",
    "distance":0,
    "estimatedTime":"null",
    "routeInformation":null,
    "rating": 0,
    "author": "null"
  });

  addTour(tour: Tour){
    
    this.tours.update(currentTours => [...currentTours, tour]);
  }

  getAllTours() {
    return this.tours;
  }

  getTourById(id: number) : Tour | null {
    return this.tours().find(tour => tour.id === id) ?? null;
  }

  getToursByAuthor(author: string) : Tour[] | null {
    return this.tours().filter(tour => tour.author === author) ?? null;
  }

  /*updateTour(updatedTour: Tour){
    this.tours.update(currentTours =>
      currentTours.map(tour =>
        tour.id === updatedTour.id ? tour : tour
      )
    );

  }*/

  deleteTour(id: number){
    this.tours.update(currentTours =>
      currentTours.filter(tour => tour.id !== id)
    );
  }
}