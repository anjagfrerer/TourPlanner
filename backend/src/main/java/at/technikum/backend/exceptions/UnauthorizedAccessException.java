package at.technikum.backend.exceptions;

public class UnauthorizedAccessException extends RuntimeException {

    public UnauthorizedAccessException() {
        super("You are not authorized to perform this action.");
    }
}