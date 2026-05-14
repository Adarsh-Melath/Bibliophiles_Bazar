package com.backend.application.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CategoryResponseDto {

    private Long id;

    private String name;

    private String slug;

    private String description;

    private boolean active;

    private LocalDateTime createdAt;

}
