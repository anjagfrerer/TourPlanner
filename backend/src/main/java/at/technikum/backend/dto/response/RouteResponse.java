package at.technikum.backend.dto.response;

import at.technikum.backend.dto.Coordinates;

import java.util.List;

public record RouteResponse(
        Coordinates start,
        Coordinates end,
        Double distance,
        Double duration,
        List<Coordinates> geometry
) {}
