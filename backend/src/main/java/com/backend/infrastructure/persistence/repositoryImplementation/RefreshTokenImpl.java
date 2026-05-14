package com.backend.infrastructure.persistence.repositoryImplementation;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.backend.domain.model.RefreshToken;
import com.backend.domain.repository.RefreshTokenRepository;
import com.backend.infrastructure.persistence.jpa.JpaRefreshTokenRepository;
import com.backend.infrastructure.persistence.mapper.RefreshTokenMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class RefreshTokenImpl implements RefreshTokenRepository {
    private final JpaRefreshTokenRepository jpa;

    @Override
    public RefreshToken save(RefreshToken token) {
        return RefreshTokenMapper.toDomain(jpa.save(RefreshTokenMapper.toEntity(token)));
    }

    @Override
    public Optional<RefreshToken> findByToken(String token) {
        return jpa.findByToken(token).map(RefreshTokenMapper::toDomain);
    }

    @Override
    public void deleteByEmail(String email) {
        jpa.deleteByEmail(email);
    }

    @Override
    public void delete(RefreshToken token) {
        jpa.findByToken(token.getToken()).ifPresent(jpa::delete);
    }
}
