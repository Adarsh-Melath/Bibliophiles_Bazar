package com.backend.application.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class VendorApplicationRequest {
    @NotBlank
    String name;
    @Email
    @NotBlank
    String email;
    @NotBlank
    String phone;
    @NotBlank
    String businessName;
    @NotBlank
    String businessDescription;
    @NotBlank
    String category;
    @NotBlank
    String businessRegistrationNumber;
    @NotBlank
    String website;
    @NotBlank
    String publishingSince;
}
