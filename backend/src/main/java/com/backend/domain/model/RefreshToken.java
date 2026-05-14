package com.backend.domain.model;

import java.time.LocalDateTime;
import java.time.Clock;

public final class RefreshToken {
    private final Long id;
    private final String token;
    private final String email;
    private final LocalDateTime expiresAt;

    public RefreshToken(Long id, String token, String email, LocalDateTime expiresAt) {
        this.id = id;
        this.token = token;
        this.email = email;
        this.expiresAt = expiresAt;
    }

    public Long getId() {
        return id;
    }

    public String getToken() {
        return token;
    }

    public String getEmail() {
        return email;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public boolean isExpired(Clock clock) {
        return LocalDateTime.now(clock).isAfter(expiresAt);
    }
}