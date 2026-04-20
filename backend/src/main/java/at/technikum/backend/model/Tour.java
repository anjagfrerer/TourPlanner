package at.technikum.backend.model;

import at.technikum.backend.constants.TransportType;
import lombok.*;

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
