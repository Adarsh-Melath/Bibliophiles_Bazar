
package com.backend.domain.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "vendor_application")
public class VendorApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Application info
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
    private String publishingSince; // e.g. "1935" or "2010"

    // Business info
    @Column(nullable = false)
    private String businessName;

    @Column(nullable = false)
    private String businessDescription; // what they sell

    @Column(nullable = false)
    private String category; // Fiction, Non-Fiction, etc.

    // Status
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status = ApplicationStatus.PENDING;

    private String rejectionReason; // filled by admin on rejection

    @Column(nullable = false, updatable = false)
    private LocalDateTime appliedAt = LocalDateTime.now();

    private LocalDateTime reviewedAt;

}