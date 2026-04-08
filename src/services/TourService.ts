import { Injectable, signal } from "@angular/core";
import { Tour } from "../app/models/tour.model";

@Injectable({ providedIn: 'root' })
export class TourService {
  
  //Statisches Tour "Repo"
  private tours = signal<Tour[]>([
    {"id":1,"name":"Coastal Getaway Tour","description":"Embark on a culinary journey through local markets","from":"Sankt Pölten","to":"Graz","transportType":"Vacation","distance":951.09,"estimatedTime":"05:50","routeInformation":null},
    {"id":2,"name":"Mountain Escape Tour","description":"Explore the historic landmarks of the city","from":"Villach","to":"Villach","transportType":"Running","distance":648.03,"estimatedTime":"03:15","routeInformation":null},
    {"id":3,"name":"Coastal Getaway Tour","description":"Join a guided tour of the natural wonders in the area","from":"Salzburg","to":"Linz","transportType":"Biking","distance":163.32,"estimatedTime":"01:30","routeInformation":null},
    {"id":4,"name":"Historical Landmarks Tour","description":"Explore the historic landmarks of the city","from":"Linz","to":"Innsbruck","transportType":"Running","distance":586.27,"estimatedTime":"04:20","routeInformation":null},
    {"id":5,"name":"City Lights Tour","description":"Join a guided tour of the natural wonders in the area","from":"Graz","to":"Innsbruck","transportType":"Hiking","distance":953.07,"estimatedTime":"04:20","routeInformation":null},
    {"id":6,"name":"Coastal Getaway Tour","description":"Explore the historic landmarks of the city","from":"Steyr","to":"Wels","transportType":"Biking","distance":791.12,"estimatedTime":"04:20","routeInformation":null},
    {"id":7,"name":"Mountain Escape Tour","description":"Discover hidden gems off the beaten path","from":"Graz","to":"Vienna","transportType":"Vacation","distance":622.18,"estimatedTime":"03:15","routeInformation":null},
    {"id":8,"name":"Mountain Escape Tour","description":"Join a guided tour of the natural wonders in the area","from":"Vienna","to":"Salzburg","transportType":"Biking","distance":689.79,"estimatedTime":"04:20","routeInformation":null},
    {"id":9,"name":"Summer Adventure Tour","description":"Experience the vibrant nightlife of the town","from":"Vienna","to":"Steyr","transportType":"Running","distance":707.12,"estimatedTime":"04:20","routeInformation":null},
    {"id":10,"name":"City Lights Tour","description":"Experience the vibrant nightlife of the town","from":"Salzburg","to":"Salzburg","transportType":"Biking","distance":258.63,"estimatedTime":"03:15","routeInformation":null}
    ]);

  //TODO: CRUD Methods fertig
  addTour(){}

  getTours() {
    return this.tours;
  }

  updateTour(){}

  deleteTour(){}
}