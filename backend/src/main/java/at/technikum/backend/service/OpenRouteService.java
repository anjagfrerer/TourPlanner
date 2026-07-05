package at.technikum.backend.service;

import at.technikum.backend.constants.TransportType;
import at.technikum.backend.dto.Coordinates;
import at.technikum.backend.dto.response.RouteResponse;
import at.technikum.backend.service.client.OpenRouteServiceClient;
import at.technikum.backend.service.client.dto.OpenRouteDirectionsResponse;
import at.technikum.backend.service.client.dto.OpenRouteGeocodeResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class OpenRouteService {
    private final String openRouteServiceApiKey;
    private final OpenRouteServiceClient openRouteServiceClient;

    public OpenRouteService(@Value("${openrouteservice.api-key}") String openRouteServiceApiKey, OpenRouteServiceClient openRouteServiceClient) {
        this.openRouteServiceApiKey = openRouteServiceApiKey;
        this.openRouteServiceClient = openRouteServiceClient;
    }

    public Coordinates getCoordinatesFrom(String text) {
        log.debug("Requesting coordinates from OpenRouteService for '{}'", text);

        OpenRouteGeocodeResponse result = openRouteServiceClient.geocodeSearch(openRouteServiceApiKey, text, 1);
        List<OpenRouteGeocodeResponse.Feature> features = featuresOf(result);

        if (features.isEmpty()) {
            log.warn("No coordinates found for '{}'", text);
            throw new EntityNotFoundException("No coordinates found for: " + text);
        }

        Coordinates coordinates = toCoordinates(features.getFirst().geometry().coordinates());

        log.debug("Resolved '{}' to coordinates lat={}, lng={}",
                text,
                coordinates.lat(),
                coordinates.lng());

        return coordinates;
    }

    public RouteResponse getDirections(String startText, String endText) {
        return getDirections(startText, endText, TransportType.VACATION);
    }

    public RouteResponse getDirections(String startText, String endText, TransportType transportType) {
        log.info("Requesting route from '{}' to '{}' using transport type '{}'",
                startText,
                endText,
                transportType);

        Coordinates start = getCoordinatesFrom(startText);
        Coordinates end = getCoordinatesFrom(endText);
        String orsStart = toOpenRouteCoordinate(start);
        String orsEnd = toOpenRouteCoordinate(end);
        String profile = toOpenRouteProfile(transportType);


        OpenRouteDirectionsResponse result = openRouteServiceClient.routeSearch(
                profile,
                openRouteServiceApiKey,
                orsStart,
                orsEnd
        );

        OpenRouteDirectionsResponse.Feature route = featuresOf(result).stream()
                .findFirst()
                .orElseThrow(() -> {
                    log.warn("No route found from '{}' to '{}' using profile '{}'",
                            startText,
                            endText,
                            profile);
                    return new EntityNotFoundException("No route found from " + startText + " to " + endText);
                });

        Double distance = route.properties().summary().distance();
        Double duration = route.properties().summary().duration();

        log.info("Route found from '{}' to '{}': distance={}m, duration={}s",
                startText,
                endText,
                distance,
                duration);

        return new RouteResponse(
                start,
                end,
                distance,
                duration,
                route.geometry().coordinates().stream()
                        .map(this::toCoordinates)
                        .toList()
        );
    }

    private Coordinates toCoordinates(List<Double> openRouteCoordinate) {
        if (openRouteCoordinate == null || openRouteCoordinate.size() < 2) {
            log.warn("Invalid coordinate response from OpenRouteService: {}", openRouteCoordinate);
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

        return switch (transportType) {
            case BIKING -> "cycling-regular";
            case HIKING -> "foot-hiking";
            case RUNNING -> "foot-walking";
            default ->  {
                log.warn("Unsupported transport type for OpenRouteService: '{}'", transportType);
                throw new IllegalArgumentException("Invalid transportType for OpenRouteService");
            }
        };
    }

    private List<OpenRouteGeocodeResponse.Feature> featuresOf(OpenRouteGeocodeResponse response) {
        return response.features() == null ? List.of() : response.features();
    }

    private List<OpenRouteDirectionsResponse.Feature> featuresOf(OpenRouteDirectionsResponse response) {
        return response.features() == null ? List.of() : response.features();
    }
}
