package at.technikum.backend.model;

import at.technikum.backend.constants.TransportType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;
import java.time.Duration;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor //Might be necessary for Hibernate
public class Tour {
    int id;
    String name;
    String description;
    String from;
    String to;
    TransportType transportType;
    Double distance;
    String estimatedTime;
    Route routeInformation;
    Integer rating;
    String createdBy;
}
