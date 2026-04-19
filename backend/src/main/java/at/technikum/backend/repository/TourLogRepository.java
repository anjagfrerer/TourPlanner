package at.technikum.backend.repository;

import at.technikum.backend.dto.TourLogDto;
import at.technikum.backend.model.TourLog;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class TourLogRepository {
    private static final List<TourLog> tourLogs = new ArrayList<>();
    private static final AtomicLong idGenerator = new AtomicLong(1);

    public TourLog save(TourLog tourLog) {
        // Add
        if (tourLog.getTourLogId() == null) {
            tourLog.setTourLogId(idGenerator.getAndIncrement());
            tourLogs.add(tourLog);
        } else {
            // Update
            tourLogs.removeIf(log -> log.getTourLogId().equals(tourLog.getTourLogId()));
            tourLogs.add(tourLog);
        }
        return tourLog;
    }

    public List<TourLog> findAll() {
        return new ArrayList<>(tourLogs);
    }

    public TourLog getById(Long id) {
        return tourLogs.stream()
                .filter(log -> log.getTourLogId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public void deleteById(Long id) {
        tourLogs.removeIf(log -> log.getTourLogId().equals(id));
    }
}