package com.backend.infrastructure.persistence.mapper;

import com.backend.domain.model.OTPToken;
import com.backend.infrastructure.persistence.entity.OTPTokenEntity;

public final class OTPTokenMapper {
    private OTPTokenMapper() {}

    public static OTPToken toDomain(OTPTokenEntity e) {
        return new OTPToken(e.getId(), e.getEmail(), e.getCode(), e.getExpiresAt(), e.getResetToken());
    }

    public static OTPTokenEntity toEntity(OTPToken t) {
        OTPTokenEntity e = new OTPTokenEntity();
        e.setId(t.getId());
        e.setEmail(t.getEmail());
        e.setCode(t.getCode());
        e.setExpiresAt(t.getExpiresAt());
        e.setResetToken(t.getResetToken());
        return e;
    }
}
