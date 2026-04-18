package com.backend.infrastructure.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.domain.model.ApplicationStatus;
import com.backend.domain.model.VendorApplication;
import java.util.List;
import java.util.Optional;

public interface JpaVendorApplicationRepository extends JpaRepository<VendorApplication, Long> {

    VendorApplication save(VendorApplication application);

    Optional<VendorApplication> findById(Long id);

    List<VendorApplication> findAll();

    boolean existsByEmail(String email);

    List<VendorApplication> findByStatus(ApplicationStatus status);

    Optional<VendorApplication> findByEmail(String email);
}
