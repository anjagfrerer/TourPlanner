package at.technikum.backend.controller;

import at.technikum.backend.dto.TourResponse;
import at.technikum.backend.entity.User;
import at.technikum.backend.mapper.TourMapper;
import at.technikum.backend.entity.Tour;
import at.technikum.backend.service.TourService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


//TODO: Switch up Entities for actual DTOs
@RestController
@RequestMapping("/tour")
@CrossOrigin(origins = "http://localhost:4200")
public class TourController {
    private final TourService tourService;
    private final TourMapper mapper;

    public TourController(TourService tourService,  TourMapper mapper) {
        this.tourService = tourService;
        this.mapper = mapper;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Tour> getAllTours() {
        return tourService.getAllTours();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TourResponse addTour(@RequestBody Tour tour, @AuthenticationPrincipal User user) {
        tour.setCreatedBy(user);
        return mapper.toTourResponse(tourService.addTour(tour));
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Tour getTour(@PathVariable UUID id) {
        return tourService.getTourById(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteTour(@PathVariable UUID id) {
        tourService.deleteTourById(id);
    }
}
