package at.technikum.backend.repository;
import at.technikum.backend.constants.TransportType;
import at.technikum.backend.model.Tour;
import at.technikum.backend.model.TourLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface TourRepository extends JpaRepository<Tour,UUID> {
}

