package at.technikum.backend.mapper;

import at.technikum.backend.dto.request.RequestTourLogDto;
import at.technikum.backend.dto.response.ResponseTourLogDto;
import at.technikum.backend.entity.Tour;
import at.technikum.backend.entity.TourLog;
import at.technikum.backend.entity.User;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Unit-Tests für den MapStruct-Mapper.
 * Hier wird geprüft, ob verschachtelte Objekte (z.B. Tour, User)
 * korrekt in flache DTOs umgewandelt werden.
 * Fehler hier würden dazu führen, dass falsche oder leere Daten
 * ans Frontend gehen, ohne dass eine Exception passiert.
 */
class TourLogMapperTest {

    private final TourLogMapper mapper = new TourLogMapperImpl();

    @Test
    @DisplayName("toEntity ignoriert tourLogId, tour und author (werden erst im Service gesetzt)")
    void toEntity_ignoresManagedFields() {
        RequestTourLogDto dto = new RequestTourLogDto(
                UUID.randomUUID(), LocalDate.of(2026, 5, 1), LocalTime.of(9, 30),
                4, 2, 8.5, 60, "Schöner Weg"
        );

        TourLog entity = mapper.toEntity(dto);

        assertThat(entity.getTourLogId()).isNull();
        assertThat(entity.getTour()).isNull();
        assertThat(entity.getAuthor()).isNull();
        assertThat(entity.getComment()).isEqualTo("Schöner Weg");
        assertThat(entity.getDifficulty()).isEqualTo(2);
    }

    @Test
    @DisplayName("toResponseDto mapped tour.id auf tourId und author.username auf author")
    void toResponseDto_flattensNestedFields() {
        UUID tourId = UUID.randomUUID();
        Tour tour = new Tour();
        tour.setId(tourId);

        User author = User.builder().id(UUID.randomUUID()).username("erika").password("pw").build();

        TourLog entity = new TourLog();
        entity.setTourLogId(UUID.randomUUID());
        entity.setTour(tour);
        entity.setAuthor(author);
        entity.setComment("Top!");
        entity.setRating(5);

        ResponseTourLogDto dto = mapper.toResponseDto(entity);

        assertThat(dto.getTourId()).isEqualTo(tourId);
        assertThat(dto.getAuthor()).isEqualTo("erika");
        assertThat(dto.getComment()).isEqualTo("Top!");
        assertThat(dto.getRating()).isEqualTo(5);
    }
}