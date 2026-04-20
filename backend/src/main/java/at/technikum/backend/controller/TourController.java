package at.technikum.backend.controller;

import at.technikum.backend.model.Tour;
import at.technikum.backend.service.TourService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


//TODO: Switch up Entities for actual DTOs
//TODO: IDs are Long not int
@RestController
@RequestMapping("/tour")
@RequiredArgsConstructor
public class TourController {
    private final TourService tourService;

    @GetMapping
    public List<Tour> getAllTours() {
        return tourService.getAllTours();
    }

    @GetMapping("/{id}")
    public Tour getTour(@PathVariable UUID id) {
        return tourService.getTourById(id);
    }

    @PostMapping
    public void addTour(@RequestBody Tour tour) {
        tourService.addTour(tour);
    }

    @DeleteMapping("/{id}")
    public void deleteTour(@PathVariable UUID id) {
        tourService.deleteTourById(id);
    }
}
