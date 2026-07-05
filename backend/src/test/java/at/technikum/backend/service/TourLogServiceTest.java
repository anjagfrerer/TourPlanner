package at.technikum.backend.service;

import at.technikum.backend.dto.request.RequestTourLogDto;
import at.technikum.backend.dto.response.ResponseTourLogDto;
import at.technikum.backend.entity.Tour;
import at.technikum.backend.entity.TourLog;
import at.technikum.backend.entity.User;
import at.technikum.backend.exceptions.LogTourMismatchException;
import at.technikum.backend.exceptions.TourNotFoundException;
import at.technikum.backend.exceptions.UnauthorizedAccessException;
import at.technikum.backend.exceptions.UserNotFoundException;
import at.technikum.backend.mapper.TourLogMapper;
import at.technikum.backend.repository.TourLogRepository;
import at.technikum.backend.repository.TourRepository;
import at.technikum.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Unit-Tests für den TourLogService.
 * Getestet wird die zentrale Logik rund um Tour-Logs:
 * Berechtigungen (nur der Autor darf bearbeiten/löschen),
 * Zuordnung zwischen Tour und Log sowie Existenzprüfungen.
 * Fehler hier würden sich direkt auf Sicherheit und Daten auswirken.
 */
@ExtendWith(MockitoExtension.class)
class TourLogServiceTest {

    @Mock
    private TourLogRepository tourLogRepository;
    @Mock
    private TourLogMapper mapper;
    @Mock
    private TourRepository tourRepository;
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private TourLogService tourLogService;

    private UUID tourId;
    private UUID tourLogId;
    private Tour tour;
    private User author;
    private TourLog tourLog;
    private RequestTourLogDto requestDto;

    @BeforeEach
    void setUp() {
        tourId = UUID.randomUUID();
        tourLogId = UUID.randomUUID();

        tour = new Tour();
        tour.setId(tourId);

        author = User.builder()
                .id(UUID.randomUUID())
                .username("maxmustermann")
                .password("encoded")
                .build();

        tourLog = new TourLog();
        tourLog.setTourLogId(tourLogId);
        tourLog.setTour(tour);
        tourLog.setAuthor(author);
        tourLog.setComment("Super Tour!");

        requestDto = new RequestTourLogDto(
                tourId, LocalDate.now(), LocalTime.NOON, 5, 3, 10.0, 90, "Super Tour!"
        );
    }

    @Test
    @DisplayName("save legt einen neuen TourLog an, wenn Tour und User existieren")
    void save_validTourAndUser_createsTourLog() {
        when(tourRepository.findById(tourId)).thenReturn(Optional.of(tour)); // Optional: auch die Rückgabe im echten Leben
        when(userRepository.findByUsername("maxmustermann")).thenReturn(Optional.of(author));
        when(mapper.toEntity(requestDto)).thenReturn(new TourLog());
        when(tourLogRepository.save(any(TourLog.class))).thenReturn(tourLog);
        when(mapper.toResponseDto(tourLog)).thenReturn(new ResponseTourLogDto());

        ResponseTourLogDto result = tourLogService.save(tourId, requestDto, "maxmustermann");

        assertThat(result).isNotNull();
        verify(tourLogRepository, times(1)).save(any(TourLog.class));
    }

