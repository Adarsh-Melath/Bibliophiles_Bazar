package com.backend.domain.repository;

import java.util.List;
import java.util.Optional;

import com.backend.domain.model.ApplicationStatus;
import com.backend.domain.model.VendorApplication;

public interface VendorApplicationRepository {

    VendorApplication save(VendorApplication application);

    Optional<VendorApplication> findById(Long id);

    List<VendorApplication> findAll();

    boolean existsByEmail(String email);

    List<VendorApplication> findByStatus(ApplicationStatus status);

    Optional<VendorApplication> findByEmail(String email);
}
