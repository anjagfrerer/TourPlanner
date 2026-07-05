package at.technikum.backend.exceptions;

import java.util.UUID;

public class LogTourMismatchException extends RuntimeException {
    public LogTourMismatchException(UUID tourId, UUID logId) {
        super("TourLog with the id " + logId + " does not belong to the Tour with the id " + tourId + ".");
    }
}
