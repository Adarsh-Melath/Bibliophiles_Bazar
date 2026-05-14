package com.backend.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookImageResponse {
    private Long id;
    private String imageUrl;
    private boolean isPrimary;
    private Integer sortOrder;
}
