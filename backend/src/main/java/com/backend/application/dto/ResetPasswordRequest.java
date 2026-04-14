package com.backend.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ResetPasswordRequest {

    private String resetToken;

    @Size(min = 8, message = "Password must be at least 8 characters")
    @NotBlank(message = "Password is requried")
    private String password;
}
