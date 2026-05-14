package com.backend.application.ports;

import io.jsonwebtoken.Claims;

public interface JWTUtil {
    public String generateAccessToken(String email, String role);

    public Claims extractClaims(String token);

    public boolean isTokenValid(String token);
}
