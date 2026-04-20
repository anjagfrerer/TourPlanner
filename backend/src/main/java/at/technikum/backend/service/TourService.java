package at.technikum.backend.service;

import at.technikum.backend.model.Tour;
import at.technikum.backend.repository.TourRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TourService {
    private final TourRepository tourRepository;

    public TourService(TourRepository tourRepository) {
        this.tourRepository = tourRepository;
    }

    public void addTour(Tour tour){
        tourRepository.save(tour);
    }

    public List<Tour> getAllTours(){
        return tourRepository.findAll();
    }
    public Tour getTourById(UUID id){
        return tourRepository.findById(id).orElseThrow(()->new EntityNotFoundException("Tour not found"));
    }

    public void deleteTourById(UUID id){
        tourRepository.deleteById(id);
    }
}
