package com.backend.application.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.application.dto.VendorApplicationRequest;
import com.backend.application.dto.VendorApplicationResponse;
import com.backend.domain.model.ApplicationStatus;
import com.backend.domain.model.AuthProvider;
import com.backend.domain.model.Role;
import com.backend.domain.model.User;
import com.backend.domain.model.VendorApplication;
import com.backend.domain.repository.UserRepository;
import com.backend.domain.repository.VendorApplicationRepository;
import com.backend.infrastructure.email.EmailService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VendorService {
    private final VendorApplicationRepository vendorApplicationRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    public void apply(VendorApplicationRequest request) {
        if (vendorApplicationRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("An application with this email already exists");
        }
        if (userRepository.existsByEmail(request.getEmail()))
            throw new RuntimeException("User with this email already exists");

        VendorApplication application = new VendorApplication();

        application.setName(request.getName());
        application.setEmail(request.getEmail());
        application.setPhone(request.getPhone());
        application.setBusinessName(request.getBusinessName());
        application.setBusinessDescription(request.getBusinessDescription());
        application.setCategory(request.getCategory());
        application.setBusinessRegistrationNumber(request.getBusinessRegistrationNumber());
        application.setWebsite(request.getWebsite());
        application.setPublishingSince(request.getPublishingSince());

        vendorApplicationRepository.save(application);

        emailService.sendVendorApplicationConfirmation(request.getName(), request.getEmail());
    }

    @Transactional
    public void approve(Long applicationId) {
        VendorApplication application = vendorApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        application.setStatus(ApplicationStatus.APPROVED);
        application.setReviewedAt(LocalDateTime.now());
        vendorApplicationRepository.save(application);

        User vendor = new User();

        vendor.setName(application.getName());
        vendor.setEmail(application.getEmail());
        vendor.setPhone(application.getPhone());
        vendor.setRole(Role.VENDOR);
        vendor.setEnabled(true);
        vendor.setProvider(AuthProvider.LOCAL);

        String tempPassword = UUID.randomUUID().toString().substring(0, 8);
        vendor.setPassword(passwordEncoder.encode(tempPassword));
        userRepository.save(vendor);

        emailService.sendVendorApprovalEmail(application.getName(), application.getEmail(), tempPassword);
    }

    public void reject(Long applicationId, String reason) {
        VendorApplication application = vendorApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        application.setStatus(ApplicationStatus.REJECTED);
        application.setRejectionReason(reason);
        application.setReviewedAt(LocalDateTime.now());
        vendorApplicationRepository.save(application);

        emailService.sendVendorRejectionEmail(application.getName(), application.getEmail(), reason);
    }

    public List<VendorApplicationResponse> getAll() {
        List<VendorApplication> applications = vendorApplicationRepository.findAll();
        List<VendorApplicationResponse> responses = new ArrayList<>();
        for (VendorApplication application : applications) {
            responses.add(toVendorApplicationResponse(application));
        }
        return responses;
    }

    public List<VendorApplicationResponse> getByStatus(ApplicationStatus status) {
        List<VendorApplication> applications = vendorApplicationRepository.findByStatus(status);
        List<VendorApplicationResponse> responses = new ArrayList<>();
        for (VendorApplication application : applications) {
            responses.add(toVendorApplicationResponse(application));
        }
        return responses;
    }

    public VendorApplicationResponse toVendorApplicationResponse(VendorApplication application) {
        return new VendorApplicationResponse(application.getId(), application.getName(), application.getEmail(),
                application.getPhone(), application.getBusinessName(), application.getBusinessDescription(),
                application.getCategory(), application.getStatus(), application.getRejectionReason(),
                application.getAppliedAt(), application.getBusinessRegistrationNumber(), application.getWebsite(),
                application.getPublishingSince());
    }
}
