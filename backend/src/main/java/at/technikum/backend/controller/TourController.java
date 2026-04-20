package at.technikum.backend.controller;

import at.technikum.backend.model.Tour;
import at.technikum.backend.service.TourService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


//TODO: Switch up Entities for actual DTOs
@RestController
@RequestMapping("/api/tour")
public class TourController {
    private final TourService tourService;

    public TourController(TourService tourService) {
        this.tourService = tourService;
    }

    @GetMapping
    public List<Tour> getAllTours() {
        return tourService.getTours();
    }

    @GetMapping("/{id}")
    public Tour getTour(@PathVariable int id) {
        return tourService.getTourById(id).get();
    }

    @PostMapping
    public void addTour(@RequestBody Tour tour) {
        tourService.addTour(tour);
    }

    @DeleteMapping("/{id}")
    public void deleteTour(@PathVariable int id) {
        tourService.deleteTourById(id);
    }
}
