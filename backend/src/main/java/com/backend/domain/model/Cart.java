package com.backend.domain.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class Cart {
    private Long id;
    private Long userId;
    private List<CartItem> items;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;

    // Constructor
    public Cart(Long id, Long userId, List<CartItem> items, LocalDateTime createdAt, LocalDateTime updatedAt,
            LocalDateTime deletedAt) {
        this.id = id;
        this.userId = userId;
        this.items = items;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    // factory method
    public static Cart create(Long userId) {
        return new Cart(null, userId, new ArrayList<>(), LocalDateTime.now(), null, null);
    }

    public void addItem(CartItem item, Integer availableStock) {
        Optional<CartItem> existingItem = items.stream().filter(i -> i.getProductId().equals(item.getProductId()))
                .findFirst();

        if (existingItem.isPresent()) {
            existingItem.get().increaseQuantity(
                    item.getQuantity());
        } else {
            items.add(item);
        }

        this.updatedAt = LocalDateTime.now();
    }

    public void increaseQuantity(Long productId, Integer amount, Integer availableStock) {
        CartItem item = findItem(productId);
        item.increaseQuantity(amount, availableStock);
        this.updatedAt = LocalDateTime.now();
    }

    public void decreaseQuantity(Long productId, int amount) {

        CartItem item = findItem(productId);

        item.decreaseQuantity(amount);

        if (item.getQuantity() <= 0) {
            removeItem(productId);
        }

        this.updatedAt = LocalDateTime.now();
    }

    public void removeItem(Long productId) {
        items.removeIf(item -> item.getProductId().equals(productId));

        this.updatedAt = LocalDateTime.now();
    }

    // helper
    private CartItem findItem(Long productId) {
        return items.stream().filter(i -> i.getProductId().equals(productId)).findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Cart Item is not found"));
    }

    // Getters
    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public List<CartItem> getItems() {
        return List.copyOf(items);
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

}
