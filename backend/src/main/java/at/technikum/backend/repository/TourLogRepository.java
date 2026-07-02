package at.technikum.backend.repository;

import at.technikum.backend.entity.TourLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Repository
public interface TourLogRepository extends JpaRepository<TourLog, UUID> {
    List<TourLog> findByTour_Id(UUID tourId);
    TourLog findByTourLogId(UUID tourLogId);
    List<TourLog> findAllByAuthor_Username(String username);

    @Query("SELECT l FROM TourLog l WHERE l.author.username = :username AND " +
            "(LOWER(l.comment) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(l.tour.name) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<TourLog> searchByUsernameAndTerm(@Param("username") String username, @Param("search") String search);

    @Query("SELECT l FROM TourLog l WHERE l.tour.id = :tourId AND " +
            "LOWER(l.comment) LIKE LOWER(CONCAT('%', :search, '%'))")
    List<TourLog> searchByTourIdAndTerm(@Param("tourId") UUID tourId, @Param("search") String search);
}