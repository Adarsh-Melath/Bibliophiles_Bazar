package com.backend.infrastructure.persistence.repositoryImplementation;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.backend.domain.model.ApplicationStatus;
import com.backend.domain.model.VendorApplication;
import com.backend.domain.repository.VendorApplicationRepository;
import com.backend.infrastructure.persistence.jpa.JpaVendorApplicationRepository;
import com.backend.infrastructure.persistence.mapper.VendorApplicationMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class VendoRepositoryImpl implements VendorApplicationRepository {

    private final JpaVendorApplicationRepository jpa;

    @Override
    public VendorApplication save(VendorApplication application) {
        return VendorApplicationMapper.toDomain(jpa.save(VendorApplicationMapper.toEntity(application)));
    }

    @Override
    public Optional<VendorApplication> findById(Long id) {
        return jpa.findById(id).map(VendorApplicationMapper::toDomain);
    }

    @Override
    public List<VendorApplication> findAll() {
        return jpa.findAll().stream().map(VendorApplicationMapper::toDomain).toList();
    }

    @Override
    public boolean existsByEmail(String email) {
        return jpa.existsByEmail(email);
    }

    @Override

    public List<VendorApplication> findByStatus(ApplicationStatus status) {
        return jpa.findByStatus(status).stream().map(VendorApplicationMapper::toDomain).toList();
    }

    @Override
    public Optional<VendorApplication> findByEmail(String email) {
        return jpa.findByEmail(email).map(VendorApplicationMapper::toDomain);
    }
}
