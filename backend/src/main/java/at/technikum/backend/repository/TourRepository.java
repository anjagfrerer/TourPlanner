package at.technikum.backend.repository;
import at.technikum.backend.entity.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface TourRepository extends JpaRepository<Tour,UUID> {
    List<Tour> findByCreatedBy_Username(String username);
    List<Tour> findByPublicTourTrueOrPublicTourIsNull();

    @Query("SELECT DISTINCT t FROM Tour t " +
            "LEFT JOIN TourLog l ON l.tour = t " +
            "WHERE (t.publicTour = true OR t.publicTour IS NULL) AND (" +
            "LOWER(t.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(t.description) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(t.startLocation) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(t.destinationLocation) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(CAST(t.transportType AS string)) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(l.comment) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(CAST(t.distance AS string)) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(CAST(t.rating AS string)) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(CAST(t.estimatedTime AS string)) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "(t.popular = true AND LOWER('popular') LIKE LOWER(CONCAT('%', :search, '%'))) OR " +
            "(t.childFriendly = true AND (" +
            "LOWER('child friendly') LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER('child-friendly') LIKE LOWER(CONCAT('%', :search, '%')))))")
    List<Tour> searchTours(@Param("search") String search);

    @Query("SELECT DISTINCT t FROM Tour t " +
            "LEFT JOIN TourLog l ON l.tour = t " +
            "WHERE t.createdBy.username = :username AND (" +
            "LOWER(t.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(t.description) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(t.startLocation) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(t.destinationLocation) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(CAST(t.transportType AS string)) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(l.comment) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(CAST(t.distance AS string)) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(CAST(t.rating AS string)) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(CAST(t.estimatedTime AS string)) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "(t.popular = true AND LOWER('popular') LIKE LOWER(CONCAT('%', :search, '%'))) OR " +
            "(t.childFriendly = true AND (" +
            "LOWER('child friendly') LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER('child-friendly') LIKE LOWER(CONCAT('%', :search, '%')))))")
    List<Tour> searchToursByCreatedByUsername(@Param("username") String username, @Param("search") String search);
}
