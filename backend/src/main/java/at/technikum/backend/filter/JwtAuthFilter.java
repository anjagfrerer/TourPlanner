package at.technikum.backend.filter;

import at.technikum.backend.service.JwtService;
import at.technikum.backend.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
@Slf4j
public class JwtAuthFilter extends OncePerRequestFilter {

    private final UserService userService;
    private final JwtService jwtService;

    public JwtAuthFilter(@Lazy UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // HTTP-Pfad, der aufgerufen werden möchte
        log.debug("PL: Filtering request for URI: {}", request.getRequestURI());

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            try {
                String username = jwtService.extractUsername(token);

                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    log.info("PL: JWT found in header. Loading user authorities for '{}'", username);
                    UserDetails userDetails = userService.loadUserByUsername(username);

                    if (jwtService.validateToken(token, userDetails)) {
                        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities()
                        );
                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                        log.info("PL: SecurityContext successfully set for user '{}'", username);
                    } else {
                        log.warn("PL: Token validation failed in filter for user '{}'", username);
                    }
                }
            } catch (Exception e) {
                log.warn("PL: Error parsing JWT token in Filter: {}", e.getMessage());
            }
        } else {
            log.debug("PL: No Bearer token found in Authorization header for URI: {}", request.getRequestURI());
        }
        filterChain.doFilter(request, response);
    }
}