package at.technikum.backend.service;

import at.technikum.backend.dto.response.RouteResponse;
import at.technikum.backend.entity.Route;
import at.technikum.backend.entity.Tour;
import at.technikum.backend.repository.TourRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.UUID;

@Service
public class TourService {
    private final TourRepository tourRepository;
    private final OpenRouteService openRouteService;

    public TourService(TourRepository tourRepository, OpenRouteService openRouteService) {
        this.tourRepository = tourRepository;
        this.openRouteService = openRouteService;
    }

    public Tour addTour(Tour tour){
        validateLocations(tour);

        RouteResponse routeResponse = openRouteService.getDirections(
                tour.getStartLocation(),
                tour.getDestinationLocation(),
                tour.getTransportType()
        );

        Route route = new Route();
        route.setStartLat(routeResponse.start().lat());
        route.setStartLong(routeResponse.start().lng());
        route.setEndLat(routeResponse.end().lat());
        route.setEndLong(routeResponse.end().lng());

        tour.setRouteInformation(route);
        tour.setDistance(routeResponse.distance());
        tour.setEstimatedTime(formatDuration(routeResponse.duration()));

        return tourRepository.save(tour);
    }

    public List<Tour> getAllTours(){
        return tourRepository.findAll();
    }

    public Tour getTourById(UUID id){
        return tourRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tour not found"));
    }

    public void deleteTourById(UUID id){
        tourRepository.deleteById(id);
    }

    private void validateLocations(Tour tour) {
        if (!StringUtils.hasText(tour.getStartLocation())) {
            throw new IllegalArgumentException("Start location is required");
        }

        if (!StringUtils.hasText(tour.getDestinationLocation())) {
            throw new IllegalArgumentException("Destination location is required");
        }

        if (tour.getStartLocation().equalsIgnoreCase(tour.getDestinationLocation())) {
            throw new IllegalArgumentException("Start and destination must be different");
        }
    }

    private String formatDuration(Double durationInSeconds) {
        if (durationInSeconds == null) {
            return null;
        }

        long totalMinutes = Math.round(durationInSeconds / 60);
        long hours = totalMinutes / 60;
        long minutes = totalMinutes % 60;

        if (hours == 0) {
            return minutes + " min";
        }

        return hours + " h " + minutes + " min";
    }
}
