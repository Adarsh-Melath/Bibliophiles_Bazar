package com.backend.application.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookResponse {
    Long id;
    String title;
    String author;
    String isbn;
    String category;
    String description;
    BigDecimal price;
    Integer stock;
    String coverImageUrl;
    String language;
    Integer pages;
    LocalDate publishedDate;
    String status;
    LocalDateTime createdAt;
}
