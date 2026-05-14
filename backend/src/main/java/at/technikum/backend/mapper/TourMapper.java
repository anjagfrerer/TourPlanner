package at.technikum.backend.mapper;

import at.technikum.backend.dto.TourRequest;
import at.technikum.backend.dto.TourResponse;
import at.technikum.backend.model.Tour;
import at.technikum.backend.repository.TourRepository;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.Mapping;

@Component
public class TourMapper {
    /*public Tour toTour(TourRequest tourRequest) {
        return new Tour()
    }*/

    public TourResponse toTourResponse(Tour tour) {
        return new TourResponse(tour.getId(), tour.getName());
    }

}
