package at.technikum.backend.exceptions;

import java.util.UUID;

public class TourNotFoundException extends RuntimeException {

    public TourNotFoundException(UUID id) {
        super("Tour with ID " + id + " was not found in the system.");
    }
}