package com.backend.infrastructure.persistence.entity;

import java.time.LocalDateTime;

import com.backend.domain.model.AuthProvider;
import com.backend.domain.model.Role;

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
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.USER;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AuthProvider provider = AuthProvider.LOCAL;

    private String profileImage;

    private boolean enabled = false;
    private boolean blocked = false;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    private String phone;
}
