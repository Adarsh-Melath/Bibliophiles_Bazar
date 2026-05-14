package com.backend.application.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CartResponse {
    Long cartId;
    Long userId;
    List<CartItemResponse> items;
    BigDecimal totalPrice;
    Integer totalItems;
    Boolean checkoutAllowed;
    LocalDateTime updatedAt;
}
