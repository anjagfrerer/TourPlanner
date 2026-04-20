package at.technikum.backend.service;

import at.technikum.backend.model.Tour;
import at.technikum.backend.repository.TourRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

//TODO: Swap methods for JPA methods
@Service
public class TourService {
    private final TourRepository tourRepository;

    public TourService(TourRepository tourRepository) {
        this.tourRepository = tourRepository;
    }

    public void addTour(Tour tour){
        tourRepository.save(tour);
    }

    public Optional<Tour> getTourById(int tourId) {
        return tourRepository.findById(tourId);
    }

    public List<Tour> getTours() {
        return tourRepository.findAll();
    }

    public void deleteTourById(int tourId){
        tourRepository.deleteById(tourId);
    }

    public void updateTour(Tour tour) {
        tourRepository.deleteById(tour.getId());
        tourRepository.save(tour);
    }
}
