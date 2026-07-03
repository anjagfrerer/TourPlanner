package at.technikum.backend.service;

import at.technikum.backend.entity.Tour;
import at.technikum.backend.exceptions.TourNotFoundException;
import at.technikum.backend.repository.TourRepository;
import jakarta.persistence.EntityNotFoundException;
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

    @InjectMocks
    private TourService tourService;

    private Tour sampleTour;
    private UUID tourId;

    @BeforeEach
    void setUp() {
        tourId = UUID.randomUUID();
        sampleTour = new Tour();
        sampleTour.setId(tourId);
        sampleTour.setName("Wienerwald Runde");
        sampleTour.setDescription("Schöne Runde durch den Wienerwald");
        sampleTour.setDistance(12.5);
    }

    @Test
    @DisplayName("addTour speichert die Tour über das Repository und gibt sie zurück")
    void addTour_savesAndReturnsTour() {
        when(tourRepository.save(sampleTour)).thenReturn(sampleTour);

        Tour result = tourService.addTour(sampleTour);

        assertThat(result).isEqualTo(sampleTour);
        verify(tourRepository, times(1)).save(sampleTour);
    }

    @Test
    @DisplayName("getAllTours gibt alle Touren aus dem Repository zurück")
    void getAllTours_returnsAllTours() {
        when(tourRepository.findAll()).thenReturn(List.of(sampleTour));

        List<Tour> result = tourService.getAllTours();

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
        tourService.deleteTourById(tourId);

        verify(tourRepository, times(1)).deleteById(tourId);
    }
}