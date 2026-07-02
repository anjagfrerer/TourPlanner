package at.technikum.backend.service.client.dto;

import java.util.List;

public record OpenRouteGeocodeResponse(List<Feature> features) {
    public record Feature(Geometry geometry) {}

    public record Geometry(List<Double> coordinates) {}
}
