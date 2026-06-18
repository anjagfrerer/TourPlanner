package at.technikum.backend.dto.response;

import at.technikum.backend.dto.Coordinates;

import java.util.List;

public record RouteResponse(List<Coordinates> coordinates) {
}
