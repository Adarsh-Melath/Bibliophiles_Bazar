package com.backend.domain.model;

import java.time.LocalDateTime;

public final class Category {

    private Long id;
    private String name;
    private String slug;
    private String description;
    private boolean active;
    private boolean deleted;
    private LocalDateTime createdAt;
    private LocalDateTime deletedAt;
    private LocalDateTime updatedAt;

    public Category(Long id, String name, String slug, String description, boolean active, boolean deleted,
            LocalDateTime createdAt,
            LocalDateTime updatedAt, LocalDateTime deletedAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.slug = slug;
        this.active = active;
        this.deleted = deleted;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    public String getName() {
        return name;
    }

    public String getSlug() {
        return slug;
    }

    public String getDescription() {
        return description;
    }

    public Long getId() {
        return id;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public LocalDateTime getDeletedAt() {
        return deletedAt;
    }

    public boolean isActive() {
        return active;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void update(
            String name,
            String description,
            String slug) {
        validate(name, description);
        if (this.deleted) {
            throw new IllegalStateException("Cannot update deleted category");
        }

        this.name = name;
        this.description = description;
        this.slug = slug;
        this.updatedAt = LocalDateTime.now();
    }

    public void softDelete() {
        if (this.deleted) {
            return;
        }
        this.deleted = true;
        this.active = false;
        this.deletedAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public static Category create(
            String name,
            String description,
            String slug) {
        validate(name, description);
        return new Category(
                null,
                name,
                slug,
                description,
                true,
                false,
                LocalDateTime.now(),
                null,
                null);
    }

    private static void validate(String name, String description) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Category name cannot be blank");
        }

        if (description == null || description.isBlank()) {
            throw new IllegalArgumentException("Description cannot be blank");
        }
    }
}
