package com.backend.domain.repository;

import java.util.Optional;

import com.backend.domain.model.OTPToken;

public interface OTPTokenRepository {
    OTPToken save(OTPToken otpToken);

    Optional<OTPToken> findLatestByEmail(String email);

    
    void deleteByEmail(String email);
}
