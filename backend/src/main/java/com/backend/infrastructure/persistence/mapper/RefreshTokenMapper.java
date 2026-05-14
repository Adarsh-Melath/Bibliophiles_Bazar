package com.backend.infrastructure.persistence.mapper;

import com.backend.domain.model.RefreshToken;
import com.backend.infrastructure.persistence.entity.RefreshTokenEntity;

public final class RefreshTokenMapper {
    private RefreshTokenMapper() {
    }

    public static RefreshToken toDomain(RefreshTokenEntity e) {
        return new RefreshToken(e.getId(), e.getToken(), e.getEmail(), e.getExpiresAt());
    }

    public static RefreshTokenEntity toEntity(RefreshToken t) {
        RefreshTokenEntity e = new RefreshTokenEntity();
        e.setId(t.getId());
        e.setToken(t.getToken());
        e.setEmail(t.getEmail());
        e.setExpiresAt(t.getExpiresAt());
        return e;
    }
}
