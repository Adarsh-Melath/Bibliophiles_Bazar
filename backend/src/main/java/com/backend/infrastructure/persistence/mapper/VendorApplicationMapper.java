package com.backend.infrastructure.persistence.mapper;

import com.backend.infrastructure.persistence.entity.VendorApplicationEntity;
import com.backend.domain.model.VendorApplication;

public class VendorApplicationMapper {
    private VendorApplicationMapper() {
    }

    public static VendorApplication toDomain(VendorApplicationEntity e) {
        return new VendorApplication(
                e.getId(),
                e.getName(),
                e.getEmail(),
                e.getPhone(),
                e.getBusinessRegistrationNumber(),
                e.getWebsite(),
                e.getPublishingSince(),
                e.getBusinessName(),
                e.getBusinessDescription(),
                e.getCategory(),
                e.getStatus(),
                e.getRejectionReason(),
                e.getAppliedAt(),
                e.getReviewedAt());
    }

    public static VendorApplicationEntity toEntity(VendorApplication t) {
        VendorApplicationEntity e = new VendorApplicationEntity();
        e.setId(t.getId());
        e.setName(t.getName());
        e.setEmail(t.getEmail());
        e.setPhone(t.getPhone());
        e.setBusinessRegistrationNumber(t.getBusinessRegistrationNumber());
        e.setWebsite(t.getWebsite());
        e.setPublishingSince(t.getPublishingSince());
        e.setBusinessName(t.getBusinessName());
        e.setBusinessDescription(t.getBusinessDescription());
        e.setCategory(t.getCategory());
        e.setStatus(t.getStatus());
        e.setRejectionReason(t.getRejectionReason());
        return e;
    }
}
