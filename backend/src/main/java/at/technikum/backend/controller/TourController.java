package at.technikum.backend.controller;

import at.technikum.backend.dto.request.TourRequest;
import at.technikum.backend.dto.response.TourResponse;
import at.technikum.backend.entity.Tour;
import at.technikum.backend.entity.User;
import at.technikum.backend.mapper.TourMapper;
import at.technikum.backend.service.TourService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/tour")
@CrossOrigin(origins = "http://localhost:4200")
@Slf4j
public class TourController {
    private final TourService tourService;
    private final TourMapper mapper;

    public TourController(TourService tourService, TourMapper mapper) {
        this.tourService = tourService;
        this.mapper = mapper;
    }

    @GetMapping
    public ResponseEntity<List<TourResponse>> getAllTours(@RequestParam(value = "search", required = false) String search) {
        log.info("Fetching tours with search term '{}'", search);

        List<TourResponse> tours = tourService.getAllTours(search).stream()
                .map(mapper::toTourResponse)
                .toList();
        log.debug("Found {} tours", tours.size());
        return ResponseEntity.ok(tours);
    }

    @PostMapping
    public ResponseEntity<TourResponse> addTour(@RequestBody TourRequest request, @AuthenticationPrincipal User user) {
        log.info("User '{}' creates a new tour from '{}' to '{}'",
                user.getUsername(),
                request.startLocation(),
                request.destinationLocation());

        Tour tour = mapper.toTour(request);
        tour.setCreatedBy(user);

        TourResponse response = mapper.toTourResponse(tourService.addTour(tour));

        log.info("Created tour with ID '{}'", response.id());

        return ResponseEntity
                .created(URI.create("/tour/" + response.id()))
                .body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TourResponse> getTour(@PathVariable UUID id) {
        log.info("Fetching tour with ID '{}'", id);

        TourResponse response = mapper.toTourResponse(tourService.getTourById(id));


        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTour(@PathVariable UUID id) {
        log.info("Deleting tour with ID '{}'", id);
        tourService.deleteTourById(id);

        log.info("Deleted tour with ID '{}'", id);
        return ResponseEntity.noContent().build();
    }
}
