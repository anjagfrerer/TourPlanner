package at.technikum.backend.exceptions;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

/**
 * Unit-Tests für den globalen Exception-Handler.
 * Hier wird geprüft, dass Fehler nicht als Stacktrace oder rohe 500-Fehler
 * beim Client ankommen, sondern als saubere JSON-Antwort mit passendem
 * HTTP-Status.
 * Außerdem wird sichergestellt, dass bei unerwarteten Fehlern keine
 * internen Details nach außen gelangen.
 */
class GlobalExceptionHandlerTest {

    private final GlobalExceptionHandler handler = new GlobalExceptionHandler();

    @Test
    @DisplayName("TourNotFoundException wird zu 404 mit passender Nachricht gemappt")
    void handlesTourNotFoundException() {
        UUID id = UUID.randomUUID();

        ResponseEntity<?> response = handler.handleTourNotFoundException(new TourNotFoundException(id));

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        ErrorResponse body = (ErrorResponse) response.getBody();
        assertThat(body.getMessage()).contains(id.toString());
    }

    @Test
    @DisplayName("UnauthorizedAccessException wird zu 401 gemappt")
    void handlesUnauthorizedAccessException() {
        ResponseEntity<?> response = handler.handleUnauthorizedAccessException(new UnauthorizedAccessException());

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    @Test
    @DisplayName("LogTourMismatchException wird zu 400 gemappt")
    void handlesLogTourMismatchException() {
        UUID tourId = UUID.randomUUID();
        UUID logId = UUID.randomUUID();

        ResponseEntity<?> response = handler.handleLogTourMismatchException(
                new LogTourMismatchException(tourId, logId));

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    @DisplayName("Validierungsfehler (MethodArgumentNotValidException) werden als Field->Nachricht-Map zurückgegeben")
    void handlesValidationExceptions() {
        MethodArgumentNotValidException ex = mock(MethodArgumentNotValidException.class); // leere Fake-Exception
        BindingResult bindingResult = mock(BindingResult.class); // um Validierungsfehler zu speichern
        FieldError fieldError = new FieldError("requestTourLogDto", "rating", "Rating must be at least 0");

        when(ex.getBindingResult()).thenReturn(bindingResult);
        when(bindingResult.getFieldErrors()).thenReturn(List.of(fieldError));

        ResponseEntity<Map<String, String>> response = handler.handleValidationExceptions(ex);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST); // Validierungsfehler = 400 Bad Request
        assertThat(response.getBody()).containsEntry("rating", "Rating must be at least 0"); // Key = Feldname (rating); Value = Fehlermeldung
    }

    @Test
    @DisplayName("Unerwartete Exceptions werden als generischer 500-Fehler ohne Detail-Leak zurückgegeben")
    void handlesUnexpectedExceptions() {
        ResponseEntity<?> response = handler.handleAllRemainingExceptions(new RuntimeException("geheim"));

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
        ErrorResponse body = (ErrorResponse) response.getBody();
        assertThat(body.getMessage()).doesNotContain("geheim");
    }
}