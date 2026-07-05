package at.technikum.backend.service;

import at.technikum.backend.dto.response.RouteResponse;
import at.technikum.backend.entity.Route;
import at.technikum.backend.entity.Tour;
import at.technikum.backend.entity.User;
import at.technikum.backend.exceptions.TourNotFoundException;
import at.technikum.backend.exceptions.UnauthorizedAccessException;
import at.technikum.backend.repository.TourRepository;
import lombok.extern.slf4j.Slf4j;
import tools.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@Slf4j
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
        log.info("Creating tour from '{}' to '{}' with transport type '{}'",
                tour.getStartLocation(),
                tour.getDestinationLocation(),
                tour.getTransportType());

        validateLocations(tour);

        RouteResponse routeResponse = openRouteService.getDirections(
                tour.getStartLocation(),
                tour.getDestinationLocation(),
                tour.getTransportType()
        );

        log.debug("Route calculated: distance={}m, duration={}s",
                routeResponse.distance(),
                routeResponse.duration());

        Route route = new Route();
        route.setStartLat(routeResponse.start().lat());
        route.setStartLong(routeResponse.start().lng());
        route.setEndLat(routeResponse.end().lat());
        route.setEndLong(routeResponse.end().lng());

        try {
            route.setGeometryJson(mapper.writeValueAsString(routeResponse.geometry()));
        } catch (Exception e) {
            log.error("Failed to serialize route geometry for tour from '{}' to '{}'",
                    tour.getStartLocation(),
                    tour.getDestinationLocation(),
                    e);

            throw new RuntimeException("Save route geometry failed: ", e);
        }

        tour.setRouteInformation(route);
        tour.setDistance(Math.round((routeResponse.distance() / 1000.0) * 100.0) / 100.0);
        tour.setEstimatedTime(formatDuration(routeResponse.duration()));

        Tour savedTour = tourRepository.save(tour);
        log.info("Created tour with ID '{}'", savedTour.getId());

        return savedTour;
    }

    public List<Tour> getAllTours(String search) {
        if (search == null || search.trim().isEmpty()) {
            log.debug("Fetching all tours without search filter");
            return tourRepository.findAll();
        }

        String trimmedSearch = search.trim();
        log.debug("Searching tours with term '{}'", trimmedSearch);

        List<Tour> tours = tourRepository.searchTours(trimmedSearch);

        log.debug("Found {} tours for search term '{}'", tours.size(), trimmedSearch);
        return tours;
    }

    public List<Tour> getToursCreatedBy(User user, String search) {
        if (search == null || search.trim().isEmpty()) {
            log.debug("Fetching tours created by user '{}'", user.getUsername());
            return tourRepository.findByCreatedBy_Username(user.getUsername());
        }

        String trimmedSearch = search.trim();
        log.debug("Searching tours created by user '{}' with term '{}'", user.getUsername(), trimmedSearch);

        List<Tour> tours = tourRepository.searchToursByCreatedByUsername(user.getUsername(), trimmedSearch);

        log.debug("Found {} tours created by user '{}' for search term '{}'",
                tours.size(),
                user.getUsername(),
                trimmedSearch);
        return tours;
    }

    public Tour getTourById(UUID id){
        log.debug("Fetching specific tour with ID '{}'", id);

        return tourRepository.findById(id).orElseThrow(() -> {
            log.warn("Tour with ID '{}' was not found", id);
            return new TourNotFoundException(id);
        });
    }

    public Tour updateTour(UUID id, Tour updatedTour, User user) {
        Tour existingTour = getTourById(id);
        validateTourOwner(existingTour, user);
        validateLocations(updatedTour);

        boolean routeRelevantDataChanged =
                !Objects.equals(existingTour.getStartLocation(), updatedTour.getStartLocation()) ||
                !Objects.equals(existingTour.getDestinationLocation(), updatedTour.getDestinationLocation()) ||
                existingTour.getTransportType() != updatedTour.getTransportType();

        existingTour.setName(updatedTour.getName());
        existingTour.setDescription(updatedTour.getDescription());
        existingTour.setStartLocation(updatedTour.getStartLocation());
        existingTour.setDestinationLocation(updatedTour.getDestinationLocation());
        existingTour.setTransportType(updatedTour.getTransportType());
        existingTour.setRating(updatedTour.getRating());
        existingTour.setChildFriendly(updatedTour.getChildFriendly());

        if (routeRelevantDataChanged) {
            updateRouteInformation(existingTour);
        }

        Tour savedTour = tourRepository.save(existingTour);
        log.info("Updated tour with ID '{}'", savedTour.getId());

        return savedTour;
    }

    public void deleteTourById(UUID id, User user){
        Tour tour = getTourById(id);
        validateTourOwner(tour, user);

        log.info("Deleting tour with ID '{}'", id);
        tourRepository.delete(tour);
        log.info("Deleted tour with ID '{}'", id);
    }

    // HELPER FUNCTIONS

    private void updateRouteInformation(Tour tour) {
        validateLocations(tour);

        RouteResponse routeResponse = openRouteService.getDirections(
                tour.getStartLocation(),
                tour.getDestinationLocation(),
                tour.getTransportType()
        );

        Route route = tour.getRouteInformation();
        if (route == null) {
            route = new Route();
            tour.setRouteInformation(route);
        }

        route.setStartLat(routeResponse.start().lat());
        route.setStartLong(routeResponse.start().lng());
        route.setEndLat(routeResponse.end().lat());
        route.setEndLong(routeResponse.end().lng());

        try {
            route.setGeometryJson(mapper.writeValueAsString(routeResponse.geometry()));
        } catch (Exception e) {
            log.error("Failed to serialize route geometry for tour '{}'", tour.getId(), e);
            throw new RuntimeException("Save route geometry failed: ", e);
        }

        tour.setDistance(Math.round((routeResponse.distance() / 1000.0) * 100.0) / 100.0);
        tour.setEstimatedTime(formatDuration(routeResponse.duration()));
    }

    private void validateTourOwner(Tour tour, User user) {
        if (tour.getCreatedBy() == null || !tour.getCreatedBy().getId().equals(user.getId())) {
            throw new UnauthorizedAccessException();
        }
    }

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
