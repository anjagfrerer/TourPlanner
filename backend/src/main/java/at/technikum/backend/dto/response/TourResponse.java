package at.technikum.backend.dto.response;

import at.technikum.backend.constants.TransportType;

import java.util.UUID;

public record TourResponse(
        UUID id,
        String name,
        String description,
        String startLocation,
        String destinationLocation,
        TransportType transportType,
        Double distance,
        String estimatedTime,
        Integer rating,
        RouteResponse route
) {}
