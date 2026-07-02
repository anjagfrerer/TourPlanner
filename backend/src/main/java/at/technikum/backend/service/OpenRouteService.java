package at.technikum.backend.service;

import at.technikum.backend.constants.TransportType;
import at.technikum.backend.dto.Coordinates;
import at.technikum.backend.dto.response.RouteResponse;
import at.technikum.backend.service.client.OpenRouteServiceClient;
import at.technikum.backend.service.client.dto.OpenRouteDirectionsResponse;
import at.technikum.backend.service.client.dto.OpenRouteGeocodeResponse;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OpenRouteService {
    private final String openRouteServiceApiKey;
    private final OpenRouteServiceClient openRouteServiceClient;

    public OpenRouteService(@Value("${openrouteservice.api-key}") String openRouteServiceApiKey, OpenRouteServiceClient openRouteServiceClient) {
        this.openRouteServiceApiKey = openRouteServiceApiKey;
        this.openRouteServiceClient = openRouteServiceClient;
    }

    public Coordinates getCoordinatesFrom(String text) {
        OpenRouteGeocodeResponse result = openRouteServiceClient.geocodeSearch(openRouteServiceApiKey, text, 1);
        List<OpenRouteGeocodeResponse.Feature> features = featuresOf(result);

        if (features.isEmpty()) {
            throw new EntityNotFoundException("No coordinates found for: " + text);
        }

        return toCoordinates(features.getFirst().geometry().coordinates());
    }

    public RouteResponse getDirections(String startText, String endText) {
        return getDirections(startText, endText, TransportType.VACATION);
    }

    public RouteResponse getDirections(String startText, String endText, TransportType transportType) {
        Coordinates start = getCoordinatesFrom(startText);
        Coordinates end = getCoordinatesFrom(endText);
        String orsStart = toOpenRouteCoordinate(start);
        String orsEnd = toOpenRouteCoordinate(end);

        OpenRouteDirectionsResponse result = openRouteServiceClient.routeSearch(
                toOpenRouteProfile(transportType),
                openRouteServiceApiKey,
                orsStart,
                orsEnd
        );

        OpenRouteDirectionsResponse.Feature route = featuresOf(result).stream()
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException("No route found from " + startText + " to " + endText));

        return new RouteResponse(
                start,
                end,
                route.properties().summary().distance(),
                route.properties().summary().duration(),
                route.geometry().coordinates().stream()
                        .map(this::toCoordinates)
                        .toList()
        );
    }

    private Coordinates toCoordinates(List<Double> openRouteCoordinate) {
        if (openRouteCoordinate == null || openRouteCoordinate.size() < 2) {
            throw new IllegalArgumentException("Invalid coordinates");
        }

        Double longitude = openRouteCoordinate.get(0);
        Double latitude = openRouteCoordinate.get(1);
        return new Coordinates(latitude, longitude);
    }

    private String toOpenRouteCoordinate(Coordinates coordinates) {
        return coordinates.lng() + "," + coordinates.lat();
    }

    private String toOpenRouteProfile(TransportType transportType) {
        if (transportType == null) {
            return "driving-car";
        }

        return switch (transportType) {
            case BIKING -> "cycling-regular";
            case HIKING, RUNNING -> "foot-walking";
            case VACATION -> "driving-car";
        };
    }

    private List<OpenRouteGeocodeResponse.Feature> featuresOf(OpenRouteGeocodeResponse response) {
        return response.features() == null ? List.of() : response.features();
    }

    private List<OpenRouteDirectionsResponse.Feature> featuresOf(OpenRouteDirectionsResponse response) {
        return response.features() == null ? List.of() : response.features();
    }
}
