
package com.backend.infrastructure.persistence.repositoryImplementation;

import org.springframework.stereotype.Repository;

import com.backend.domain.model.OTPToken;
import com.backend.domain.repository.OTPTokenRepository;
import com.backend.infrastructure.persistence.jpa.JpaOTPTokenRepository;

import lombok.RequiredArgsConstructor;

import java.util.Optional;

import com.backend.infrastructure.persistence.mapper.OTPTokenMapper;

@Repository
@RequiredArgsConstructor
public class OTPTokenRepositoryImpl implements OTPTokenRepository {

    private final JpaOTPTokenRepository jpaOTPTokenRepository;

    @Override
    public OTPToken save(OTPToken otpToken) {
        return OTPTokenMapper.toDomain(jpaOTPTokenRepository.save(OTPTokenMapper.toEntity(otpToken)));
    }

    @Override
    public Optional<OTPToken> findLatestByEmail(String email) {
        return jpaOTPTokenRepository.findLatestByEmail(email);
    }

    @Override
    public Optional<OTPToken> findByResetToken(String email) {
        return jpaOTPTokenRepository.findByResetToken(email);
    }

    @Override
    public void deleteByEmail(String email) {
        jpaOTPTokenRepository.deleteByEmail(email);
    }
}