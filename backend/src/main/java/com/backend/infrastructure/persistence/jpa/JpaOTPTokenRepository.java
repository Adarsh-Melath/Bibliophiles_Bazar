package com.backend.infrastructure.persistence.jpa;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.domain.model.OTPToken;
import com.backend.infrastructure.persistence.entity.OTPTokenEntity;

import jakarta.transaction.Transactional;

public interface JpaOTPTokenRepository extends JpaRepository<OTPTokenEntity, Long> {

    Optional<OTPToken> findLatestByEmail(String email);

    Optional<OTPToken> findByResetToken(String resetToken);

    @Transactional
    void deleteByEmail(String email);
}
