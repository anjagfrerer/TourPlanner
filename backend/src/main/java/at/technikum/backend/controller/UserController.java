package at.technikum.backend.controller;

import at.technikum.backend.dto.AuthDto;
import at.technikum.backend.entity.User;
import at.technikum.backend.service.JwtService;
import at.technikum.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody AuthDto dto) {
        logger.info("Registration attempt for username: '{}'", dto.getUsername());
        User newUser = User.builder()
                .username(dto.getUsername())
                .password(dto.getPassword())
                .build();
        userService.register(newUser);
        logger.info("User '{}' successfully registered.", dto.getUsername());
        return new ResponseEntity<>("User successfully registered!", HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthDto dto) {
        logger.info("Login attempt for username: '{}'", dto.getUsername());
        User user = (User) userService.loadUserByUsername(dto.getUsername());

        if (passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            String token = jwtService.generateToken(user.getUsername());
            // Gibt das Token als JSON-Objekt zurück, damit Angular es leicht parsen kann: {"token": "..."}
            logger.info("User '{}' logged in successfully. JWT Token generated.", dto.getUsername());
            return ResponseEntity.ok(Map.of("token", token));
        }

        logger.warn("Failed login attempt for username: '{}' - Invalid password or username", dto.getUsername());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password!");
    }
}