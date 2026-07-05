package at.technikum.backend.service;

import at.technikum.backend.dto.response.RouteResponse;
import at.technikum.backend.entity.Route;
import at.technikum.backend.entity.Tour;
import at.technikum.backend.exceptions.TourNotFoundException;
import at.technikum.backend.repository.TourRepository;
import tools.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.UUID;

@Service
public class TourService {
    private final TourRepository tourRepository;
    private final OpenRouteService openRouteService;
    private final ObjectMapper mapper;

    public TourService(TourRepository tourRepository, OpenRouteService openRouteService, ObjectMapper mapper) {
        this.tourRepository = tourRepository;
        this.openRouteService = openRouteService;
        this.mapper = mapper;
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

        try {
            route.setGeometryJson(mapper.writeValueAsString(routeResponse.geometry()));
        } catch (Exception e) {
            throw new RuntimeException("Save route geometry failed: ", e);
        }

        tour.setRouteInformation(route);
        tour.setDistance(Math.round((routeResponse.distance() / 1000.0) * 100.0) / 100.0);
        tour.setEstimatedTime(formatDuration(routeResponse.duration()));

        return tourRepository.save(tour);
    }

    public List<Tour> getAllTours(){
        return tourRepository.findAll();
    }

    // anja
    public List<Tour> getAllTours(String search) {
        if (search == null || search.trim().isEmpty()) {
            return tourRepository.findAll();
        }
        return tourRepository.searchTours(search.trim());
    }

    public Tour getTourById(UUID id){
        return tourRepository.findById(id).orElseThrow(()->new TourNotFoundException(id));
    }

    public void deleteTourById(UUID id){
        tourRepository.deleteById(id);
    }

    // HELPER FUNCTIONS

    private void validateLocations(Tour tour) {
        if (tour.getStartLocation() == null ||tour.getStartLocation().isEmpty()) {
            throw new IllegalArgumentException("Start location is required");
        }

        if (tour.getDestinationLocation() == null ||tour.getDestinationLocation().isEmpty()) {
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

        long totalSeconds = Math.round(durationInSeconds);

        long hours = totalSeconds / 3600;
        long minutes = (totalSeconds % 3600) / 60;
        long seconds = totalSeconds % 60;

        return String.format("%02d:%02d:%02d", hours, minutes, seconds);
    }
}
