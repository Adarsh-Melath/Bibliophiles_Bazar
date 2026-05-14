package com.backend.infrastructure.persistence.mapper;

import java.util.List;

import com.backend.domain.model.Book;
import com.backend.domain.model.BookImage;
import com.backend.domain.model.ISBN;

import com.backend.infrastructure.persistence.entity.BookEntity;
import com.backend.infrastructure.persistence.entity.BookImageEntity;
import com.backend.infrastructure.persistence.entity.CategoryEntity;
import com.backend.infrastructure.persistence.entity.UserEntity;

public final class BookMapper {
    private BookMapper() {

    }

    public static Book toDomain(BookEntity e) {
        return new Book(e.getId(), e.getVendor().getId(), e.getCategory().getId(), e.getTitle(), e.getAuthor(),
                ISBN.from(e.getIsbn()), e.getDescription(), e.getPrice(), e.getStock(),
                toBookImageDomainList(e.getImages()),
                e.getLanguage(), e.getPages(), e.getPublishedDate(), e.getStatus(), e.isDeleted(), e.getCreatedAt(),
                e.getUpdatedAt(), e.getDeletedAt());
    }

    public static BookEntity toEntity(Book b) {
        BookEntity e = new BookEntity();

        e.setId(b.getId());
        UserEntity user = new UserEntity();
        user.setId(b.getVendorId());

        CategoryEntity category = new CategoryEntity();
        category.setId(b.getCategoryId());

        e.setVendor(user);
        e.setCategory(category);
        e.setTitle(b.getTitle());
        e.setAuthor(b.getAuthor());
        e.setIsbn(b.getIsbn().getValue());
        e.setDescription(b.getDescription());
        e.setPrice(b.getPrice());
        e.setStock(b.getStock());
        e.setImages( toBookImageEntityList(b.getImages()));
        e.setLanguage(b.getLanguage());
        e.setPages(b.getPages());
        e.setPublishedDate(b.getPublishedDate());
        e.setStatus(b.getStatus());
        e.setDeleted(b.isDeleted());
        e.setCreatedAt(b.getCreatedAt());
        e.setUpdatedAt(b.getUpdatedAt());
        return e;
    }

    private static List<BookImage> toBookImageDomainList(List<BookImageEntity> entities) {
        if (entities == null) {
            return List.of();
        }

        return entities.stream().map(BookImageMapper::toDomain).toList();
    }

    private static List<BookImageEntity> toBookImageEntityList(List<BookImage> domains) {
        if (domains == null)
            return List.of();

        return domains.stream().map(BookImageMapper::toEntity).toList();
    }
}