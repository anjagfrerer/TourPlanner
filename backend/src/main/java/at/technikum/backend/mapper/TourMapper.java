package at.technikum.backend.mapper;

import at.technikum.backend.dto.response.TourResponse;
import at.technikum.backend.entity.Tour;
import org.springframework.stereotype.Component;

@Component
public class TourMapper {
    public TourResponse toTourResponse(Tour tour) {
        return new TourResponse(tour.getId(), tour.getName());
    }
}
