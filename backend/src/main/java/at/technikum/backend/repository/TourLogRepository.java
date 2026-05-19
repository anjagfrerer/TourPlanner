package at.technikum.backend.repository;

import at.technikum.backend.entity.TourLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TourLogRepository extends JpaRepository<TourLog, UUID> {
    List<TourLog> findByTour_Id(UUID tourId);
    TourLog findByTourLogId(UUID tourLogId);
}