    @Test
    @DisplayName("save wirft TourNotFoundException, wenn die Tour nicht existiert")
    void save_unknownTour_throwsTourNotFoundException() {
        when(tourRepository.findById(tourId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> tourLogService.save(tourId, requestDto, "maxmustermann"))
                .isInstanceOf(TourNotFoundException.class);

        verifyNoInteractions(tourLogRepository);
    }

    @Test
    @DisplayName("save wirft UserNotFoundException, wenn der User nicht existiert")
    void save_unknownUser_throwsUserNotFoundException() {
        when(tourRepository.findById(tourId)).thenReturn(Optional.of(tour));
        when(userRepository.findByUsername("unknown")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> tourLogService.save(tourId, requestDto, "unknown"))
                .isInstanceOf(UserNotFoundException.class);
    }

    @Test
    @DisplayName("findAll gibt alle Logs einer existierenden Tour zurück")
    void findAll_existingTour_returnsLogs() {
        when(tourRepository.findById(tourId)).thenReturn(Optional.of(tour));
        when(tourLogRepository.findByTour_Id(tourId)).thenReturn(List.of(tourLog));
        when(mapper.toResponseDto(tourLog)).thenReturn(new ResponseTourLogDto());

        List<ResponseTourLogDto> result = tourLogService.findAll(tourId);

        assertThat(result).hasSize(1);
    }

    @Test
    @DisplayName("findAll wirft TourNotFoundException bei unbekannter Tour-ID")
    void findAll_unknownTour_throwsException() {
        when(tourRepository.findById(tourId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> tourLogService.findAll(tourId))
                .isInstanceOf(TourNotFoundException.class);
    }

    @Test
    @DisplayName("findAllByUsername gibt alle Logs eines Users zurück")
    void findAllByUsername_returnsLogsOfUser() {
        when(tourLogRepository.findAllByAuthor_Username("maxmustermann")).thenReturn(List.of(tourLog));
        when(mapper.toResponseDto(tourLog)).thenReturn(new ResponseTourLogDto());

        List<ResponseTourLogDto> result = tourLogService.findAllByUsername("maxmustermann");

        assertThat(result).hasSize(1);
    }

    @Test
    @DisplayName("findAndValidateLog wirft LogTourMismatchException, wenn Log zu anderer Tour gehört")
    void findAndValidateLog_mismatchedTour_throwsException() {
        UUID otherTourId = UUID.randomUUID();
        when(tourLogRepository.findById(tourLogId)).thenReturn(Optional.of(tourLog));

        assertThatThrownBy(() -> tourLogService.findAndValidateLog(otherTourId, tourLogId))
                .isInstanceOf(LogTourMismatchException.class);
    }

    @Test
    @DisplayName("update aktualisiert den Log, wenn der anfragende User der Autor ist")
    void update_byOwner_updatesFields() {
        when(tourLogRepository.findById(tourLogId)).thenReturn(Optional.of(tourLog));
        when(tourLogRepository.save(tourLog)).thenReturn(tourLog);
        when(mapper.toResponseDto(tourLog)).thenReturn(new ResponseTourLogDto());

        tourLogService.update(tourId, tourLogId, requestDto, "maxmustermann");

        assertThat(tourLog.getComment()).isEqualTo("Super Tour!");
        assertThat(tourLog.getRating()).isEqualTo(5);
        verify(tourLogRepository).save(tourLog);
    }

    @Test
    @DisplayName("update wirft UnauthorizedAccessException, wenn ein anderer User bearbeiten will")
    void update_byOtherUser_throwsUnauthorized() {
        when(tourLogRepository.findById(tourLogId)).thenReturn(Optional.of(tourLog));

        assertThatThrownBy(() -> tourLogService.update(tourId, tourLogId, requestDto, "anderer_user"))
                .isInstanceOf(UnauthorizedAccessException.class);

        verify(tourLogRepository, never()).save(any());
    }

    @Test
    @DisplayName("delete entfernt den Log, wenn der anfragende User der Autor ist")
    void delete_byOwner_deletesLog() {
        when(tourLogRepository.findById(tourLogId)).thenReturn(Optional.of(tourLog));
        when(mapper.toResponseDto(tourLog)).thenReturn(new ResponseTourLogDto());

        tourLogService.delete(tourId, tourLogId, "maxmustermann");

        verify(tourLogRepository, times(1)).delete(tourLog);
    }

    @Test
    @DisplayName("delete wirft UnauthorizedAccessException, wenn ein anderer User löschen will")
    void delete_byOtherUser_throwsUnauthorized() {
        when(tourLogRepository.findById(tourLogId)).thenReturn(Optional.of(tourLog));

        assertThatThrownBy(() -> tourLogService.delete(tourId, tourLogId, "anderer_user"))
                .isInstanceOf(UnauthorizedAccessException.class);

        verify(tourLogRepository, never()).delete(any());
    }
}