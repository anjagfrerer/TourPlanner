package at.technikum.backend.service;

import at.technikum.backend.entity.Tour;
import at.technikum.backend.exceptions.TourNotFoundException;
import at.technikum.backend.repository.TourRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TourService {
    private final TourRepository tourRepository;

    public TourService(TourRepository tourRepository) {
        this.tourRepository = tourRepository;
    }

    public Tour addTour(Tour tour){
        return tourRepository.save(tour);
    }

    public List<Tour> getAllTours(){
        return tourRepository.findAll();
    }

    public Tour getTourById(UUID id){
        return tourRepository.findById(id).orElseThrow(()->new TourNotFoundException(id));
    }

    public void deleteTourById(UUID id){
        tourRepository.deleteById(id);
    }
}
