package at.technikum.backend.service;

import at.technikum.backend.entity.User;
import at.technikum.backend.exceptions.UserNotFoundException;
import at.technikum.backend.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Unit-Tests für die Business-Logik von TourService.
 * Diese Klasse ist wichtig, weil hier die zentrale CRUD-Logik für Touren liegt,
 * die direkt vom TourController verwendet wird.
 * Fehler hier (z.B. falsche Exceptions oder Probleme beim Speichern)
 * wirken sich direkt auf das Verwalten von Touren aus.
 */
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @Test
    @DisplayName("loadUserByUsername gibt den User zurück, wenn er existiert")
    void loadUserByUsername_existingUser_returnsUser() {
        User user = User.builder().id(UUID.randomUUID()).username("anna").password("hash").build();
        when(userRepository.findByUsername("anna")).thenReturn(Optional.of(user));

        UserDetails result = userService.loadUserByUsername("anna");

        assertThat(result.getUsername()).isEqualTo("anna");
    }

    @Test
    @DisplayName("loadUserByUsername wirft UserNotFoundException bei unbekanntem Usernamen")
    void loadUserByUsername_unknownUser_throwsException() {
        when(userRepository.findByUsername("unbekannt")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userService.loadUserByUsername("unbekannt"))
                .isInstanceOf(UserNotFoundException.class);
    }

    @Test
    @DisplayName("register verschlüsselt das Passwort, bevor es gespeichert wird")
    void register_encodesPasswordBeforeSaving() {
        User newUser = User.builder().username("bernd").password("klartext123").build();
        when(passwordEncoder.encode("klartext123")).thenReturn("$2a$hashed");
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0)); // then answer: dynamisch und gibt genau das objekt zurück, dass er erhalten hat

        User result = userService.register(newUser);

        assertThat(result.getPassword()).isEqualTo("$2a$hashed");
        verify(passwordEncoder, times(1)).encode("klartext123");
    }
}