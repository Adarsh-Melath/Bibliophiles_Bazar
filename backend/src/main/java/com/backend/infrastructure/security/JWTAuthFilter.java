package com.backend.infrastructure.security;

import java.io.IOException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.backend.domain.repository.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JWTAuthFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JWTAuthFilter.class);

    private final JWTUtil jwtUtil;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        String requestURI = request.getRequestURI();
        String method = request.getMethod();

        logger.debug("Request - Method: {}, URI: {}, Auth Header: {}", method, requestURI, authHeader != null ? "present" : "missing");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            logger.debug("No Authorization header or not Bearer token for request: {}", requestURI);
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);

        if (!jwtUtil.isTokenValid(token)) {
            logger.warn("Invalid JWT token for request: {}", requestURI);
            filterChain.doFilter(request, response);
            return;
        }

        String email = jwtUtil.extractClaims(token).getSubject();
        String role = jwtUtil.extractClaims(token).get("role", String.class);

        logger.debug("Token valid for email: {}, role: {}", email, role);

        userRepository.findByEmail(email)
                .ifPresentOrElse(user -> {
                    if (user.isEnabled() && !user.isBlocked()) {
                        logger.debug("User {} authenticated successfully for request: {} {}", email, method, requestURI);
                        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                                email, null, List.of(new SimpleGrantedAuthority("ROLE_" + role)));
                        SecurityContextHolder.getContext().setAuthentication(auth);
                    } else {
                        logger.warn("User {} is not enabled or is blocked. Enabled: {}, Blocked: {} for request: {}", email, user.isEnabled(), user.isBlocked(), requestURI);
                    }
                }, () -> logger.warn("User with email {} not found in database for request: {}", email, requestURI));

        filterChain.doFilter(request, response);
    }
}
