package at.technikum.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Data // Getter & Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class TourLog {

    @Id
    private UUID tourLogId;
    @ManyToOne
    @JoinColumn(name = "tour_id")
    private Tour tour;
    private String author;
    private LocalDate date;
    private LocalTime time;
    private Integer rating;
    private Integer difficulty;
    private Double totalDistanceKm;
    private Integer totalTimeMin;
    private String comment;

}
