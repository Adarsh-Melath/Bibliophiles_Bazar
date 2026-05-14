package com.backend.domain.model;

import java.time.LocalDateTime;

public final class OTPToken {

    private Long id;

    private String email;

    private String code;

    private LocalDateTime expiresAt;

    private String resetToken;

    // All-args constructor
    public OTPToken(
            Long id,
            String email,
            String code,
            LocalDateTime expiresAt,
            String resetToken) {
        this.id = id;
        this.email = email;
        this.code = code;
        this.expiresAt = expiresAt;
        this.resetToken = resetToken;
    }

    public void  generateResetToken(String resetToken){
        this.resetToken=resetToken;
    }

    // Getters

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getCode() {
        return code;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public String getResetToken() {
        return resetToken;
    }

    // Business method

    public boolean isExpired() {
        return LocalDateTime.now().isAfter(expiresAt);
    }
}