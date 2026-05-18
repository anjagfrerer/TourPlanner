package at.technikum.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseTourLogDto {

    private UUID tourLogId;
    private UUID tourId;
    private String author;
    private LocalDate date;
    private LocalTime time;
    private Integer rating;
    private Integer difficulty;
    private Double totalDistanceKm;
    private Integer totalTimeMin;
    private String comment;
}
