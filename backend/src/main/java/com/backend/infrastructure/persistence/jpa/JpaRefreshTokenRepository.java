package com.backend.infrastructure.persistence.jpa;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.infrastructure.persistence.entity.RefreshTokenEntity;

import jakarta.transaction.Transactional;

public interface JpaRefreshTokenRepository extends JpaRepository<RefreshTokenEntity, Long> {
    Optional<RefreshTokenEntity> findByToken(String token);

    @Transactional
    void deleteByEmail(String email);
}
