package at.technikum.backend.controller;

import at.technikum.backend.dto.request.RequestTourLogDto;
import at.technikum.backend.dto.response.ResponseTourLogDto;
import at.technikum.backend.model.TourLog;
import at.technikum.backend.service.TourLogMapper;
import at.technikum.backend.service.TourLogService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/tours/{tourId}/logs")
public class TourLogController {

    private final TourLogService tourLogService;

    TourLogController(TourLogService tourLogService) {
        this.tourLogService = tourLogService;
    }

    @PostMapping
    public ResponseEntity<ResponseTourLogDto> create(@PathVariable UUID tourId, @RequestBody RequestTourLogDto requestTourLogDto) {
        ResponseTourLogDto responseTourLogDto = tourLogService.save(tourId, requestTourLogDto);
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
    public ResponseEntity<ResponseTourLogDto> update(@PathVariable UUID tourId, @PathVariable UUID tourLogId, @RequestBody RequestTourLogDto requestTourLogDto) {
        ResponseTourLogDto responseTourLogDto = tourLogService.update(tourId, tourLogId, requestTourLogDto);
        return new ResponseEntity<>(responseTourLogDto, HttpStatus.OK);
    }

    @DeleteMapping("/{tourLogId}")
    public ResponseEntity<ResponseTourLogDto> delete(@PathVariable UUID tourId, @PathVariable UUID tourLogId) {
        ResponseTourLogDto responseTourLogDto = tourLogService.delete(tourId, tourLogId);
        return new ResponseEntity<>(responseTourLogDto, HttpStatus.OK);
    }
}
