package com.backend.infrastructure.persistence.mapper;

import com.backend.domain.model.Cart;
import com.backend.infrastructure.persistence.entity.CartEntity;

public final class CartMapper {
    private CartMapper() {
    }

    public Cart toDomain(CartEntity entity) {
        return new Cart(entity.getId(), entity.getId(), entity.getItems(), entity.getCreatedAt, entity.getUpdatedAt(),
                entity.getDeletedAt());
    }

    public CartEntity toEntity(Cart domain) {
        CartEntity entity = new CartEntity();

        entity.setId(domain.getId());
        entity.setItems(domain.getItems());
        entity.setCreatedAt(domain.getUpdatedAt());
        entity.setDeleted(domain.getDeleted());

        return entity;
    }

}
