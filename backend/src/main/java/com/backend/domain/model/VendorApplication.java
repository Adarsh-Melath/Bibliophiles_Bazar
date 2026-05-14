
package com.backend.domain.model;

import java.time.LocalDateTime;

public class VendorApplication {

    private Long id;
    private String name;
    private String email;

    private String phone;

    private String businessRegistrationNumber;

    private String website;

    private String publishingSince;

    private String businessName;

    private String businessDescription; // what they sell

    private String category; // Fiction, Non-Fiction, etc.

    private ApplicationStatus status = ApplicationStatus.PENDING;

    private String rejectionReason; // filled by admin on rejection

    private LocalDateTime appliedAt = LocalDateTime.now();

    private LocalDateTime reviewedAt;

    public VendorApplication(Long id, String name, String email, String phone, String businessRegistrationNumber,
            String website, String publishingSince, String businessName, String businessDescription, String category,
            ApplicationStatus status, String rejectionReason, LocalDateTime appliedAt, LocalDateTime reviewedAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.businessRegistrationNumber = businessRegistrationNumber;
        this.website = website;
        this.publishingSince = publishingSince;
        this.businessName = businessName;
        this.businessDescription = businessDescription;
        this.category = category;
        this.status = status;
        this.rejectionReason = rejectionReason;
        this.appliedAt = appliedAt;
        this.reviewedAt = reviewedAt;
    }

    public void changeStatus(ApplicationStatus status) {
        this.status = status;
        this.reviewedAt = LocalDateTime.now();
    }

    public void addRejectReason(String reason) {
        this.rejectionReason = reason;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getBusinessRegistrationNumber() {
        return businessRegistrationNumber;
    }

    public String getWebsite() {
        return website;
    }

    public String getPublishingSince() {
        return publishingSince;
    }

    public String getBusinessName() {
        return businessName;
    }

    public String getBusinessDescription() {
        return businessDescription;
    }

    public String getCategory() {
        return category;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public LocalDateTime getAppliedAt() {
        return appliedAt;
    }

    public LocalDateTime getReviewedAt() {
        return reviewedAt;
    }

}
