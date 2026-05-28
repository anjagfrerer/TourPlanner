package at.technikum.backend.service;

import at.technikum.backend.dto.request.RequestTourLogDto;
import at.technikum.backend.dto.response.ResponseTourLogDto;
import at.technikum.backend.entity.Tour;
import at.technikum.backend.entity.TourLog;
import at.technikum.backend.entity.User;
import at.technikum.backend.mapper.TourLogMapper;
import at.technikum.backend.repository.TourLogRepository;
import at.technikum.backend.repository.TourRepository;
import at.technikum.backend.repository.UserRepository;
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
    private final UserRepository userRepository;

    @Transactional
    public ResponseTourLogDto save(UUID tourId, RequestTourLogDto requestTourLogDto, String username) {
        Tour tour = tourRepository.findById(tourId).orElseThrow(() -> new RuntimeException("Tour not found"));
        User currentUser = userRepository.findByUsername(username).orElseThrow(() -> new EntityNotFoundException("User not found"));
        TourLog entity = mapper.toEntity(requestTourLogDto);
        entity.setTour(tour);
        entity.setAuthor(currentUser);
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
        TourLog tourLog = findAndValidateLog(tourId, tourLogId);
        return mapper.toResponseDto(tourLog);
    }

    @Transactional
    public ResponseTourLogDto update(UUID tourId, UUID tourLogId, RequestTourLogDto requestTourLogDto, String username) {
        TourLog existingTourLog = findAndValidateLog(tourId, tourLogId);

        //darf der Nutze überhaupt bearbeiten?
        if(!existingTourLog.getAuthor().getUsername().equals(username)) {
            throw new IllegalArgumentException("User not allowed to update this Log!");
        }
        //existingTourLog.setAuthor(requestTourLogDto.getAuthor());
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
    public ResponseTourLogDto delete(UUID tourId, UUID tourLogId, String username) {
        TourLog tourLog = findAndValidateLog(tourId, tourLogId);
        if(!tourLog.getAuthor().getUsername().equals(username)) {
            throw new IllegalArgumentException("User not allowed to delete this Log!");
        }
        tourLogRepository.delete(tourLog);
        return mapper.toResponseDto(tourLog);
    }
}