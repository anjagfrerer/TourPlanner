package at.technikum.backend.service;

import at.technikum.backend.dto.TourLogDto;
import at.technikum.backend.model.TourLog;
import at.technikum.backend.repository.TourLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TourLogService {

    private final TourLogRepository repository;

    public TourLogService(TourLogRepository repository) {
        this.repository = repository;
    }

    // Receives a DTO from the Controller, converts it to an Entity, saves it, and returns the result as a DTO again
    public TourLogDto save(TourLogDto dto) {
        // 1. Map DTO to Entity (Prepare for Storage)
        TourLog entity = mapToEntity(dto);
        // 2. Save in the "dumb" list repository
        TourLog savedEntity = repository.save(entity);
        // 3. Map back to DTO (Return to Frontend)
        return mapToDto(savedEntity);
    }

    // Gets all logs and converts them to DTOs
    public List<TourLogDto> findAll() {
        return repository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public TourLogDto getById(Long id) {
        return mapToDto(repository.getById(id));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    private TourLog mapToEntity(TourLogDto dto) {
        TourLog tourLog = new TourLog();
        tourLog.setTourLogId(dto.getTourLogId());
        tourLog.setTourId(dto.getTourId());
        tourLog.setAuthor(dto.getAuthor());
        tourLog.setDate(dto.getDate());
        tourLog.setTime(dto.getTime());
        tourLog.setRating(dto.getRating());
        tourLog.setDifficulty(dto.getDifficulty());
        tourLog.setTotalDistanceKm(dto.getTotalDistanceKm());
        tourLog.setTotalTimeMin(dto.getTotalTimeMin());
        tourLog.setComment(dto.getComment());
        return tourLog;
    }

    private TourLogDto mapToDto(TourLog tourLog) {
        TourLogDto dto = new TourLogDto();
        dto.setTourLogId(tourLog.getTourLogId());
        dto.setTourId(tourLog.getTourId());
        dto.setAuthor(tourLog.getAuthor());
        dto.setDate(tourLog.getDate());
        dto.setTime(tourLog.getTime());
        dto.setRating(tourLog.getRating());
        dto.setDifficulty(tourLog.getDifficulty());
        dto.setTotalDistanceKm(tourLog.getTotalDistanceKm());
        dto.setTotalTimeMin(tourLog.getTotalTimeMin());
        dto.setComment(tourLog.getComment());
        return dto;
    }
}