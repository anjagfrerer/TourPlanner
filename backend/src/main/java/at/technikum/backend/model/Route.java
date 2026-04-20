package at.technikum.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

/**
 * distance and time will be retrieved
 * by a REST request using the OpenRouteservice.org
 * */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Route {
    private Long id;
    private Double startLat, startLong;
    private Double endLat, endLong;
}
