package at.technikum.backend.mapper;

import at.technikum.backend.dto.Coordinates;
import at.technikum.backend.dto.request.TourRequest;
import at.technikum.backend.dto.response.RouteResponse;
import at.technikum.backend.dto.response.TourResponse;
import at.technikum.backend.entity.Route;
import at.technikum.backend.entity.Tour;

import org.springframework.stereotype.Component;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

@Component
public class TourMapper {
    private final ObjectMapper objectMapper;

    public TourMapper(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public Tour toTour(TourRequest request) {
        Tour tour = new Tour();
        tour.setName(request.name());
        tour.setDescription(request.description());
        tour.setStartLocation(request.startLocation());
        tour.setDestinationLocation(request.destinationLocation());
        tour.setTransportType(request.transportType());
        tour.setRating(request.rating());
        return tour;
    }

    public TourResponse toTourResponse(Tour tour) {
        return new TourResponse(
                tour.getId(),
                tour.getName(),
                tour.getDescription(),
                tour.getStartLocation(),
                tour.getDestinationLocation(),
                tour.getTransportType(),
                tour.getDistance(),
                tour.getEstimatedTime(),
                tour.getRating(),
                toRouteResponse(tour)
        );
    }

    private RouteResponse toRouteResponse(Tour tour) {
        Route route = tour.getRouteInformation();

        if (route == null) {
            return null;
        }

        return new RouteResponse(
                new Coordinates(route.getStartLat(), route.getStartLong()),
                new Coordinates(route.getEndLat(), route.getEndLong()),
                tour.getDistance(),
                null,
                readGeometry(route)
        );
    }

    private List<Coordinates> readGeometry(Route route) {
        if (route.getGeometryJson() == null || route.getGeometryJson().isBlank()) {
            return List.of();
        }

        try {
            return objectMapper.readValue(
                    route.getGeometryJson(),
                    new TypeReference<List<Coordinates>>() {}
            );
        } catch (Exception e) {
            return List.of();
        }
    }
}
