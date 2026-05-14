package com.backend.application.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CartItemResponse {
    Long productId;
    String productTitle;
    String imageUrl;
    BigDecimal currentPrice;
    BigDecimal priceAtAddition;
    Integer quantity;
    Integer availableStock;
    Boolean inStock;
    BigDecimal subtotal;
}
