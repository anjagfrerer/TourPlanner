package at.technikum.backend.model;

import at.technikum.backend.constants.TransportType;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
public class Tour {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;
    String name;
    String description;
    String from;
    String to;
    TransportType transportType;
    Double distance;
    String estimatedTime;
    @OneToOne
    @JoinColumn(name = "tour_route_information")
    Route routeInformation;
    Integer rating;
    String createdBy;
}
