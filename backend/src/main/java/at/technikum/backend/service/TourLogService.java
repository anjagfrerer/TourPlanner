package at.technikum.backend.service;

import at.technikum.backend.dto.request.RequestTourLogDto;
import at.technikum.backend.dto.response.ResponseTourLogDto;
import at.technikum.backend.entity.Tour;
import at.technikum.backend.entity.TourLog;
import at.technikum.backend.repository.TourLogRepository;
import at.technikum.backend.repository.TourRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TourLogService {

    private final TourLogRepository tourLogRepository;
    private final TourLogMapper mapper;
    private final TourRepository tourRepository;

    @Transactional
    public ResponseTourLogDto save(UUID tourId, RequestTourLogDto requestTourLogDto) {
        Tour tour = tourRepository.findById(tourId).orElseThrow(() -> new RuntimeException("Tour not found"));
        TourLog entity = mapper.toEntity(requestTourLogDto);
        entity.setTour(tour);
        TourLog savedEntity = tourLogRepository.save(entity);
        return mapper.toResponseDto(savedEntity);
    }

    @Transactional(readOnly = true)
    public List<ResponseTourLogDto> findAll(UUID tourId) {
        Tour tour = tourRepository.findById(tourId).orElseThrow(() -> new RuntimeException("Tour not found"));
        return tourLogRepository.findByTour_Id(tourId)
                .stream()
                .map(mapper::toResponseDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public ResponseTourLogDto getById(UUID tourId, UUID tourLogId) {
        TourLog tourLog = findAndValidateLog(tourLogId, tourId);
        return mapper.toResponseDto(tourLog);
    }

    @Transactional
    public ResponseTourLogDto update(UUID tourId, UUID tourLogId, RequestTourLogDto requestTourLogDto) {
        TourLog existingTourLog = findAndValidateLog(tourId, tourLogId);

        existingTourLog.setAuthor(requestTourLogDto.getAuthor());
        existingTourLog.setDate(requestTourLogDto.getDate());
        existingTourLog.setTime(requestTourLogDto.getTime());
        existingTourLog.setRating(requestTourLogDto.getRating());
        existingTourLog.setDifficulty(requestTourLogDto.getDifficulty());
        existingTourLog.setTotalDistanceKm(requestTourLogDto.getTotalDistanceKm());
        existingTourLog.setTotalTimeMin(requestTourLogDto.getTotalTimeMin());
        existingTourLog.setComment(requestTourLogDto.getComment());

        return mapper.toResponseDto(tourLogRepository.save(existingTourLog));
    }

    public TourLog findAndValidateLog(UUID tourId, UUID tourLogId) {
        // Schauen, ob ein log mit dieser tourLogId existiert
        TourLog log = tourLogRepository.findById(tourLogId).orElseThrow(() -> new EntityNotFoundException("Log not found"));
        // Schauen, ob diese tour zu diesem log gehört
        if(!log.getTour().getId().equals(tourId)) {
            throw new IllegalArgumentException("Log does not belong to that specific tour");
        }
        return log;
    }

    @Transactional
    public ResponseTourLogDto delete(UUID tourId, UUID tourLogId) {
        TourLog tourLog = findAndValidateLog(tourId, tourLogId);
        tourLogRepository.delete(tourLog);
        return mapper.toResponseDto(tourLog);
    }
}