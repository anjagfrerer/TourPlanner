package at.technikum.backend.controller;

import at.technikum.backend.dto.TourLogDto;
import at.technikum.backend.service.TourLogService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tourLogs")
public class TourLogController {

    private final TourLogService tourLogService;

    TourLogController(TourLogService tourLogService) {
        this.tourLogService = tourLogService;
    }

    @PostMapping
    public TourLogDto create(@RequestBody TourLogDto tourLogDto) {
        return tourLogService.save(tourLogDto);
    }

    @GetMapping("/{id}")
    public TourLogDto read(@PathVariable Long id) {
        return tourLogService.getById(id);
    }

    @GetMapping
    public List<TourLogDto> readAll() {
        return tourLogService.findAll();
    }

    @PutMapping("/{id}")
    public TourLogDto update(@PathVariable Long id, @RequestBody TourLogDto tourLogDto) {
        return tourLogService.update(id, tourLogDto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        tourLogService.delete(id);
    }
}
