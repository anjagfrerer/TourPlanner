package at.technikum.backend.entity;

import jakarta.persistence.*;
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
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.UUID)
    private UUID tourLogId;
    @ManyToOne
    @JoinColumn(name = "tour_id")
    private Tour tour;
    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;
    private LocalDate date;
    private LocalTime time;
    private Integer rating;
    private Integer difficulty;
    private Double totalDistanceKm;
    private Integer totalTimeMin;
    private String comment;

}
