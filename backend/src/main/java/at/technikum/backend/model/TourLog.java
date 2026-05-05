package at.technikum.backend.model;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data // Getter & Setter
@NoArgsConstructor
@AllArgsConstructor
public class TourLog {

    private Long tourLogId;
    private Long tourId;
    private String author;
    private LocalDate date;
    private LocalTime time;
    private Integer rating;
    private Integer difficulty;
    private Double totalDistanceKm;
    private Integer totalTimeMin;
    private String comment;
}
