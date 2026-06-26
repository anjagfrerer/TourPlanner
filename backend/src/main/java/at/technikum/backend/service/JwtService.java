package at.technikum.backend.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
@Slf4j   // automatisch Variable logger
public class JwtService {

    public static final String SECRET = "5367566859703373367639792F423F452848284D6251655468576D5A71347437";

    public String generateToken(String email) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, email);
    }

    private String createToken(Map<String, Object> claims, String email) {
        log.info("BL: Generating new JWT token for user '{}'", email);
        String token = Jwts.builder()
                .claims(claims)
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 30))
                .signWith(getSignKey())
                .compact();
        log.info("BL: JWT token successfully generated for '{}'", email);
        return token;
    }

    private SecretKey getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSignKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        log.info("BL: Validating JWT token for user '{}'", userDetails.getUsername());

        try {
            final String username = extractUsername(token);
            boolean isExpired = isTokenExpired(token);
            boolean usernameMatches = username.equals(userDetails.getUsername());

            if (isExpired) {
                log.warn("BL: Token validation failed. The token for user '{}' has expired", userDetails.getUsername());
                return false;
            }

            if (!usernameMatches) {
                // bei z.B. token wechsel im browser (mehrere tabs) oder "hacker" angemeldet und versucht mit anderem token daten zu stehlen
                log.warn("BL: Token validation failed. Token username '{}' does not match authenticated user '{}'",
                        username, userDetails.getUsername());
                return false;
            }

            log.info("BL: JWT token is valid for user '{}'", userDetails.getUsername());
            return true;

        } catch (Exception e) {
            // bei z.B. SignatureException, wenn was verändert wurde oder auch wenn z.B. Zeichen abhandengekommen sind
            log.warn("BL: Token validation crashed. Invalid or corrupted JWT token provided. Reason: {}", e.getMessage());
            return false;
        }
    }
}