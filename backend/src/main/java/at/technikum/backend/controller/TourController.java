package at.technikum.backend.controller;

import at.technikum.backend.dto.request.TourRequest;
import at.technikum.backend.dto.response.TourResponse;
import at.technikum.backend.entity.Tour;
import at.technikum.backend.entity.User;
import at.technikum.backend.mapper.TourMapper;
import at.technikum.backend.service.TourService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/tour")
@CrossOrigin(origins = "http://localhost:4200")
public class TourController {
    private final TourService tourService;
    private final TourMapper mapper;

    public TourController(TourService tourService, TourMapper mapper) {
        this.tourService = tourService;
        this.mapper = mapper;
    }

    @GetMapping
    public ResponseEntity<List<TourResponse>> getAllTours(@RequestParam(value = "search", required = false) String search) {
        List<TourResponse> tours = tourService.getAllTours().stream()
                .map(mapper::toTourResponse)
                .toList();

        return ResponseEntity.ok(tours);
    }

    @PostMapping
    public ResponseEntity<TourResponse> addTour(@RequestBody TourRequest request, @AuthenticationPrincipal User user) {
        Tour tour = mapper.toTour(request);
        tour.setCreatedBy(user);
        TourResponse response = mapper.toTourResponse(tourService.addTour(tour));

        return ResponseEntity
                .created(URI.create("/tour/" + response.id()))
                .body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TourResponse> getTour(@PathVariable UUID id) {
        TourResponse response = mapper.toTourResponse(tourService.getTourById(id));

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTour(@PathVariable UUID id) {
        tourService.deleteTourById(id);

        return ResponseEntity.noContent().build();
    }
}
