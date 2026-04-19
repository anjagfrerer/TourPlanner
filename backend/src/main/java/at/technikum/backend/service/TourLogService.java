package at.technikum.backend.service;

import at.technikum.backend.dto.TourLogDto;
import at.technikum.backend.model.TourLog;
import at.technikum.backend.repository.TourLogRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TourLogService {

    private final TourLogRepository repository;

    public TourLogService(TourLogRepository repository) {
        this.repository = repository;
    }

    public TourLogDto save(TourLogDto dto) {
        TourLog entity = mapToEntity(dto);
        TourLog savedEntity = repository.save(entity);
        return mapToDto(savedEntity);
    }

    public List<TourLogDto> findAll() {
        List<TourLogDto> allTourLogDtos = new ArrayList<>();
        for(TourLog tourLog : repository.findAll()) {
            allTourLogDtos.add(this.mapToDto(tourLog));
        }
        return allTourLogDtos;
    }

    public TourLogDto update(Long id, TourLogDto dto) {
        dto.setTourLogId(id);
        return save(dto);
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