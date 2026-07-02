package at.technikum.backend.service.client.dto;

import java.util.List;

public record OpenRouteDirectionsResponse(List<Feature> features) {
    public record Feature(Geometry geometry, Properties properties) {}

    public record Geometry(String type, List<List<Double>> coordinates) {}

    public record Properties(Summary summary) {}

    public record Summary(Double distance, Double duration) {}
}
