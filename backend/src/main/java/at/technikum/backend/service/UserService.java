package at.technikum.backend.service;

import at.technikum.backend.controller.GlobalTourLogController;
import at.technikum.backend.entity.User;
import at.technikum.backend.exceptions.UserNotFoundException;
import at.technikum.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private static final Logger logger = LoggerFactory.getLogger(GlobalTourLogController.class);

    @Override
    public UserDetails loadUserByUsername(String username) throws UserNotFoundException {
        logger.info("BL: Loading user details for username '{}'", username);
        return userRepository.findByUsername(username).orElseThrow(() -> {
            logger.warn("BL: User lookup failed. Username '{}' not found in database", username);
            return new UserNotFoundException(username);
        });
    }

    public User register(User user) {
        logger.info("BL: Registering new user with username '{}'", user.getUsername());
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(user);
        logger.info("BL: Successfully saved new user '{}' to database", savedUser.getUsername());
        return savedUser;
    }
}