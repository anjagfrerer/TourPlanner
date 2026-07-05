package at.technikum.backend.service;

import at.technikum.backend.constants.TransportType;
import at.technikum.backend.dto.Coordinates;
import at.technikum.backend.dto.response.RouteResponse;
import at.technikum.backend.entity.Tour;
import at.technikum.backend.entity.User;
import at.technikum.backend.exceptions.TourNotFoundException;
import at.technikum.backend.repository.TourRepository;
import tools.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

/**
 * Unit-Tests für den TourService.
 * Getestet wird die grundlegende Logik rund um Touren:
 * Anlegen, Laden, Löschen und Fehlerfälle.
 * Wichtig ist hier vor allem, dass der Service korrekt mit dem Repository
 * zusammenarbeitet und passende Exceptions wirft, wenn etwas nicht gefunden wird.
 */
@ExtendWith(MockitoExtension.class)
class TourServiceTest {

    @Mock
    private TourRepository tourRepository;

    @Mock
    private OpenRouteService openRouteService;

    @Mock
    private ObjectMapper objectMapper;

    @InjectMocks
    private TourService tourService;

    private Tour sampleTour;
    private User sampleUser;
    private UUID tourId;

    @BeforeEach
    void setUp() {
        tourId = UUID.randomUUID();
        sampleUser = new User();
        sampleUser.setId(UUID.randomUUID());
        sampleUser.setUsername("maxmustermann");

        sampleTour = new Tour();
        sampleTour.setId(tourId);
        sampleTour.setName("Wienerwald Runde");
        sampleTour.setStartLocation("Biosphärenpark Wienerwald Kernzone Mauerbach");
        sampleTour.setDestinationLocation("Biosphärenpark Wienerwald Kernzone Waldschafferin");
        sampleTour.setTransportType(TransportType.BIKING);
        sampleTour.setDescription("Schöne Runde durch den Wienerwald");
        sampleTour.setDistance(12.5);
        sampleTour.setCreatedBy(sampleUser);
    }

    @Test
    @DisplayName("addTour speichert die Tour über das Repository und gibt sie zurück")
    void addTour_savesAndReturnsTour() {
        RouteResponse routeResponse = new RouteResponse(
                new Coordinates(16.189691,48.258316),
                new Coordinates(16.259671,48.239545),
                12500.0,
                3600.0,
                List.of()
        );

        when(openRouteService.getDirections(
                sampleTour.getStartLocation(),
                sampleTour.getDestinationLocation(),
                sampleTour.getTransportType()
        )).thenReturn(routeResponse);

        when(objectMapper.writeValueAsString(routeResponse.geometry()))
                .thenReturn("[]");

        when(tourRepository.save(sampleTour)).thenReturn(sampleTour);

        Tour result = tourService.addTour(sampleTour);

        assertThat(result).isEqualTo(sampleTour);
        verify(tourRepository, times(1)).save(sampleTour);
    }

    @Test
    @DisplayName("getAllTours gibt alle oeffentlichen Touren aus dem Repository zurueck")
    void getAllTours_returnsAllTours() {
        when(tourRepository.findByPublicTourTrueOrPublicTourIsNull()).thenReturn(List.of(sampleTour));

        List<Tour> result = tourService.getAllTours("");

        assertThat(result).hasSize(1).containsExactly(sampleTour);
    }

    @Test
    @DisplayName("getTourById gibt die Tour zurück, wenn sie existiert")
    void getTourById_existingId_returnsTour() {
        when(tourRepository.findById(tourId)).thenReturn(Optional.of(sampleTour));

        Tour result = tourService.getTourById(tourId);

        assertThat(result).isEqualTo(sampleTour);
    }

    @Test
    @DisplayName("getTourById wirft EntityNotFoundException, wenn die Tour nicht existiert")
    void getTourById_nonExistingId_throwsException() {
        UUID unknownId = UUID.randomUUID();
        when(tourRepository.findById(unknownId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> tourService.getTourById(unknownId))
                .isInstanceOf(TourNotFoundException.class);
    }

    @Test
    @DisplayName("deleteTourById delegiert das Löschen korrekt an das Repository")
    void deleteTourById_delegatesToRepository() {
        when(tourRepository.findById(tourId)).thenReturn(Optional.of(sampleTour));

        tourService.deleteTourById(tourId, sampleUser);

        verify(tourRepository, times(1)).delete(sampleTour);
    }
}
