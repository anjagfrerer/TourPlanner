package at.technikum.backend.exceptions;

import java.util.UUID;

public class LogNotFoundException extends RuntimeException {

    public LogNotFoundException(UUID id) {
        super("TourLog with ID " + id + " was not found in the system.");
    }
}