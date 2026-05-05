package at.technikum.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TourLogDto {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long tourLogId;

    @NotNull(message = "Tour ID is mandatory")
    private Long tourId;

    @NotBlank(message = "Author cannot be empty")
    private String author;

    @NotNull(message = "Date is required")
    private LocalDate date;

    @NotNull(message = "Time is required")
    private LocalTime time;

    @Min(value = 0, message = "Rating must be at least 0")
    @Max(value = 5, message = "Rating cannot exceed 5")
    private Integer rating;

    @Min(value = 0, message = "Difficulty must be at least 0")
    @Max(value = 10, message = "Difficulty cannot exceed 10")
    private Integer difficulty;

    @PositiveOrZero(message = "Total distance must be a positive value")
    private Double totalDistanceKm;

    @PositiveOrZero(message = "Total time must be a positive value")
    private Integer totalTimeMin;

    private String comment;
}
