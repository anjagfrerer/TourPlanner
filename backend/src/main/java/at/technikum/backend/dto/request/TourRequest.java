package at.technikum.backend.dto.request;

import at.technikum.backend.constants.TransportType;

public record TourRequest(
        String name,
        String description,
        String startLocation,
        String destinationLocation,
        TransportType transportType,
        Integer rating,
        Boolean childFriendly
) {}
