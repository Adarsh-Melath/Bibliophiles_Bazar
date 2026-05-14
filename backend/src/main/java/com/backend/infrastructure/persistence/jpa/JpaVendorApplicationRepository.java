package com.backend.infrastructure.persistence.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.domain.model.ApplicationStatus;
import com.backend.infrastructure.persistence.entity.VendorApplicationEntity;

import java.util.List;
import java.util.Optional;

public interface JpaVendorApplicationRepository extends JpaRepository<VendorApplicationEntity, Long> {

    VendorApplicationEntity save(VendorApplicationEntity application);

    Optional<VendorApplicationEntity> findById(Long id);

    List<VendorApplicationEntity> findAll();

    boolean existsByEmail(String email);

    List<VendorApplicationEntity> findByStatus(ApplicationStatus status);

    Optional<VendorApplicationEntity> findByEmail(String email);
}
