package at.technikum.backend.service;

import at.technikum.backend.entity.User;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Unit-Tests für JwtService: Token-Erzeugung und -Validierung sind die
 * Grundlage der gesamten Authentifizierung. Ein Fehler hier würde
 * entweder alle User aussperren oder schlimmer die Security komplett
 * durcheinanderbringen (z.B. wenn ein manipuliertes Token als gültig durchgeht).
 */
class JwtServiceTest {

    private final JwtService jwtService = new JwtService();

    @Test
    @DisplayName("generateToken erzeugt ein nicht-leeres Token")
    void generateToken_createsNonEmptyToken() {
        String token = jwtService.generateToken("testuser");

        assertThat(token).isNotBlank();
    }

    @Test
    @DisplayName("extractUsername liefert den ursprünglich verwendeten Usernamen zurück")
    void extractUsername_returnsOriginalUsername() {
        String token = jwtService.generateToken("testuser");

        String username = jwtService.extractUsername(token);

        assertThat(username).isEqualTo("testuser");
    }

    @Test
    @DisplayName("validateToken gibt true zurück für ein gültiges, unverändertes Token")
    void validateToken_validToken_returnsTrue() {
        User user = User.builder().id(UUID.randomUUID()).username("testuser").password("pw").build();
        String token = jwtService.generateToken("testuser");

        boolean valid = jwtService.validateToken(token, user);

        assertThat(valid).isTrue();
    }

    @Test
    @DisplayName("validateToken gibt false zurück, wenn der Username im Token nicht zum User passt")
    void validateToken_usernameMismatch_returnsFalse() {
        User otherUser = User.builder().id(UUID.randomUUID()).username("andererUser").password("pw").build();
        String token = jwtService.generateToken("testuser");

        boolean valid = jwtService.validateToken(token, otherUser);

        assertThat(valid).isFalse();
    }

    @Test
    @DisplayName("validateToken gibt false zurück bei einem manipulierten/ungültigen Token")
    void validateToken_corruptedToken_returnsFalse() {
        User user = User.builder().id(UUID.randomUUID()).username("testuser").password("pw").build();

        boolean valid = jwtService.validateToken("ungültiger_token", user);

        assertThat(valid).isFalse();
    }
}