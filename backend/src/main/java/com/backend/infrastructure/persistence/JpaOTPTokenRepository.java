package com.backend.infrastructure.persistence;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.domain.model.OTPToken;

import jakarta.transaction.Transactional;

public interface JpaOTPTokenRepository extends JpaRepository<OTPToken, Long> {

    Optional<OTPToken> findLatestByEmail(String email);

    @Transactional
    void deleteByEmail(String email);
}
