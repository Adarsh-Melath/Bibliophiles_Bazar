package com.backend.application.dto;

import java.time.LocalDateTime;

import com.backend.domain.model.ApplicationStatus;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class VendorApplicationResponse {
    Long id;
    String name;
    String email;
    String phone;
    String businessName;
    String businessDescription;
    String category;
    ApplicationStatus status;
    String rejectionReason;
    LocalDateTime appliedAt;
    String businessRegistrationNumber;
    String website;
    String publishingSince;
}
