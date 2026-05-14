package com.backend.application.dto;

import lombok.Data;

@Data
public class BookImageRequest {
    private String imageUrl;
    private boolean isPrimary;
    private Integer sortOrder;
}
