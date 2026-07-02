package at.technikum.backend.exceptions;

import java.util.UUID;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String username) {
        super("User with the username " + username + " was not found in the system.");
    }
}