package com.backend.infrastructure.persistence;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.backend.domain.model.RefreshToken;
import com.backend.domain.repository.RefreshTokenRepository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class RefreshTokenImpl implements RefreshTokenRepository {
    private final JpaRefreshTokenRepository jpa;

    @Override
    public RefreshToken save(RefreshToken token) {
        return jpa.save(token);
    }

    @Override
    public Optional<RefreshToken> findByToken(String token) {
        return jpa.findByToken(token);
    }

    @Override
    public void deleteByEmail(String email) {
        jpa.deleteByEmail(email);
    }
}
