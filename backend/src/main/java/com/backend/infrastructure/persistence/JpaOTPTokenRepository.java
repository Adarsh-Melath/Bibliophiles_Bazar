package com.backend.infrastructure.persistence;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.domain.model.OTPToken;

import jakarta.transaction.Transactional;
import java.util.List;

public interface JpaOTPTokenRepository extends JpaRepository<OTPToken, Long> {

    Optional<OTPToken> findLatestByEmail(String email);

    Optional<OTPToken> findByResetToken(String resetToken);

    @Transactional
    void deleteByEmail(String email);
}
