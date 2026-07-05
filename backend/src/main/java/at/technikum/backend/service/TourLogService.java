package at.technikum.backend.service;

import at.technikum.backend.controller.GlobalTourLogController;
import at.technikum.backend.dto.request.RequestTourLogDto;
import at.technikum.backend.dto.response.ResponseTourLogDto;
import at.technikum.backend.entity.Tour;
import at.technikum.backend.entity.TourLog;
import at.technikum.backend.entity.User;
import at.technikum.backend.exceptions.*;
import at.technikum.backend.mapper.TourLogMapper;
import at.technikum.backend.repository.TourLogRepository;
import at.technikum.backend.repository.TourRepository;
import at.technikum.backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.apache.juli.logging.LogConfigurationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private static final Logger logger = LoggerFactory.getLogger(GlobalTourLogController.class);

    @Transactional
    public ResponseTourLogDto save(UUID tourId, RequestTourLogDto requestTourLogDto, String username) {
        logger.info("BL: Creating new tour log for tour ID '{}' by user '{}'", tourId, username);
        Tour tour = tourRepository.findById(tourId).orElseThrow(() -> {
            logger.warn("BL: Creation failed. Tour with ID '{}' not found", tourId);
            return new TourNotFoundException(tourId);
        });
        User currentUser = userRepository.findByUsername(username).orElseThrow(() -> {
            logger.warn("BL: Creation failed. User '{}' not found", username);
            return new UserNotFoundException(username);
        });
        TourLog entity = mapper.toEntity(requestTourLogDto);
        entity.setTour(tour);
        entity.setAuthor(currentUser);
        TourLog savedEntity = tourLogRepository.save(entity);
        updatePopularFlag(tour); //To count logs for popular tags
        logger.info("BL: Successfully created tour log with ID '{}'", savedEntity.getTourLogId());
        return mapper.toResponseDto(savedEntity);
    }

    // von anja: alte methode
    @Transactional(readOnly = true)
    public List<ResponseTourLogDto> findAll(UUID tourId) {
        logger.info("BL: Fetching all tour logs for tour ID '{}'", tourId);
        tourRepository.findById(tourId).orElseThrow(() -> new TourNotFoundException(tourId));

        List<TourLog> logs = tourLogRepository.findByTour_Id(tourId);
        return logs.stream().map(mapper::toResponseDto).toList();
    }

    // von anja: neue methode für fulltextsearch
    @Transactional(readOnly = true)
    public List<ResponseTourLogDto> findAll(UUID tourId, String search) {
        if (search == null || search.isEmpty()) {
            return findAll(tourId);
        }
        logger.info("BL: Fetching filtered tour logs for tour ID '{}' with search term '{}'", tourId, search);
        tourRepository.findById(tourId).orElseThrow(() -> new TourNotFoundException(tourId));

        List<TourLog> logs = tourLogRepository.searchByTourIdAndTerm(tourId, search.trim());
        return logs.stream().map(mapper::toResponseDto).toList();
    }

    // von anja: alte methode
    @Transactional(readOnly = true)
    public List<ResponseTourLogDto> findAllByUsername(String username) {
        logger.info("BL: Fetching all tour logs created by user '{}'", username);

        List<TourLog> logs = tourLogRepository.findAllByAuthor_Username(username);
        return logs.stream().map(mapper::toResponseDto).toList();
    }

    // von anja: neue methode für fulltextsearch
    @Transactional(readOnly = true)
    public List<ResponseTourLogDto> findAllByUsername(String username, String search) {
        if (search == null || search.isEmpty()) {
            return findAllByUsername(username);
        }
        logger.info("BL: Fetching filtered tour logs for user '{}' with search term '{}'", username, search);

        List<TourLog> logs = tourLogRepository.searchByUsernameAndTerm(username, search.trim());
        return logs.stream().map(mapper::toResponseDto).toList();
    }

    @Transactional(readOnly = true)
    public ResponseTourLogDto getById(UUID tourId, UUID tourLogId) {
        logger.info("BL: Fetching tour log ID '{}' for tour ID '{}'", tourLogId, tourId);
        TourLog tourLog = findAndValidateLog(tourId, tourLogId);
        return mapper.toResponseDto(tourLog);
    }

    @Transactional
    public ResponseTourLogDto update(UUID tourId, UUID tourLogId, RequestTourLogDto requestTourLogDto, String username) {
        logger.info("BL: Updating tour log ID '{}' for tour ID '{}' by user '{}'", tourLogId, tourId, username);
        TourLog existingTourLog = findAndValidateLog(tourId, tourLogId);
        //darf der Nutze überhaupt bearbeiten?
        if(!existingTourLog.getAuthor().getUsername().equals(username)) {
            logger.warn("BL: Unauthorized update attempt! User '{}' tried to edit a log owned by '{}'", username, existingTourLog.getAuthor().getUsername());
            throw new UnauthorizedAccessException();
        }
        //existingTourLog.setAuthor(requestTourLogDto.getAuthor());
        existingTourLog.setDate(requestTourLogDto.getDate());
        existingTourLog.setTime(requestTourLogDto.getTime());
        existingTourLog.setRating(requestTourLogDto.getRating());
        existingTourLog.setDifficulty(requestTourLogDto.getDifficulty());
        existingTourLog.setTotalDistanceKm(requestTourLogDto.getTotalDistanceKm());
        existingTourLog.setTotalTimeMin(requestTourLogDto.getTotalTimeMin());
        existingTourLog.setComment(requestTourLogDto.getComment());

        logger.info("BL: Successfully updated tour log ID '{}'", tourLogId);

        return mapper.toResponseDto(tourLogRepository.save(existingTourLog));
    }

    public TourLog findAndValidateLog(UUID tourId, UUID tourLogId) {
        // Schauen, ob ein log mit dieser tourLogId existiert
        TourLog log = tourLogRepository.findById(tourLogId).orElseThrow(() -> {
            logger.warn("BL: Validation failed. Tour log with ID '{}' does not exist", tourLogId);
            return new LogNotFoundException(tourLogId);
        });        
        // Schauen, ob diese tour zu diesem log gehört
        if(!log.getTour().getId().equals(tourId)) {            
            logger.warn("BL: Mismatch! Tour log ID '{}' does not belong to tour ID '{}'", tourLogId, tourId);
            throw new LogTourMismatchException(tourId, tourLogId);
        }
        return log;
    }

    @Transactional
    public ResponseTourLogDto delete(UUID tourId, UUID tourLogId, String username) {
        logger.info("BL: Request to delete tour log ID '{}' by user '{}'", tourLogId, username);
        TourLog tourLog = findAndValidateLog(tourId, tourLogId);
        if(!tourLog.getAuthor().getUsername().equals(username)) {
            logger.warn("BL: Unauthorized deletion attempt! User '{}' tried to delete a log owned by '{}'", username, tourLog.getAuthor().getUsername());
            throw new UnauthorizedAccessException();
        }
        tourLogRepository.delete(tourLog);
        logger.info("BL: Successfully deleted tour log ID '{}'", tourLogId);
        return mapper.toResponseDto(tourLog);
    }

    // Helper
    private void updatePopularFlag(Tour tour) {
        long logCount = tourLogRepository.countByTour_Id(tour.getId());
        tour.setPopular(logCount > 5);
        tourRepository.save(tour);
    }
}