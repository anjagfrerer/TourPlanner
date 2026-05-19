package at.technikum.backend.mapper;

import at.technikum.backend.dto.TourResponse;
import at.technikum.backend.entity.Tour;
import org.springframework.stereotype.Component;

@Component
public class TourMapper {
    /*public Tour toTour(TourRequest tourRequest) {
        return new Tour()
    }*/

    public TourResponse toTourResponse(Tour tour) {
        return new TourResponse(tour.getId(), tour.getName());
    }

}
