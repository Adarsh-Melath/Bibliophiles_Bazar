package com.backend.application.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminUserResponse {
    private Long id;
    private String name;
    private String email;
    private String role;
    private String provider;
    private boolean enabled;
    private boolean blocked;
    private LocalDateTime createdAt;
}
