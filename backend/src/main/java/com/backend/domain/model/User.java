package com.backend.domain.model;

import java.time.LocalDateTime;

public final class User {

    private Long id;

    private String name;

    private String email;

    private String password;

    private Role role = Role.USER;

    private AuthProvider provider = AuthProvider.LOCAL;

    private String profileImage;

    private boolean enabled;
    private boolean blocked;

    private LocalDateTime createdAt = LocalDateTime.now();

    private String phone;

    public User(boolean blocked, String email, boolean enabled, Long id, String name, String password, String phone,
            String profileImage, Role role) {
        this.blocked = blocked;
        this.email = email;
        this.enabled = enabled;
        this.id = id;
        this.name = name;
        this.password = password;
        this.phone = phone;
        this.profileImage = profileImage;
        this.role = role;
    }

    public void update(String name, String phone) {
        this.name = name;
        this.phone = phone;
    }

    public void block() {
        this.blocked = true;
    }

    public void unblock() {
        this.blocked = false;
    }

    public void activate() {
        this.enabled = true;
    }

    public void changePassword(String password) {
        this.password = password;
    }

    public void changeName(String name) {
        this.name = name;
    }

    public void changeProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public void changePhone(String phone) {
        this.phone = phone;
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

    public String getPassword() {
        return password;
    }

    public Role getRole() {
        return role;
    }

    public AuthProvider getProvider() {
        return provider;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public boolean isBlocked() {
        return blocked;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public String getPhone() {
        return phone;
    }

}
