package at.technikum.backend.repository;
import at.technikum.backend.constants.TransportType;
import at.technikum.backend.model.Tour;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class TourRepository {
    private final Map<Integer, Tour> tours = new HashMap<>();

    //TODO: Very suboptimal, FIX
    public TourRepository() {
        tours.put(11, new Tour(1, "Coastal Getaway Tour", "Embark on a culinary journey through local markets", "Sankt Pölten", "Graz", TransportType.VACATION, 12.5, "01:30", null, 4, "Lili"));
        tours.put(12, new Tour(2, "Mountain Escape Tour", "Explore the historic landmarks of the city", "Villach", "Villach", TransportType.RUNNING, 8.0, "01:00", null, 5, "Lili"));
        tours.put(13, new Tour(3, "Coastal Getaway Tour", "Join a guided tour of the natural wonders in the area", "Salzburg", "Linz", TransportType.BIKING, 10.0, "01:10", null, 3, "Lili"));
        tours.put(14, new Tour(4, "Historical Landmarks Tour", "Explore the historic landmarks of the city", "Linz", "Innsbruck", TransportType.RUNNING, 5.27, "00:20", null, 3, "Max"));
        tours.put(15, new Tour(5, "City Lights Tour", "Join a guided tour of the natural wonders in the area", "Graz", "Innsbruck", TransportType.HIKING, 9.07, "04:20", null, 3, "Anja"));
        tours.put(16, new Tour(6, "Coastal Getaway Tour", "Explore the historic landmarks of the city", "Steyr", "Wels", TransportType.BIKING, 79.12, "04:20", null, 2, "Lena"));
        tours.put(17, new Tour(7, "Mountain Escape Tour", "Discover hidden gems off the beaten path", "Graz", "Vienna", TransportType.VACATION, 68.18, "03:15", null, 5, "Paul"));
        tours.put(18, new Tour(8, "Mountain Escape Tour", "Join a guided tour of the natural wonders in the area", "Vienna", "Salzburg", TransportType.BIKING, 69.79, "04:20", null, 5, "Paul"));
        tours.put(19, new Tour(9, "Summer Adventure Tour", "Experience the vibrant nightlife of the town", "Vienna", "Steyr", TransportType.RUNNING, 42.12, "04:20", null, 4, "Anna"));
        tours.put(20, new Tour(10, "City Lights Tour", "Experience the vibrant nightlife of the town", "Salzburg", "Salzburg", TransportType.BIKING, 58.63, "03:15", null, 2, "Meg"));
    }


    public boolean existsById(int id) {
        return tours.containsKey(id);
    }

    public void save(Tour tour) {
        tours.put(tour.getId(), tour);
    }

    public Optional<Tour> findById(int tourId) {
        return Optional.ofNullable(tours.get(tourId));
    }

    public List<Tour> findAll() {
        return new ArrayList<>(tours.values());
    }

    public void deleteById(int tourId) {
        tours.remove(tourId);
    }
}

