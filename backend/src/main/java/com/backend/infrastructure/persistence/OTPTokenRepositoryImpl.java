
package com.backend.infrastructure.persistence;

import org.springframework.stereotype.Repository;

import com.backend.domain.model.OTPToken;
import com.backend.domain.repository.OTPTokenRepository;

import lombok.RequiredArgsConstructor;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class OTPTokenRepositoryImpl implements OTPTokenRepository {

    private final JpaOTPTokenRepository jpaOTPTokenRepository;

    @Override
    public OTPToken save(OTPToken otpToken) {
        return jpaOTPTokenRepository.save(otpToken);
    }

    @Override
    public Optional<OTPToken> findLatestByEmail(String email) {
        return jpaOTPTokenRepository.findLatestByEmail(email);
    }

    @Override
    public void deleteByEmail(String email) {
        jpaOTPTokenRepository.deleteByEmail(email);
    }
}