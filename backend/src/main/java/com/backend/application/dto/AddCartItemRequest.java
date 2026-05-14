package com.backend.application.dto;

import lombok.Data;

@Data
public class AddCartItemRequest {
    Long productId;
    Integer quantity;
}
