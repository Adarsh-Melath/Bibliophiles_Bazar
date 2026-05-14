package com.backend.infrastructure.persistence.mapper;

import com.backend.domain.model.Category;
import com.backend.infrastructure.persistence.entity.CategoryEntity;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public final class CategoryMapper {
    private CategoryMapper() {
    }

    public static Category toDomain(CategoryEntity e) {
        return new Category(e.getId(), e.getName(), e.getSlug(), e.getDescription(), e.isActive(), e.isDeleted(),
                e.getCreatedAt(), e.getUpdatedAt(), e.getDeletedAt());
    }

    public static CategoryEntity toEntity(Category c) {
        CategoryEntity e = new CategoryEntity();

        e.setId(c.getId());
        e.setActive(c.isActive());
        e.setDeleted(c.isDeleted());
        e.setName(c.getName());
        e.setSlug(c.getSlug());
        e.setDescription(c.getDescription());

        return e;
    }

}
