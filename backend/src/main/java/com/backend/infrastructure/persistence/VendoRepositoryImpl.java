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

    @Override
    public VendorApplication save(VendorApplication application) {
        return jpa.save(application);
    }

    @Override
    public Optional<VendorApplication> findById(Long id) {
        return jpa.findById(id);
    }

    @Override
    public List<VendorApplication> findAll() {
        return jpa.findAll();
    }

    @Override
    public boolean existsByEmail(String email) {
        return jpa.existsByEmail(email);
    }

    @Override

    public List<VendorApplication> findByStatus(ApplicationStatus status) {
        return jpa.findByStatus(status);
    }

    @Override
    public Optional<VendorApplication> findByEmail(String email) {
        return jpa.findByEmail(email);
    }
}
