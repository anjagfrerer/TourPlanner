package at.technikum.backend.controller;

import at.technikum.backend.dto.TourRequest;
import at.technikum.backend.dto.TourResponse;
import at.technikum.backend.mapper.TourMapper;
import at.technikum.backend.model.Tour;
import at.technikum.backend.service.TourService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


//TODO: Switch up Entities for actual DTOs
@RestController
@RequestMapping("/tour")
@CrossOrigin
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
    public TourResponse addTour(@RequestBody Tour tour) {
        Tour addedTour = tourService.addTour(tour);
        return mapper.toTourResponse(addedTour);
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
