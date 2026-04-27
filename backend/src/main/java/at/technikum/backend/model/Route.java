package at.technikum.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.util.UUID;

/**
 * distance and time will be retrieved
 * by a REST request using the OpenRouteservice.org
 * */
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private Double startLat, startLong;
    private Double endLat, endLong;
}
