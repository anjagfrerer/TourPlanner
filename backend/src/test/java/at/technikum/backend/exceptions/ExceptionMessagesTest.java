package at.technikum.backend.exceptions;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Stellt sicher, dass die Domain-Exceptions die richtigen Details
 * (z.B. ID oder Username) in der Fehlermeldung enthalten.
 * Diese Messages werden 1:1 im ErrorResponse ans Frontend weitergegeben
 * (siehe GlobalExceptionHandler) und sind daher wichtig fürs Debugging.
 */
class ExceptionMessagesTest {

    @Test
    @DisplayName("TourNotFoundException enthält die gesuchte ID in der Nachricht")
    void tourNotFoundException_containsId() {
        UUID id = UUID.randomUUID();
        TourNotFoundException ex = new TourNotFoundException(id);
        assertThat(ex.getMessage()).contains(id.toString());
    }

    @Test
    @DisplayName("UserNotFoundException enthält den gesuchten Usernamen in der Nachricht")
    void userNotFoundException_containsUsername() {
        UserNotFoundException ex = new UserNotFoundException("user123");
        assertThat(ex.getMessage()).contains("user123");
    }

    @Test
    @DisplayName("LogTourMismatchException enthält sowohl Tour- als auch Log-ID")
    void logTourMismatchException_containsBothIds() {
        UUID tourId = UUID.randomUUID();
        UUID logId = UUID.randomUUID();
        LogTourMismatchException ex = new LogTourMismatchException(tourId, logId);
        assertThat(ex.getMessage()).contains(tourId.toString()).contains(logId.toString());
    }
}