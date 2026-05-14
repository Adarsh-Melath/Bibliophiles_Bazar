package com.backend.domain.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class CartItem {

    private static final int MAX_QUANTITY = 5;
    private Long id;

    private Long productId;

    private Integer quantity;

    private BigDecimal priceAtAddition;

    private LocalDateTime addedAt;

    private LocalDateTime updatedAt;

    private LocalDateTime deletedAt;

    public CartItem(Long id,
            Long productId,
            Integer quantity,
            BigDecimal priceAtAddition,
            LocalDateTime addedAt,
            LocalDateTime updatedAt,
            LocalDateTime deletedAt) {
        this.id = id;
        this.productId = productId;
        this.quantity = quantity;
        this.priceAtAddition = priceAtAddition;
        this.addedAt = addedAt;
        this.deletedAt = deletedAt;
        this.updatedAt = updatedAt;
    }

    private static void validateCartItem(
            Long productId,
            Integer quantity,
            BigDecimal priceAtAddition) {

        if (productId == null) {
            throw new IllegalArgumentException("Product id required");
        }

        if (quantity == null || quantity <= 0) {
            throw new IllegalArgumentException(
                    "Quantity must be greater than zero");
        }

        if (priceAtAddition == null ||
                priceAtAddition.compareTo(BigDecimal.ZERO) <= 0) {

            throw new IllegalArgumentException(
                    "Price must be greater than zero");
        }
    }

    public static CartItem create(BigDecimal priceAtAddition, Long productId, Integer quantity) {
        validateCartItem(productId, quantity, priceAtAddition);
        return new CartItem(null, productId, quantity, priceAtAddition, LocalDateTime.now(), null, null);
    }

    public void increaseQuantity(Integer amount, Integer availableStock) {
        if (amount == null || amount <= 0) {
            throw new IllegalArgumentException("Amount must be greater than 0");
        }

        Integer newQuantity = this.quantity + amount;

        if (availableStock < newQuantity) {
            throw new IllegalArgumentException("Insufficient stock");
        }
        if (newQuantity > MAX_QUANTITY) {
            throw new IllegalArgumentException("Maximum quantity limit exceed");
        }

        this.quantity = newQuantity;
        this.updatedAt = LocalDateTime.now();
    }

    public void decreaseQuantity(Integer amount) {
        if (amount == null || amount <= 0) {
            throw new IllegalArgumentException("Amount must be greater than 0");
        }

        Integer newQuantity = this.quantity - amount;

        if (newQuantity <= 0) {
            this.quantity() = 0;
            remove();
            return;
        }

        this.quantity = newQuantity;
        this.updatedAt = LocalDateTime.now();
    }

    public void remove() {
        this.deletedAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    private void ensureNotDeleted() {
        if(this.deletedAt
!=null
        ) {
            throw new IllegalStateException("Cart item is already removed");        }
    }

    public Long getId() {
        return id;
    }

    public Long getProductId() {
        return productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public BigDecimal getPriceAtAddition() {
        return priceAtAddition;
    }

    public LocalDateTime getAddedAt() {
        return addedAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public LocalDateTime getDeletedAt() {
        return deletedAt;
    }
}
