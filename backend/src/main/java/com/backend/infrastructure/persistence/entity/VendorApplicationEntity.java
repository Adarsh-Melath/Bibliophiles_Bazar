package com.backend.infrastructure.persistence.entity;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

import com.backend.domain.model.ApplicationStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;

@Getter
@Setter
@Entity
@Table(name = "vendor_application")
public class VendorApplicationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String businessRegistrationNumber;

    @Column(nullable = false)
    private String website;

    @Column(nullable = false)
    private String publishingSince;
    @Column(nullable = false)
    private String businessName;

    @Column(nullable = false)
    @Size(max = 5000)
    private String businessDescription; // what they sell

    @Column(nullable = false)
    private String category; // Fiction, Non-Fiction, etc.

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status = ApplicationStatus.PENDING;

    private String rejectionReason; // filled by admin on rejection

    @Column(nullable = false, updatable = false)
    private LocalDateTime appliedAt = LocalDateTime.now();

    private LocalDateTime reviewedAt;
}
