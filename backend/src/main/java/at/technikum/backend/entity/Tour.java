package at.technikum.backend.entity;

import at.technikum.backend.constants.TransportType;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tour {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;
    String name;
    String description;
    String startLocation;
    String destinationLocation;
    TransportType transportType;
    Double distance;
    String estimatedTime;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "tour_route_information")
    Route routeInformation;
    Integer rating;
    Boolean childFriendly;
    Boolean popular;
    Boolean publicTour = true;

    @ManyToOne
    @JoinColumn(name = "created_by_id")
    User createdBy;
}
