package com.backend.infrastructure.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.backend.domain.model.ApplicationStatus;
import com.backend.domain.model.VendorApplication;
import com.backend.domain.repository.VendorApplicationRepository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class VendoRepositoryImpl implements VendorApplicationRepository {

    private final JpaVendorApplicationRepository jpa;

    public VendorApplication save(VendorApplication application) {
        return jpa.save(application);
    }

    public Optional<VendorApplication> findById(Long id) {
        return jpa.findById(id);
    }

    public List<VendorApplication> findAll() {
        return jpa.findAll();
    }

    public boolean existsByEmail(String email) {
        return jpa.existsByEmail(email);
    }

    public List<VendorApplication> findByStatus(ApplicationStatus status) {
        return jpa.findByStatus(status);
    }

    public Optional<VendorApplication> findByEmail(String email) {
        return jpa.findByEmail(email);
    }
}
