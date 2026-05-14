package com.backend.infrastructure.persistence.mapper;

import com.backend.domain.model.BookImage;
import com.backend.infrastructure.persistence.entity.BookImageEntity;

public final class BookImageMapper {
    private BookImageMapper() {

    }

    public static BookImage toDomain(BookImageEntity entity) {
        return new BookImage(entity.getId(), entity.getImageUrl(), entity.isPrimary(), entity.getSortOrder());
    }

    public static BookImageEntity toEntity(BookImage domain) {
        BookImageEntity entity = new BookImageEntity();

        entity.setId(domain.getId());
        entity.setImageUrl(domain.getImageUrl());
        entity.setPrimary(domain.isPrimary());
        entity.setSortOrder(domain.getSortOrder());

        return entity;
    }

}
