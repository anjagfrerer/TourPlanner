package at.technikum.backend.controller;

import at.technikum.backend.dto.request.RequestTourLogDto;
import at.technikum.backend.dto.response.ResponseTourLogDto;
import at.technikum.backend.entity.User;
import at.technikum.backend.service.TourLogService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/tour/{tourId}/logs")
@CrossOrigin(origins = "http://localhost:4200")
public class TourLogController {

    private final TourLogService tourLogService;

    TourLogController(TourLogService tourLogService) {
        this.tourLogService = tourLogService;
    }

    @PostMapping
    public ResponseEntity<ResponseTourLogDto> create(@PathVariable UUID tourId, @Valid @RequestBody RequestTourLogDto requestTourLogDto, @AuthenticationPrincipal User loggedInUser) {
        ResponseTourLogDto responseTourLogDto = tourLogService.save(tourId, requestTourLogDto, loggedInUser.getUsername());
        return new ResponseEntity<>(responseTourLogDto, HttpStatus.CREATED);
    }

    @GetMapping("/{tourLogId}")
    public ResponseEntity<ResponseTourLogDto> read(@PathVariable UUID tourId, @PathVariable UUID tourLogId) {
        ResponseTourLogDto responseTourLogDto = tourLogService.getById(tourId, tourLogId);
        return new ResponseEntity<>(responseTourLogDto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<ResponseTourLogDto>> readAll(@PathVariable UUID tourId) {
        List<ResponseTourLogDto> responseTourLogDtoList = tourLogService.findAll(tourId);
        return new ResponseEntity<>(responseTourLogDtoList, HttpStatus.OK);
    }

    @PutMapping("/{tourLogId}")
    public ResponseEntity<ResponseTourLogDto> update(@PathVariable UUID tourId, @PathVariable UUID tourLogId, @Valid @RequestBody RequestTourLogDto requestTourLogDto, @AuthenticationPrincipal User loggedInUser) {
        ResponseTourLogDto responseTourLogDto = tourLogService.update(tourId, tourLogId, requestTourLogDto, loggedInUser.getUsername());
        return new ResponseEntity<>(responseTourLogDto, HttpStatus.OK);
    }

    @DeleteMapping("/{tourLogId}")
    public ResponseEntity<ResponseTourLogDto> delete(@PathVariable UUID tourId, @PathVariable UUID tourLogId, @AuthenticationPrincipal User loggedInUser) {
        ResponseTourLogDto responseTourLogDto = tourLogService.delete(tourId, tourLogId, loggedInUser.getUsername());
        return new ResponseEntity<>(responseTourLogDto, HttpStatus.OK);
    }
}
