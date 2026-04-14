package com.backend.domain.repository;

import java.util.Optional;

import com.backend.domain.model.RefreshToken;

public interface RefreshTokenRepository {
    RefreshToken save(RefreshToken token);

    Optional<RefreshToken> findByToken(String token);

    void deleteByEmail(String email);
}
